// Global chart instance
let chartInstance = null;

// Function to initialize the chart on page load
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
      interaction: { mode: 'index', intersect: false },
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

// Function to calculate KPIs
function Calculate() {
  const totalRooms = parseFloat(document.getElementById("total_rooms").value);
  const roomsSold = parseFloat(document.getElementById("rooms_sold").value);
  const totalRevenue = parseFloat(document.getElementById("total_revenue").value);

  if (!totalRooms || !roomsSold || !totalRevenue || totalRooms === 0) {
    alert("Please enter valid numeric values for all fields!");
    return;
  }

  // KPI Calculations
  const occupancy = (roomsSold / totalRooms) * 100;
  const adr = totalRevenue / roomsSold;
  const revpar = totalRevenue / totalRooms;

  // Display results
  document.querySelector(".occup").value = occupancy.toFixed(2) + "%";
  document.querySelector(".adr").value = "$" + adr.toFixed(2);
  document.querySelector(".rev").value = "$" + revpar.toFixed(2);

  // Update chart
  renderCharts(occupancy, adr, revpar);
}

// Function to update chart data
function renderCharts(occupancy, adr, revpar) {
  chartInstance.data.datasets[0].data[0] = adr;
  chartInstance.data.datasets[1].data[0] = revpar;
  chartInstance.data.datasets[2].data[0] = occupancy;
  chartInstance.update();
}
