// Specific script for report-incident.html
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
            let incidents = JSON.parse(localStorage.getItem('incidents')) || []; // Load from storage

            const incidentTeamSelect = document.getElementById('incident-team');
            const incidentVehicleSelect = document.getElementById('incident-vehicle');

            const populateTeamAndVehicleSelects = () => {
                if (incidentTeamSelect) {
                    incidentTeamSelect.innerHTML = '<option value="">Избери екип</option>';
                    const uniqueTeams = [...new Set(employees.map(emp => emp.team))];
                    uniqueTeams.forEach(team => {
                        const option = document.createElement('option');
                        option.value = team;
                        option.textContent = team;
                        incidentTeamSelect.appendChild(option);
                    });
                }
                if (incidentVehicleSelect) {
                    incidentVehicleSelect.innerHTML = '<option value="">Избери автомобил</option>';
                    vehicles.forEach(vehicle => {
                        const option = document.createElement('option');
                        option.value = vehicle.regNum;
                        option.textContent = `${vehicle.makeModel} (${vehicle.regNum})`;
                        incidentVehicleSelect.appendChild(option);
                    });
                }
            };
            populateTeamAndVehicleSelects();

            const incidentReportForm = document.getElementById('incident-report-form');
            const reportMessageDiv = document.getElementById('report-message');

            if (incidentReportForm) {
                incidentReportForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const formData = new FormData(incidentReportForm);
                    const newIncident = {
                        id: incidents.length > 0 ? Math.max(...incidents.map(i => i.id)) + 1 : 1, // Simple ID generation
                        type: formData.get('incident-type'),
                        address: formData.get('incident-address'),
                        lat: parseFloat(formData.get('incident-lat')),
                        lon: parseFloat(formData.get('incident-lon')),
                        startTime: new Date().toISOString(),
                        team: formData.get('incident-team'),
                        vehicle: formData.get('incident-vehicle'),
                        endTime: '',
                        status: 'active'
                    };

                    incidents.push(newIncident);
                    localStorage.setItem('incidents', JSON.stringify(incidents)); // Save to storage

                    reportMessageDiv.textContent = 'Произшествието е докладвано успешно!';
                    reportMessageDiv.classList.remove('error');
                    reportMessageDiv.classList.add('success');
                    reportMessageDiv.style.display = 'block';
                    incidentReportForm.reset();

                    setTimeout(() => {
                        reportMessageDiv.style.display = 'none';
                    }, 3000);
                });
            }
        });