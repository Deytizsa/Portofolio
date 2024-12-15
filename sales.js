// Data awal untuk tabel dan chart
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

// Fungsi untuk mengisi tabel
function populateTable(selectedYear) {
    const tableBody = document.getElementById('dataTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Hapus isi tabel sebelumnya

    allData.datasets.forEach(dataset => {
        if (selectedYear === 'all' || dataset.label === selectedYear) {
            const row = document.createElement('tr');

            // Tambah kolom tahun
            const yearCell = document.createElement('td');
            yearCell.textContent = dataset.label;
            row.appendChild(yearCell);

            // Tambah data penjualan per bulan
            dataset.data.forEach(value => {
                const dataCell = document.createElement('td');
                dataCell.textContent = value;
                row.appendChild(dataCell);
            });

            tableBody.appendChild(row);
        }
    });
}

// Inisialisasi Chart.js
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

// Event filter berdasarkan tahun
document.getElementById('yearFilter').addEventListener('change', function () {
    const selectedYear = this.value;

    // Filter dataset berdasarkan pilihan tahun
    if (selectedYear === 'all') {
        chart.data.datasets = allData.datasets;
    } else {
        chart.data.datasets = allData.datasets.filter(dataset => dataset.label === selectedYear);
    }

    // Perbarui tabel dan chart
    populateTable(selectedYear);
    chart.update();
});

// Isi tabel awal
populateTable('all');
