# Windows uchun Node.js o'rnatish - Qadam-baqadam yo'l ko'rsatma

## Muammo
- `node: command not found` - Node.js o'rnatilmagan
- `choco: command not found` - Chocolatey o'rnatilmagan

## Qadam-baqadam yo'l ko'rsatma

### QADAM 1: Node.js rasmiy saytini oching
1. **Brauzerni oching** (Chrome, Edge, Firefox)
2. **Manzil:** https://nodejs.org/
3. **"Download for Windows" tugmasini bosing** (o'ng tomonda)

### QADAM 2: Yuklab olish
1. **.msi faylini yuklab olish** (odatda 30-40 MB)
2. **Yuklab olish tugmasini bosing**
3. **Fayl Downloads papkasiga saqlanadi**

### QADAM 3: O'rnatish
1. **Yuklab olingan .msi faylini oching** (ikki marta bosing)
2. **"Next" tugmasini bosing**
3. **"I accept the terms" belgisini qo'ying**
4. **"Next" -> "Install"**
5. **"Finish" tugmasini bosing**

### QADAM 4: Kompyuterni qayta ishga tushiring
**Muhim:** O'rnatgandan so'ng kompyuterni qayta ishga tushiring!

### QADAM 5: O'rnatilganligini tekshiring
**Yangi CMD yoki PowerShell oching:**
```bash
node --version
```
To'g'ri bo'lsa: `v20.12.0` (yoki boshqa versiya)

```bash
npm --version
```
To'g'ri bo'lsa: `10.5.0` (yoki boshqa versiya)

### QADAM 6: Serverni ishga tushirish
```bash
cd c:\Users\muhammadamin\Desktop\ARABIC
npm install
node visitor-server.js
```

## Muvaffaqiyat belgilari
- **Console:** "Server 3000 portida ishga tushdi"
- **Browser:** http://localhost:3000/Boshindex.html/alifbe.html
- **Statistika:** Real-time visitorlar soni ko'rinadi

## Agar muammo bo'lsa
1. **Administrator sifatida CMD oching**
2. **Node.js ni qayta o'rnatish**
3. **Windows Update ni tekshirish**

## Video yo'l ko'rsatma (agar kerak bo'lsa)
YouTube da "install nodejs windows" deb qidiring - 3 daqiqali video bor.

---

### Tezkor xulosa:
1. https://nodejs.org/ oching
2. Windows Installer (.msi) yuklang
3. O'rnatish tugmasini bosing
4. Kompyuterni qayta ishga tushiring
5. `node --version` tekshiring
6. Serverni ishga tushiring

**Bu eng oson va ishonchli usul!**
