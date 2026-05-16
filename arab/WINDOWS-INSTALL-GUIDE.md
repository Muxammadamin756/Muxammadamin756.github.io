# Windows uchun Node.js o'rnatish - To'liq Yo'l Ko'rsatma

## Muammo
Sizda Node.js o'rnatilmagan, shuning uchun `node visitor-server.js` buyrug'i ishlamayapti.

## Node.js o'rnatish usullari

### 🎯 Eng oson usul - Rasmiy sayt
1. **Brauzerni oching** → https://nodejs.org/
2. **"Download for Windows" tugmasini bosing** (.msi fayli)
3. **Yuklab olingan faylni ikki marta bosing** (Setup + Install)
4. **Kompyuterni qayta ishga tushiring**

### 📦 Chocolatey orqali (Agar o'rnatilgan bo'lsa)
```bash
choco install nodejs --version=20
```

### 🖥️ Windows Package Manager (winget)
```bash
winget install NodeJS
```

### 📦 Scoop (zamonaviy package manager)
```bash
scoop install node
```

## O'rnatilganligini tekshirish
Yangi CMD yoki PowerShell oching va quyidagi buyrug'ni yozing:
```bash
node --version
```

To'g'ri o'rnatilgan bo'lsa, versiya ko'rinadi (masalan: `v20.12.0`).

## Serverni ishga tushirish
Node.js o'rnatilgandan so'ng:
```bash
# Papkaga o'tish
cd c:\Users\muhammadamin\Desktop\ARABIC

# Kerakli paketlarni o'rnatish (faqat bir marta)
npm install

# Serverni ishga tushirish
node visitor-server.js
```

## Qanday bo'lishi kerak?
- ✅ **Node.js versiyasi** 18 yoki undan yuqori
- ✅ **npm** - Node.js bilan birga keladi
- ✅ **Internet** - paketlarni yuklash uchun

## Muammolarni hal qilish
Agar `npm install` xatolik bersa:
1. **Administrator sifatida CMD/PowerShell oching**
2. **Quyidagi buyruqlarni ketma-ket yozing:**
   ```bash
   npm cache clean --force
   npm install express sqlite3 cors
   ```

## Tezkor test
Server ishlashini tekshirish uchun:
```bash
node visitor-server.js
```

Server ishlayotgan bo'lsa, browserda oching:
**http://localhost:3000/Boshindex.html/alifbe.html**

## Muvaffaqiyat belgilari
🟢 Server ishladi → Console da "Server 3000 portida ishga tushdi" ko'rinadi
🟢 Browser ochish → Arabcha o'quv ilovasi ko'rinadi
🟢 Statistika → Real-time visitorlar soni ko'rinadi

## Qo'shimcha
- Node.js o'rnatgandan so'ng kompyuterni qayta ishga tushiring
- Agar muammo davom etsa, administratordan yordam so'rang
- Node.js LTS versiyasini o'rnatish tavsiya etiladi (barqarroq barqarli)
