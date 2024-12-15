const allData = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    datasets: [
        {
            label: '2022',
            data: [4017, 6135, 7091, 5841, 5036, 4547, 3467, 3970, 6313, 3595, 9207, 5945],
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            borderColor: 'blue',
            borderWidth: 1,
        },
        {
            label: '2023',
            data: [2416, 4136, 7935, 8004, 9505, 5026, 6108, 6343, 9404, 9280, 9287, 8689],
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            borderColor: 'green',
            borderWidth: 1,
        }
    ]
};

function populateTable(selectedYear) {
    const tableBody = document.getElementById('dataTable').querySelector('tbody');
    tableBody.innerHTML = ''; 

    allData.datasets.forEach(dataset => {
        if (selectedYear === 'all' || dataset.label === selectedYear) {
            const row = document.createElement('tr');

            const yearCell = document.createElement('td');
            yearCell.textContent = dataset.label;
            row.appendChild(yearCell);

            dataset.data.forEach(value => {
                const dataCell = document.createElement('td');
                dataCell.textContent = value;
                row.appendChild(dataCell);
            });

            tableBody.appendChild(row);
        }
    });
}

const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: allData.labels,
        datasets: allData.datasets,
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Bulan',
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Jumlah Penjualan',
                }
            }
        }
    }
});

document.getElementById('yearFilter').addEventListener('change', function () {
    const selectedYear = this.value;

    if (selectedYear === 'all') {
        chart.data.datasets = allData.datasets;
    } else {
        chart.data.datasets = allData.datasets.filter(dataset => dataset.label === selectedYear);
    }

    populateTable(selectedYear);
    chart.update();
});

populateTable('all');
