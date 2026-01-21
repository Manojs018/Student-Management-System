const db = require('../config/db');

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const [students] = await db.query('SELECT * FROM students ORDER BY created_at DESC');
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const [student] = await db.query('SELECT * FROM students WHERE id = ?', [req.params.id]);
        if (student.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add new student
exports.createStudent = async (req, res) => {
    const { name, roll_no, class: studentClass, section, dob, phone } = req.body;

    try {
        // Check if roll number exists
        const [existing] = await db.query('SELECT * FROM students WHERE roll_no = ?', [roll_no]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Roll number already exists' });
        }

        const [result] = await db.query(
            'INSERT INTO students (name, roll_no, class, section, dob, phone) VALUES (?, ?, ?, ?, ?, ?)',
            [name, roll_no, studentClass, section, dob, phone]
        );

        res.status(201).json({ id: result.insertId, name, roll_no, message: 'Student added successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update student
exports.updateStudent = async (req, res) => {
    const { name, roll_no, class: studentClass, section, dob, phone } = req.body;

    try {
        await db.query(
            'UPDATE students SET name = ?, roll_no = ?, class = ?, section = ?, dob = ?, phone = ? WHERE id = ?',
            [name, roll_no, studentClass, section, dob, phone, req.params.id]
        );
        res.json({ message: 'Student updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete student
exports.deleteStudent = async (req, res) => {
    try {
        await db.query('DELETE FROM students WHERE id = ?', [req.params.id]);
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
