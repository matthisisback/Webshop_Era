const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;

const uri = 'mongodb://localhost:27017';
const dbName = 'mydatabase';
const collectionName = 'users';

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

let onlineUsers = new Set();

async function connectToDb() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to database');
    return client.db(dbName).collection(collectionName);
}

function sha512Hash(password) {
    return crypto.createHash('sha512').update(password).digest('hex');
}

function generateRandomPassword(length = 12) {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
}

async function sendRegistrationEmail(email, password) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your Registration is Successful',
        text: `Your registration is successful. Your default password is: ${password}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

async function storePassword(username, email) {
    const collection = await connectToDb();
    const defaultPassword = generateRandomPassword();
    const hashedPassword = sha512Hash(defaultPassword);

    const user = { username, email, password: hashedPassword };
    await collection.insertOne(user);
    console.log(`Password for user ${username} has been hashed and stored.`);

    // Send registration email
    await sendRegistrationEmail(email, defaultPassword);
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/register', async (req, res) => {
    const { username, email } = req.body;

    try {
        await storePassword(username, email);
        res.send('Registration successful! Please check your email for your default password.');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Registration failed. Please try again.');
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = sha512Hash(password);

    const collection = await connectToDb();
    const user = await collection.findOne({ username, password: hashedPassword });

    if (user) {
        req.session.username = username;
        onlineUsers.add(username);
        res.redirect('/dashboard');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Logout endpoint
app.post('/logout', (req, res) => {
    if (req.session.username) {
        onlineUsers.delete(req.session.username);
        req.session.destroy();
    }
    res.redirect('/');
});

// Endpoint to get the number of online users
app.get('/online-users', (req, res) => {
    res.json({ count: onlineUsers.size });
});

// Dashboard
app.get('/dashboard', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.lis
