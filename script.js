
document.addEventListener("DOMContentLoaded", function () {
  const loginContainer = document.getElementById("loginContainer");
  const dashboardContainer = document.getElementById("dashboardContainer");
  const namaUser = document.getElementById("namaUser");
  const logoutButton = document.getElementById("logoutButton");
  const isiDashboard = document.getElementById("isiDashboard");

  const users = {
    david: { password: "david", role: "mahasiswa" },
    admin: { password: "admin1", role: "admin" },
    "pak agan": { password: "123", role: "dosen" }
  };

  const absensi = {
    david: {
      HTN: [true, false, true, true, false, true, true],
      "Hukum Dagang": [true, true, true, true, false, false, true]
    }
  };

  window.login = function () {
    const username = document.getElementById("username").value.toLowerCase();
    const password = document.getElementById("password").value;

    if (users[username] && users[username].password === password) {
      localStorage.setItem("user", username);
      tampilkanDashboard(username);
    } else {
      alert("Username atau password salah");
    }
  };

  function tampilkanDashboard(username) {
    loginContainer.style.display = "none";
    dashboardContainer.style.display = "block";
    namaUser.textContent = username;

    const role = users[username].role;
    if (role === "mahasiswa") {
      showAbsensiMahasiswa(username);
    } else {
      isiDashboard.innerHTML = "<p>Dashboard untuk " + role + " belum tersedia.</p>";
    }
  }

  function showAbsensiMahasiswa(username) {
    isiDashboard.innerHTML = "";
    const data = absensi[username];

    Object.keys(data).forEach(matkul => {
      const hadir = data[matkul].filter(x => x).length;
      const total = data[matkul].length;
      const tidakHadir = total - hadir;
      const persen = Math.round((hadir / total) * 100);

      const card = document.createElement("div");
      card.className = "absensi-card";
      card.innerHTML = `
        <h3>${matkul}</h3>
        <p>Persentase Kehadiran: ${persen}%</p>
        <canvas id="chart-${matkul}"></canvas>
      `;
      isiDashboard.appendChild(card);

      new Chart(document.getElementById(`chart-${matkul}`), {
        type: 'pie',
        data: {
          labels: ['Hadir', 'Tidak Hadir'],
          datasets: [{
            data: [hadir, tidakHadir],
            backgroundColor: ['#4caf50', '#f44336']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    });
  }

  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("user");
    location.reload();
  });

  const user = localStorage.getItem("user");
  if (user) {
    tampilkanDashboard(user);
  }
});
