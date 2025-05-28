
document.addEventListener("DOMContentLoaded", function () {
  const loginBox = document.getElementById("loginBox");
  const dashboard = document.getElementById("dashboard");
  const userDisplay = document.getElementById("userDisplay");
  const cardContainer = document.getElementById("cardContainer");

  const users = {
    david: { password: "david", role: "mahasiswa" },
    admin: { password: "admin1", role: "admin" },
    "pak agan": { password: "123", role: "dosen" },
  };

  const kehadiranData = {
    david: {
      HTN: [true, false, true, true, false, true, true, true],
      "Hukum Dagang": [true, true, true, true, true, true, true, true],
    },
  };

  function hitungPersentase(data) {
    const total = data.length;
    const hadir = data.filter(Boolean).length;
    return Math.round((hadir / total) * 100);
  }

  function tampilkanKartuKehadiran(user) {
    const data = kehadiranData[user];
    cardContainer.innerHTML = "";

    for (const matkul in data) {
      const absensi = data[matkul];
      const persen = hitungPersentase(absensi);

      const card = document.createElement("div");
      card.className = "absensi-card";
      card.innerHTML = `
        <h3>${matkul}</h3>
        <p>Persentase Kehadiran: <strong>${persen}%</strong></p>
        <canvas id="chart-${matkul}"></canvas>
      `;
      cardContainer.appendChild(card);

      // Buat chart-nya
      new Chart(document.getElementById(`chart-${matkul}`), {
        type: "pie",
        data: {
          labels: ["Hadir", "Tidak Hadir"],
          datasets: [{
            data: [absensi.filter(Boolean).length, absensi.filter(x => !x).length],
            backgroundColor: ["#4caf50", "#f44336"]
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
    }
  }

  window.login = function () {
    const username = document.getElementById("username").value.toLowerCase();
    const password = document.getElementById("password").value;

    if (users[username] && users[username].password === password) {
      loginBox.style.display = "none";
      dashboard.style.display = "block";
      userDisplay.textContent = username;
      if (users[username].role === "mahasiswa") {
        tampilkanKartuKehadiran(username);
      } else {
        cardContainer.innerHTML = "<p>Dashboard untuk role lain belum tersedia.</p>";
      }
    } else {
      alert("Username atau password salah");
    }
  };
});
