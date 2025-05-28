
const users = {
  admin: { password: 'admin1', role: 'admin' },
  david: { password: 'david', role: 'student' },
  abdu: { password: 'abdu', role: 'student' },
  angga: { password: 'angga', role: 'student' },
  'pak agan': { password: '123', role: 'lecturer' },
  'bu elvina': { password: '123', role: 'lecturer' }
};

const jadwalKuliah = {
  'HTN': { dosen: 'pak agan', mahasiswa: ['david', 'abdu'] },
  'Hukum Dagang': { dosen: 'bu elvina', mahasiswa: ['angga'] }
};

const komentarLucu = [
  "Rajin banget kamu!",
  "Hadir terus, mantap!",
  "Semangat terus ya!",
  "Jangan lupa sarapan~",
  "Kehadiranmu menyinari kelas ini!"
];

function login() {
  const username = document.getElementById('username').value.trim().toLowerCase();
  const password = document.getElementById('password').value.trim();
  const errorBox = document.getElementById('loginError');

  if (users[username] && users[username].password === password) {
    localStorage.setItem('loggedInUser', username);
    showDashboard(username);
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('dashboardBox').style.display = 'block';
  } else {
    errorBox.textContent = 'Username atau password salah';
  }
}

function logout() {
  localStorage.removeItem('loggedInUser');
  location.reload();
}

function showDashboard(username) {
  const user = users[username];
  const role = user.role;
  document.getElementById('profileInfo').textContent = `${username.toUpperCase()} (${role})`;

  updateTime();

  if (role === 'admin') {
    showAdminDashboard();
  } else if (role === 'lecturer') {
    showLecturerDashboard(username);
  } else if (role === 'student') {
    showStudentDashboard(username);
  }
}

function updateTime() {
  const now = new Date();
  document.getElementById('datetime').textContent =
    now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
  setTimeout(updateTime, 1000);
}

function showAdminDashboard() {
  const content = document.getElementById('dashboardContent');
  content.innerHTML = '<h2>Statistik Kehadiran Semua Mata Kuliah</h2><div class="card-container">';
  for (const matkul in jadwalKuliah) {
    const data = jadwalKuliah[matkul];
    const persen = Math.floor(Math.random() * 41) + 60; // 60–100%
    content.innerHTML += `
      <div class="card">
        <h3>${matkul}</h3>
        <p>Dosen: ${data.dosen}</p>
        <p class="persentase">Kehadiran Rata-rata: ${persen}%</p>
      </div>
    `;
  }
  content.innerHTML += '</div>';
}

function showLecturerDashboard(dosen) {
  const content = document.getElementById('dashboardContent');
  content.innerHTML = '<h2>Absensi Mata Kuliah yang Diampu</h2><div class="card-container">';
  for (const matkul in jadwalKuliah) {
    const data = jadwalKuliah[matkul];
    if (data.dosen === dosen) {
      const persen = Math.floor(Math.random() * 41) + 60;
      content.innerHTML += `
        <div class="card">
          <h3>${matkul}</h3>
          <p>Mahasiswa: ${data.mahasiswa.join(', ')}</p>
          <p class="persentase">Rata-rata Kehadiran: ${persen}%</p>
        </div>
      `;
    }
  }
  content.innerHTML += '</div>';
}

function showStudentDashboard(mahasiswa) {
  const content = document.getElementById('dashboardContent');
  content.innerHTML = '<h2>Rekapan Kehadiran Anda</h2><div class="card-container">';
  for (const matkul in jadwalKuliah) {
    const data = jadwalKuliah[matkul];
    if (data.mahasiswa.includes(mahasiswa)) {
      const persen = Math.floor(Math.random() * 41) + 60;
      const komentar = komentarLucu[Math.floor(Math.random() * komentarLucu.length)];
      content.innerHTML += `
        <div class="card">
          <h3>${matkul}</h3>
          <p>Dosen: ${data.dosen}</p>
          <p class="persentase">Kehadiran Anda: ${persen}%</p>
          <p class="komentar">"${komentar}"</p>
        </div>
      `;
    }
  }
  content.innerHTML += '</div>';
}

// Auto-login jika sebelumnya sudah login
window.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('loggedInUser');
  if (user && users[user]) {
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('dashboardBox').style.display = 'block';
    showDashboard(user);
  }
});
