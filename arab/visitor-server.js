const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Database yaratish
const db = new sqlite3.Database('./visitors.db', (err) => {
    if (err) {
        console.error('Database xatolik:', err.message);
    } else {
        console.log('SQLite database ulandi.');
        createTables();
    }
});

// Jadval yaratish
function createTables() {
    db.run(`CREATE TABLE IF NOT EXISTS visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip_address TEXT NOT NULL,
        user_agent TEXT,
        visit_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        page_visited TEXT,
        session_id TEXT,
        UNIQUE(session_id, visit_date)
    )`, (err) => {
        if (err) {
            console.error('Jadval yaratish xatolik:', err.message);
        } else {
            console.log('Visitors jadvali yaratildi yoki mavjud.');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS daily_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE UNIQUE,
        unique_visitors INTEGER DEFAULT 0,
        total_visits INTEGER DEFAULT 0,
        page_views INTEGER DEFAULT 0
    )`, (err) => {
        if (err) {
            console.error('Daily stats jadvali xatolik:', err.message);
        } else {
            console.log('Daily stats jadvali yaratildi yoki mavjud.');
        }
    });
}

// Session ID generatsiya qilish
function generateSessionId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// IP manzilini olish
function getClientIP(req) {
    return req.headers['x-forwarded-for'] || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress ||
           (req.connection.socket ? req.connection.socket.remoteAddress : null);
}

// API endpointlar

// Yangi visitor qo'shish
app.post('/api/visit', (req, res) => {
    const { page, sessionId } = req.body;
    const ip = getClientIP(req);
    const userAgent = req.headers['user-agent'];
    const newSessionId = sessionId || generateSessionId();
    const today = new Date().toISOString().split('T')[0];

    // Visitor qo'shish
    const stmt = db.prepare(`
        INSERT OR IGNORE INTO visitors 
        (ip_address, user_agent, visit_date, page_visited, session_id) 
        VALUES (?, ?, ?, ?, ?)
    `);
    
    stmt.run([ip, userAgent, new Date().toISOString(), page || 'unknown', newSessionId], function(err) {
        if (err) {
            console.error('Visitor qo\'shish xatolik:', err);
            res.status(500).json({ error: 'Server xatolik' });
            return;
        }

        // Daily statistikani yangilash
        updateDailyStats(today);
        
        res.json({ 
            success: true, 
            sessionId: newSessionId,
            visitorId: this.lastID
        });
    });
    
    stmt.finalize();
});

// Statistikalarni olish
app.get('/api/stats', (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Umumiy statistika
    db.all(`
        SELECT 
            COUNT(DISTINCT ip_address) as total_unique_visitors,
            COUNT(*) as total_visits,
            COUNT(DISTINCT DATE(visit_date)) as total_active_days
        FROM visitors
    `, (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Server xatolik' });
            return;
        }

        const overall = rows[0];

        // Kunlik statistika
        db.get(`
            SELECT * FROM daily_stats 
            WHERE date = ?
        `, [today], (err, row) => {
            if (err) {
                res.status(500).json({ error: 'Server xatolik' });
                return;
            }

            const todayStats = row || { unique_visitors: 0, total_visits: 0, page_views: 0 };

            // Oxirgi 7 kun statistikasi
            db.all(`
                SELECT date, unique_visitors, total_visits, page_views
                FROM daily_stats 
                WHERE date >= date('now', '-7 days')
                ORDER BY date DESC
            `, (err, weekRows) => {
                if (err) {
                    res.status(500).json({ error: 'Server xatolik' });
                    return;
                }

                res.json({
                    overall: {
                        total_unique_visitors: overall.total_unique_visitors,
                        total_visits: overall.total_visits,
                        total_active_days: overall.total_active_days
                    },
                    today: todayStats,
                    week: weekRows,
                    timestamp: new Date().toISOString()
                });
            });
        });
    });
});

// Real-time visitorlar soni
app.get('/api/online', (req, res) => {
    // Oxirgi 5 daqiqada faol bo'lgan visitorlar
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    
    db.get(`
        SELECT COUNT(DISTINCT ip_address) as online_count
        FROM visitors 
        WHERE visit_date > ?
    `, [fiveMinutesAgo], (err, row) => {
        if (err) {
            res.status(500).json({ error: 'Server xatolik' });
            return;
        }

        res.json({
            online_count: row.online_count,
            timestamp: new Date().toISOString()
        });
    });
});

// Daily statistikani yangilash
function updateDailyStats(date) {
    db.run(`
        INSERT OR REPLACE INTO daily_stats (date, unique_visitors, total_visits, page_views)
        SELECT 
            ?,
            COUNT(DISTINCT ip_address),
            COUNT(*),
            COUNT(DISTINCT page_visited)
        FROM visitors 
        WHERE DATE(visit_date) = ?
    `, [date, date], (err) => {
        if (err) {
            console.error('Daily stats yangilash xatolik:', err);
        }
    });
}

// Serverni ishga tushirish
app.listen(PORT, () => {
    console.log(`Server ${PORT} portida ishga tushdi...`);
    console.log(`http://localhost:${PORT}`);
});

// Har kungi eski ma'lumotlarni tozalash (ixtiyoriy)
setInterval(() => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    
    db.run(`
        DELETE FROM visitors 
        WHERE visit_date < ?
    `, [thirtyDaysAgo], (err) => {
        if (err) {
            console.error('Eski ma\'lumotlarni tozalash xatolik:', err);
        } else {
            console.log('30 kunlik eski ma\'lumotlar tozalandi.');
        }
    });
}, 24 * 60 * 60 * 1000); // Har 24 soatda bir marta
