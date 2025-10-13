function Calculate() {
  const totalRooms = parseFloat(document.getElementById("total_rooms").value);
  const roomsSold = parseFloat(document.getElementById("rooms_sold").value);
  const totalRevenue = parseFloat(document.getElementById("total_revenue").value);

  if (!totalRooms || !roomsSold || !totalRevenue || totalRooms === 0) {
    alert("Please enter valid numeric values for all fields!");
    return;
  }

  // Calculations
  const occupancy = (roomsSold / totalRooms) * 100;
  const adr = totalRevenue / roomsSold;
  const revpar = totalRevenue / totalRooms;

  // Display in input boxes
  document.querySelector(".occup").value = occupancy.toFixed(2) + "%";
  document.querySelector(".adr").value = "$" + adr.toFixed(2);
  document.querySelector(".rev").value = "$" + revpar.toFixed(2);

  // Update Chart
  renderCharts(occupancy, adr, revpar);
}

// Chart.js Code
let chartInstance = null;

function renderCharts(occupancy, adr, revpar) {
    const ctx = document.getElementById("chartCanvas").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy(); // clear old chart
  }

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Hotel KPI'],
      datasets: [
        {
          label: 'ADR ($)',
          data: [adr],
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          yAxisID: 'y',
        },
        {
          label: 'RevPAR ($)',
          data: [revpar],
          backgroundColor: 'rgba(255, 159, 64, 0.7)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
          yAxisID: 'y',
        },
        {
          label: 'Occupancy (%)',
          data: [occupancy],
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
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          enabled: true,
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
        y: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Revenue ($)'
          },
          beginAtZero: true
        },
        y1: {
          type: 'linear',
          position: 'right',
          grid: {
            drawOnChartArea: false
          },
          title: {
            display: true,
            text: 'Occupancy (%)'
          },
          beginAtZero: true
        }
      }
    }
  });
}
