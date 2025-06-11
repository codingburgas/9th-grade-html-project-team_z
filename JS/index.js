       // Specific script for index.html to manage dashboard counts
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
            let incidents = [
                { id: 1, type: 'Пожар', address: 'ул. Оборище 25', lat: 42.699, lon: 23.322, startTime: '2025-06-05T10:00:00Z', team: 'Alpha', vehicle: 'A1234BK', endTime: '', status: 'active' },
                { id: 2, type: 'Пътен инцидент', address: 'бул. България 150', lat: 42.665, lon: 23.308, startTime: '2025-06-04T14:30:00Z', team: 'Beta', vehicle: 'B5678CC', endTime: '', status: 'active' },
                { id: 3, type: 'Спасителна дейност', address: 'Витоша, Черни връх', lat: 42.593, lon: 23.279, startTime: '2025-06-03T09:00:00Z', team: 'Gamma', vehicle: 'C9012DE', endTime: '2025-06-03T12:00:00Z', status: 'completed' },
                { id: 4, type: 'Пожар', address: 'кв. Надежда 3', lat: 42.730, lon: 23.300, startTime: '2025-06-01T20:00:00Z', team: 'Alpha', vehicle: 'D3456FF', endTime: '2025-06-01T22:30:00Z', status: 'completed' },
            ];

            const updateDashboardCards = () => {
                document.getElementById('active-incidents-count').textContent = incidents.filter(i => i.status === 'active').length;
                document.getElementById('available-teams-count').textContent = employees.filter(e => e.status === 'available').length;
                document.getElementById('available-vehicles-count').textContent = vehicles.filter(v => v.status === 'available').length;
                // document.getElementById('last-update').textContent = new Date().toLocaleTimeString('bg-BG'); // This element doesn't exist anymore if you removed the specific footer text
            };
            updateDashboardCards();

            // Note: The 'employee-status' div and its update function were not present in the provided HTML.
            // If you want to include employee status, you'll need to add a div with id="employee-status"
            // somewhere in your section#home.
            const updateEmployeeStatus = () => {
                const statusDiv = document.getElementById('employee-status');
                if (!statusDiv) return;

                const statusCounts = employees.reduce((acc, emp) => {
                    acc[emp.status] = (acc[emp.status] || 0) + 1;
                    return acc;
                }, {});

                statusDiv.innerHTML = '<h3>Състояние на екипите:</h3>';
                Object.keys(statusCounts).forEach(status => {
                    const statusName = {
                        'available': 'Свободни',
                        'in-incident': 'В произшествие',
                        'on-leave': 'В отпуск'
                    }[status] || status;
                    const statusClass = `status-${status.replace(/ /g, '-')}`;
                    statusDiv.innerHTML += `
                        <div class="status-item">
                            <span class="status-label">${statusName}:</span>
                            <span class="status-value ${statusClass}">${statusCounts[status]}</span>
                        </div>
                    `;
                });
            };
            updateEmployeeStatus(); // Call it if you add the div

            // Removed the event listener for 'refresh-dashboard-data' as the button is not present
            document.getElementById('emergency-call-btn')?.addEventListener('click', () => alert('Изпращане на спешно повикване...'));
        });