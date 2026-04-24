require('dotenv').config({ path: '../.env' }); // Ujisti se, že cesta k .env je správná
const mongoose = require('mongoose');
const connectDB = require('./db');
const { User } = require('./models');

const runTest = async () => {
    console.log("Zahajuji test databáze...");
    
    // 1. Připojení k DB
    await connectDB();

    try {
        // 2. Vytvoření testovacího uživatele
        const newUser = new User({
            login: 'testak_01',
            password: 'superTajneHeslo123', 
            name: 'Pavel',
            surname: 'Testovací',
            mail: 'pavel@test.cz',
            user_type: 'Client'
        });

        // 3. Uložení do databáze
        const savedUser = await newUser.save();
        console.log("✅ PARÁDA! Uživatel byl úspěšně uložen do MongoDB:");
        console.log(savedUser);

    } catch (error) {
        console.error("❌ CHYBA při ukládání do databáze:", error.message);
    } finally {
        // 4. Odpojení, aby skript nezůstal viset
        mongoose.connection.close();
        console.log("Odpojeno z databáze.");
    }
};

runTest();