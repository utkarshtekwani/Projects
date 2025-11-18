let chartInstance = null;

window.onload = function() {
  const ctx = document.getElementById("chartCanvas").getContext("2d");

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Hotel KPI'],
      datasets: [
        {
          label: 'ADR ($)',
          data: [0],
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          yAxisID: 'y',
        },
        {
          label: 'RevPAR ($)',
          data: [0],
          backgroundColor: 'rgba(255, 159, 64, 0.7)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
          yAxisID: 'y',
        },
        {
          label: 'Occupancy (%)',
          data: [0],
          type: 'line',
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.3)',
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          yAxisID: 'y1',
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'nearest', intersect: false },
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              let value = context.parsed.y;
              if (label.includes('Occupancy')) return `${label}: ${value.toFixed(2)}%`;
              else return `${label}: $${value.toFixed(2)}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'KPI Metrics', font: { size: 14 } },
          ticks: { display: true },
          grid: { display: true }
        },
        y: {
          type: 'linear',
          position: 'left',
          title: { display: true, text: 'Revenue ($)', font: { size: 14 } },
          beginAtZero: true,
          ticks: { callback: value => '$' + value },
          grid: { display: true }
        },
        y1: {
          type: 'linear',
          position: 'right',
          title: { display: true, text: 'Occupancy (%)', font: { size: 14 } },
          beginAtZero: true,
          ticks: { callback: value => value + '%' },
          grid: { drawOnChartArea: false, display: true }
        }
      }
    }
  });
};

function Calculate() {
  const totalRooms = parseFloat(document.getElementById("total_rooms").value);
  const roomsSold = parseFloat(document.getElementById("rooms_sold").value);
  const totalRevenue = parseFloat(document.getElementById("total_revenue").value);

  if (isNaN(totalRooms) || isNaN(roomsSold) || isNaN(totalRevenue)) {
    alert("Please enter numeric values for all fields!");
    return;
  }

  if (totalRooms < 0 || roomsSold < 0 || totalRevenue < 0) {
    alert("Values cannot be negative!");
    return;
  }

  if (roomsSold > totalRooms) {
    alert("Rooms sold cannot exceed total rooms!");
    return;
  }

  let occupancy, adr, revpar;

  if (totalRooms === 0) {
    occupancy = "N/A";
    revpar = "N/A";
  } else {
    occupancy = ((roomsSold / totalRooms) * 100).toFixed(2) + "%";
    revpar = "$" + (totalRevenue / totalRooms).toFixed(2);
  }

  if (roomsSold === 0) {
    adr = "N/A";
    // If revenue exists when no rooms are sold
    if (totalRevenue !== 0) {
      alert("If no rooms are sold, total revenue must be $0.");
      return;
    }
  } else {
    adr = "$" + (totalRevenue / roomsSold).toFixed(2);
  }

  document.querySelector(".occup").value = occupancy;
  document.querySelector(".adr").value = adr;
  document.querySelector(".rev").value = revpar;

  const occVal = occupancy === "N/A" ? 0 : parseFloat(occupancy);
  const adrVal = adr === "N/A" ? 0 : parseFloat(adr.replace("$", ""));
  const revVal = revpar === "N/A" ? 0 :parseFloat(revpar.replace("$", ""));

  renderCharts(occVal, adrVal, revVal);
}

function renderCharts(occupancy, adr, revpar) {
  if (!chartInstance) return;

  chartInstance.data.datasets[0].data[0] = adr;
  chartInstance.data.datasets[1].data[0] = revpar;
  chartInstance.data.datasets[2].data[0] = occupancy;

  chartInstance.update();
}
