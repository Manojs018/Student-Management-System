const db = require('../config/db');

// --- MARKS ---
exports.addMarks = async (req, res) => {
    const { student_id, subject, marks_obtained, total_marks, exam_date } = req.body;
    try {
        await db.query(
            'INSERT INTO marks (student_id, subject, marks_obtained, total_marks, exam_date) VALUES (?, ?, ?, ?, ?)',
            [student_id, subject, marks_obtained, total_marks, exam_date]
        );
        res.status(201).json({ message: 'Marks added successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMarksByStudent = async (req, res) => {
    try {
        const [marks] = await db.query('SELECT * FROM marks WHERE student_id = ?', [req.params.studentId]);
        res.json(marks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// --- ATTENDANCE ---
exports.updateAttendance = async (req, res) => {
    const { student_id, total_days, present_days } = req.body;
    try {
        // Check if record exists
        const [existing] = await db.query('SELECT * FROM attendance WHERE student_id = ?', [student_id]);

        if (existing.length > 0) {
            await db.query(
                'UPDATE attendance SET total_days = ?, present_days = ? WHERE student_id = ?',
                [total_days, present_days, student_id]
            );
        } else {
            await db.query(
                'INSERT INTO attendance (student_id, total_days, present_days) VALUES (?, ?, ?)',
                [student_id, total_days, present_days]
            );
        }
        res.json({ message: 'Attendance updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAttendanceByStudent = async (req, res) => {
    try {
        const [attendance] = await db.query('SELECT * FROM attendance WHERE student_id = ?', [req.params.studentId]);
        if (attendance.length === 0) return res.json({ total_days: 0, present_days: 0, attendance_percentage: 0 });
        res.json(attendance[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
