const API_URL = '/api/students';
const form = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const submitBtn = document.getElementById('submitBtn');

// Fetch and display students details
async function fetchStudents() {
  const res = await fetch(API_URL);
  const students = await res.json();
  studentTableBody.innerHTML = '';
  students.forEach(student => {
    studentTableBody.innerHTML += `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td class="actions">
          <button onclick="editStudent(${student.id}, '${student.name}', ${student.age}, '${student.grade}')">Edit</button>
          <button class="btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Add or Update student
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('studentId').value;
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const grade = document.getElementById('grade').value;

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age, grade })
  });

  form.reset();
  document.getElementById('studentId').value = '';
  submitBtn.textContent = 'Add Student';
  fetchStudents();
});

// Edit student
function editStudent(id, name, age, grade) {
  document.getElementById('studentId').value = id;
  document.getElementById('name').value = name;
  document.getElementById('age').value = age;
  document.getElementById('grade').value = grade;
  submitBtn.textContent = 'Update Student';
}

// Delete student
async function deleteStudent(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchStudents();
}

// Initial fetch
fetchStudents();
