const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware for parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data store, An array of Student Objects 
let students = [
  { id: 1, name: 'Stephen Achugwo', age: 55, grade: 'A' },
  { id: 2, name: 'Ada Ann Eze', age: 26, grade: 'C' },
  { id: 3, name: 'Ugo Ogu', age: 37, grade: 'B' },
  { id: 4, name: 'Floxy Nwankwo', age: 59, grade: 'A' }
];

// GET: Fetch all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// GET: Fetch single student by ID
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
});

// POST: Add a new student
app.post('/api/students', (req, res) => {
  const { name, age, grade } = req.body;
  const newStudent = {
    id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
    name,
    age: parseInt(age),
    grade
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT: Update an existing student
app.put('/api/students/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
  if (studentIndex === -1) return res.status(404).json({ error: 'Student not found' });
  const { name, age, grade } = req.body;
  students[studentIndex] = {
    id: parseInt(req.params.id),
    name,
    age: parseInt(age),
    grade
  };
  res.json(students[studentIndex]);
});

// DELETE: Remove a student
app.delete('/api/students/:id', (req, res) => {
  const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
  if (studentIndex === -1) return res.status(404).json({ error: 'Student not found' });
  students.splice(studentIndex, 1);
  res.json({ message: 'Student deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
