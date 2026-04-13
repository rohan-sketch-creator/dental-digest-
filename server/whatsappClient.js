const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

let isReady = false;

client.on('qr', (qr) => {
    console.log('\n======================================================');
    console.log('🤖 SCAN THIS QR CODE IN YOUR WHATSAPP TO ENABLE THE BOT');
    console.log('Open WhatsApp > Settings > Linked Devices > Link a Device');
    console.log('======================================================\n');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('\n✅ Automated WhatsApp Bot is ready and connected!');
    isReady = true;
});

client.on('auth_failure', msg => {
    console.error('❌ WhatsApp Authentication failure', msg);
});

client.initialize();

const sendMessage = async (phoneNumber, message) => {
    if (!isReady) {
        console.warn('⚠️ WhatsApp bot is not ready yet. Skipping message.');
        return false;
    }

    try {
        // Simple formatting to remove non-numeric characters
        let formattedNumber = phoneNumber.replace(/\D/g, '');
        
        // If it starts with 0, remove it (assuming local format in some countries)
        // If you need default country code, add logic here.
        // E.g., if length is 10, default to India (+91)
        if (formattedNumber.length === 10) {
            formattedNumber = '91' + formattedNumber;
        }

        const chatId = formattedNumber + "@c.us";
        await client.sendMessage(chatId, message);
        console.log(`✉️ Automated WhatsApp message sent to ${formattedNumber}`);
        return true;
    } catch (err) {
        console.error('❌ Failed to send WhatsApp message:', err);
        return false;
    }
};

module.exports = {
    client,
    sendMessage,
    isReady: () => isReady
};
