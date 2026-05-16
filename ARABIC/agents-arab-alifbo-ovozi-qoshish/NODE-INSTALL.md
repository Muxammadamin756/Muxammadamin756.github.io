# Node.js o'rnatish - Windows uchun to'liq yo'l ko'rsatma

## Muammo
`node: command not found` xatoligi - Node.js o'rnatilmagan.

## Yechim

### 1-usul: Rasmiy saytdan o'rnatish
1. https://nodejs.org/ saytini oching
2. "Windows Installer" (.msi) tugmasini bosing
3. Yuklab olingan faylni o'rnatish
4. O'rnatish tugasini bosing va "Next" bosib o'ting

### 2-usul: Chocolatey orqali o'rnatish
Agar sizda Chocolatey o'rnatilgan bo'lsa:
```bash
choco install nodejs
```

### 3-usul: Windows Package Manager (winget)
```bash
winget install NodeJS
```

## O'rnatilganligini tekshirish
Terminal oching va quyidagi buyrug'ni yozing:
```bash
node --version
```

Agar versiya ko'rsa (masalan: v18.17.0), demak Node.js o'rnatilgan.

## Keyingi qadam
Node.js o'rnatilgandan so'ng:
```bash
cd c:\Users\muhammadamin\Desktop\ARABIC
npm install
node visitor-server.js
```

## Qo'shimcha
- Node.js o'rnatgandan so'ng kompyuterni qayta ishga tushirish tavsiya etiladi
- `npm` buyrug'i Node.js bilan birga keladi
- Agar muammo yana takrorlansa, administrator sifatida CMD ni oching va o'rnatishni urib ko'ring

## Serverni ishga tushirish
Server muvaffaqiyatli ishga tushishi kerak:
- Port: 3000
- URL: http://localhost:3000
- Database: visitors.db (avtomatik yaratiladi)
