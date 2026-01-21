const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if any admins exist at all (Auto-Seeding for SQLite/First Run)
        const [allAdmins] = await db.query('SELECT * FROM admins');
        if (allAdmins.length === 0) {
            const hashedPassword = await bcrypt.hash('admin', 10);
            await db.query('INSERT INTO admins (username, password) VALUES (?, ?)', ['admin', hashedPassword]);
            console.log('🌱 Seeded default admin: admin/admin');
        }

        // 1. Check if user exists
        const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const admin = rows[0];

        // 2. Compare password
        // Note: For a real app, use bcrypt.compare(password, admin.password)
        // For this beginner demo/setup where we manually inserted a hash or might insert plain text:
        // We will assume the password in DB is hashed.

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // 3. Generate JWT Token
        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            message: 'Login successful',
            token: token,
            admin: {
                id: admin.id,
                username: admin.username
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
