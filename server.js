require('dotenv').config();

const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 5000;

let users = [
    {
        id: 1,
        kullaniciadi: 'admin',
        sifre: '1234',
    },
];

// Ana sayfa

server.get('/', (req, res) => {
    res.send('API çalışıyor');
});

// GET kullanıcılar

server.get('/api/kullanicilar', (req, res) => {
    res.status(200).json(users);
});

// POST kayıt ol

server.post('/api/kayitol', (req, res) => {
    const { kullaniciadi, sifre } = req.body;

    if (!kullaniciadi || !sifre) {
        return res.status(400).json({
            message: 'Kullanıcı adı ve şifre gerekli',
        });
    }

    const yeniKullanici = {
        id: users.length + 1,
        kullaniciadi,
        sifre,
    };

    users.push(yeniKullanici);

    res.status(201).json(yeniKullanici);
});

// POST giriş

server.post('/api/giris', (req, res) => {
    const { kullaniciadi, sifre } = req.body;

    const user = users.find(
        (u) =>
            u.kullaniciadi === kullaniciadi &&
            u.sifre === sifre
    );

    if (!user) {
        return res.status(401).json({
            message: 'Geçersiz bilgiler',
        });
    }

    res.status(200).json({
        message: `Hoş geldin ${user.kullaniciadi}!`,
    });
});

server.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
});
module.exports = server;