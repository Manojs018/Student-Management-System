const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, '../../student_record.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ Connected to SQLite Database');
        initDb();
    }
});

// Wrapper to mimic mysql2 promise API
// mysql2 returns [rows, fields]
// We will return [rows] so destructuring [rows] = await db.query works.
const promiseDb = {
    query: (sql, params = []) => {
        return new Promise((resolve, reject) => {
            // Check if it's an INSERT/UPDATE/DELETE or SELECT
            const method = sql.trim().toUpperCase().startsWith('SELECT') ? 'all' : 'run';

            db[method](sql, params, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    // For run(), 'this' contains changes, lastID, etc.
                    // For all(), rows contains the result.
                    if (method === 'run') {
                        // Mimic mysql2 result object
                        resolve([{ insertId: this.lastID, affectedRows: this.changes }]);
                    } else {
                        resolve([rows]);
                    }
                }
            });
        });
    }
};

function initDb() {
    // Enable foreign keys
    db.run("PRAGMA foreign_keys = ON");

    // Create Tables
    const tables = [
        `CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            roll_no TEXT NOT NULL UNIQUE,
            class TEXT NOT NULL,
            section TEXT,
            dob TEXT,
            phone TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS marks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER NOT NULL,
            subject TEXT NOT NULL,
            marks_obtained INTEGER NOT NULL,
            total_marks INTEGER DEFAULT 100,
            exam_date TEXT,
            FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
        )`,
        `CREATE TABLE IF NOT EXISTS attendance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER NOT NULL,
            total_days INTEGER DEFAULT 0,
            present_days INTEGER DEFAULT 0,
            attendance_percentage DECIMAL(5,2),
            last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
        )`
    ];

    tables.forEach(sql => {
        db.run(sql, (err) => {
            if (err) console.error("Error creating table:", err.message);
        });
    });
}

module.exports = promiseDb;
