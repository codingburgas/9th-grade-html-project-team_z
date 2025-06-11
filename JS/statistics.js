// Specific script for statistics.html
        document.addEventListener('DOMContentLoaded', () => {
            // Dummy data (can be global or fetched)
            let employees = [
                { id: 1, firstName: 'Иван', lastName: 'Петров', EGN: '8012051234', team: 'Alpha', status: 'available' },
                { id: 2, firstName: 'Мария', lastName: 'Георгиева', EGN: '9203105678', team: 'Beta', status: 'in-incident' },
                { id: 3, firstName: 'Георги', lastName: 'Иванов', EGN: '7507159876', team: 'Alpha', status: 'available' },
                { id: 4, firstName: 'Елена', lastName: 'Димитрова', EGN: '8801201122', team: 'Gamma', status: 'on-leave' },
                { id: 5, firstName: 'Петър', lastName: 'Колев', EGN: '9504253344', team: 'Beta', status: 'available' },
                { id: 6, firstName: 'Николай', lastName: 'Стоянов', EGN: '8309015566', team: 'Gamma', status: 'in-incident' },
            ];
            let vehicles = [
                { id: 1, makeModel: 'Mercedes-Benz Sprinter', regNum: 'A1234BK', type: 'Пожарен', team: 'Alpha', status: 'available' },
                { id: 2, makeModel: 'Ford F-Series', regNum: 'B5678CC', type: 'Спасителен', team: 'Beta', status: 'in-incident' },
                { id: 3, makeModel: 'Volvo FL', regNum: 'C9012DE', type: 'Водоноска', team: 'Gamma', status: 'maintenance' },
                { id: 4, makeModel: 'Iveco Daily', regNum: 'D3456FF', type: 'Пожарен', team: 'Alpha', status: 'available' },
            ];
            let incidents = JSON.parse(localStorage.getItem('incidents')) || [
                { id: 1, type: 'Пожар', address: 'ул. Оборище 25', lat: 42.699, lon: 23.322, startTime: '2025-06-05T10:00:00Z', team: 'Alpha', vehicle: 'A1234BK', endTime: '', status: 'active' },
                { id: 2, type: 'Пътен инцидент', address: 'бул. България 150', lat: 42.665, lon: 23.308, startTime: '2025-06-04T14:30:00Z', team: 'Beta', vehicle: 'B5678CC', endTime: '', status: 'active' },
                { id: 3, type: 'Спасителна дейност', address: 'Витоша, Черни връх', lat: 42.593, lon: 23.279, startTime: '2025-06-03T09:00:00Z', team: 'Gamma', vehicle: 'C9012DE', endTime: '2025-06-03T12:00:00Z', status: 'completed' },
                { id: 4, type: 'Пожар', address: 'кв. Надежда 3', lat: 42.730, lon: 23.300, startTime: '2025-06-01T20:00:00Z', team: 'Alpha', vehicle: 'D3456FF', endTime: '2025-06-01T22:30:00Z', status: 'completed' },
            ];

            let incidentTypeChartInstance = null;
            let incidentCountChartInstance = null;
            let employeeParticipationChartInstance = null;
            let vehicleUtilizationChartInstance = null;

            const initCharts = () => {
                if (incidentTypeChartInstance) incidentTypeChartInstance.destroy();
                if (incidentCountChartInstance) incidentCountChartInstance.destroy();
                if (employeeParticipationChartInstance) employeeParticipationChartInstance.destroy();
                if (vehicleUtilizationChartInstance) vehicleUtilizationChartInstance.destroy();

                const incidentTypeCtx = document.getElementById('incidentTypeChart');
                if (incidentTypeCtx) {
                    const typeCounts = incidents.reduce((acc, inc) => {
                        acc[inc.type] = (acc[inc.type] || 0) + 1;
                        return acc;
                    }, {});
                    incidentTypeChartInstance = new Chart(incidentTypeCtx, {
                        type: 'pie',
                        data: {
                            labels: Object.keys(typeCounts),
                            datasets: [{
                                data: Object.values(typeCounts),
                                backgroundColor: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12'],
                                hoverOffset: 4
                            }]
                        },
                        options: { responsive: true, plugins: { legend: { position: 'top' }, title: { display: false } } }
                    });
                }

                const incidentCountOverTimeCtx = document.getElementById('incidentCountOverTimeChart');
                if (incidentCountOverTimeCtx) {
                    incidentCountChartInstance = new Chart(incidentCountOverTimeCtx, {
                        type: 'line',
                        data: {
                            labels: ['Яну', 'Фев', 'Март', 'Апр', 'Май', 'Юни'],
                            datasets: [{
                                label: 'Брой произшествия',
                                data: [10, 12, 8, 15, 11, 14],
                                borderColor: '#3498db', backgroundColor: 'rgba(52, 152, 219, 0.2)', tension: 0.3, fill: true
                            }]
                        },
                        options: { responsive: true, plugins: { legend: { display: false }, title: { display: false } }, scales: { y: { beginAtZero: true } } }
                    });
                }

                const employeeParticipationCtx = document.getElementById('employeeParticipationChart');
                if (employeeParticipationCtx) {
                    const empParticipation = employees.reduce((acc, emp) => {
                        acc[emp.firstName + ' ' + emp.lastName] = Math.floor(Math.random() * 10) + 1;
                        return acc;
                    }, {});
                    employeeParticipationChartInstance = new Chart(employeeParticipationCtx, {
                        type: 'bar',
                        data: {
                            labels: Object.keys(empParticipation),
                            datasets: [{ label: 'Участия в произшествия', data: Object.values(empParticipation), backgroundColor: '#2ecc71', }]
                        },
                        options: { responsive: true, plugins: { legend: { display: false }, title: { display: false } }, scales: { y: { beginAtZero: true } } }
                    });
                }

                const vehicleUtilizationCtx = document.getElementById('vehicleUtilizationChart');
                if (vehicleUtilizationCtx) {
                    const vehicleUtil = vehicles.reduce((acc, veh) => {
                        acc[veh.regNum] = Math.floor(Math.random() * 5) + 1;
                        return acc;
                    }, {});
                    vehicleUtilizationChartInstance = new Chart(vehicleUtilizationCtx, {
                        type: 'bar',
                        data: {
                            labels: Object.keys(vehicleUtil),
                            datasets: [{ label: 'Използваемост', data: Object.values(vehicleUtil), backgroundColor: '#9b59b6', }]
                        },
                        options: { responsive: true, plugins: { legend: { display: false }, title: { display: false } }, scales: { y: { beginAtZero: true } } }
                    });
                }
            };
            initCharts(); // Initialize charts when the page loads
        });