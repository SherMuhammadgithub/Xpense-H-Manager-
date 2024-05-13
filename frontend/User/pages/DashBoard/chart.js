const labels = Utils.months({count: 12});
const data = {
  labels: labels,
  datasets: [{
    label: 'Expenses',
    data: [72, 68, 73, 65, 63, 71, 69,60,58,55,53,50,45],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};