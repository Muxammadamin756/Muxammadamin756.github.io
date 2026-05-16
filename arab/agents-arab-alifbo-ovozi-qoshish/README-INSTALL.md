# Arabcha O'quv Platformasi - O'rnatish Qo'llanmasi

## Talablar
- Node.js (versiya 14 yoki undan yuqori)
- npm (Node.js package manager)

## O'rnatish

### 1. Node.js ni o'rnatish
Windows uchun rasmiy saytdan yuklab oling:
https://nodejs.org/

Yoki Chocolatey orqali:
```bash
choco install nodejs
```

### 2. Paketlarni o'rnatish
Terminal oching va project papkasiga o'ting:
```bash
cd c:\Users\muhammadamin\Desktop\ARABIC
npm install
```

Agar npm ishlamasa:
```bash
npm install express sqlite3 cors body-parser @google-cloud/text-to-speech
```

### 3. Serverni ishga tushirish
```bash
node visitor-server.js
```

Yoki development rejimda:
```bash
npm run dev
```

## Server manzili
Server http://localhost:3000 da ishlaydi

## API Endpointlar
- `GET /api/stats` - Umumiy statistika
- `POST /api/visit` - Yangi visitor qo'shish
- `GET /api/online` - Real-time online soni

## Ma'lumotlar
- Database: `visitors.db` (SQLite)
- Server port: 3000
- Frontend: Static files

## Muammolar va yechimlari

### "npm is not recognized" xatoligi
**Yechim:** Node.js ni to'g'ri o'rnatganingizni tekshiring

### "Module not found" xatoligi
**Yechim:** `npm install` buyrug'ini qayta ishlating

### Port band xatoligi
**Yechim:** Boshqa port ishlating:
```javascript
const PORT = 3001; // visitor-server.js da o'zgartiring
```

## Test qilish
Browser oching: http://localhost:3000/Boshindex.html/alifbe.html

Statistika paneli ishlashini tekshiring!
