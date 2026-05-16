// Ovozlarni yaratish uchun skript
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const path = require('path');

const client = new textToSpeech.TextToSpeechClient();

const harflar = [
    { nom: 'Alif', text: 'أَلِف' },
    { nom: 'Ba', text: 'بَاء' },
    { nom: 'Ta', text: 'تَاء' },
    { nom: 'Sa', text: 'ثَاء' },
    { nom: 'Jim', text: 'جِيم' },
    { nom: 'Ha', text: 'حَاء' },
    { nom: 'Xo', text: 'خَاء' },
    { nom: 'Dal', text: 'دَال' },
    { nom: 'Zal', text: 'ذَال' },
    { nom: 'Ro', text: 'رَاء' },
    { nom: 'Zo', text: 'زَاي' },
    { nom: 'Sin', text: 'سِين' },
    { nom: 'Shin', text: 'شِين' },
    { nom: 'Sod', text: 'صَاد' },
    { nom: 'Dod', text: 'ضَاد' },
    { nom: 'To', text: 'طَاء' },
    { nom: 'Dha', text: 'ظَاء' },
    { nom: 'Ayn', text: 'عَيْن' },
    { nom: 'Gʻayn', text: 'غَيْن' },
    { nom: 'Fa', text: 'فَاء' },
    { nom: 'Qof', text: 'قَاف' },
    { nom: 'Kaf', text: 'كَاف' },
    { nom: 'Lam', text: 'لَام' },
    { nom: 'Mim', text: 'مِيم' },
    { nom: 'Nun', text: 'نُون' },
    { nom: 'Ha2', text: 'هَاء' },
    { nom: 'Vov', text: 'وَاو' },
    { nom: 'Ya', text: 'يَاء' }
];

const audioDir = path.join(__dirname, 'OVoz');

// OVoz papkasi yo'q bo'lsa yaratish
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}

async function generateAudio(nom, text) {
    try {
        const request = {
            input: { text },
            voice: {
                languageCode: 'ar-SA',
                name: 'ar-SA-Neural2-A',
            },
            audioConfig: {
                audioEncoding: 'MP3',
                pitch: 0,
                speakingRate: 0.9,
            },
        };

        const [response] = await client.synthesizeSpeech(request);
        const fileName = `${nom}.mp3`;
        const filePath = path.join(audioDir, fileName);
        fs.writeFileSync(filePath, response.audioContent, 'binary');
        console.log(`✓ ${nom}.mp3 yaratildi`);
    } catch (err) {
        console.error(`✗ ${nom} uchun xatolik:`, err.message);
    }
}

async function main() {
    console.log('Harflarning ovozlari yaratilmoqda...\n');
    for (const harf of harflar) {
        await generateAudio(harf.nom, harf.text);
    }
    console.log('\nBarcha ovozlar yaratildi!');
}

main();
