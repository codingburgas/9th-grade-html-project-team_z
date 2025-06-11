        // Specific script for map.html
        document.addEventListener('DOMContentLoaded', () => {
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


            let myMap = null;
            let incidentMarkers = L.layerGroup();
            let vehicleMarkers = L.layerGroup();
            let teamMarkers = L.layerGroup(); // New layer group for teams

            const initMap = () => {
                if (myMap !== null) {
                    myMap.remove(); // Remove existing map instance
                }

                myMap = L.map('map', {
                    fullscreenControl: true,
                    center: [42.6977, 23.3219], // Default: Sofia coordinates
                    zoom: 12
                });

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(myMap);

                incidentMarkers.addTo(myMap);
                vehicleMarkers.addTo(myMap);
                teamMarkers.addTo(myMap); // Add team markers layer to map

                updateMapMarkers(); // Initial population
            };

            const updateMapMarkers = () => {
                incidentMarkers.clearLayers();
                vehicleMarkers.clearLayers();
                teamMarkers.clearLayers(); // Clear team markers too

                const filterType = document.getElementById('map-filter-type').value;

                if (filterType === 'all' || filterType === 'active-incidents') {
                    incidents.filter(i => i.status === 'active').forEach(incident => {
                        const icon = L.divIcon({ className: 'custom-div-icon incident', html: '<i class="fa-solid fa-fire"></i>', iconSize: [35, 35], popupAnchor: [0, -15] });
                        const marker = L.marker([incident.lat, incident.lon], { icon: icon })
                            .bindPopup(`<h4>Произшествие: ${incident.type}</h4><p><strong>Адрес:</strong> ${incident.address}</p><p><strong>Екип:</strong> ${incident.team}</p><p><strong>Начало:</strong> ${new Date(incident.startTime).toLocaleString('bg-BG')}</p>`);
                        incidentMarkers.addLayer(marker);
                    });
                }

                if (filterType === 'all' || filterType === 'vehicles') {
                    vehicles.filter(v => v.status === 'available').forEach(vehicle => {
                        const randomLat = 42.6977 + (Math.random() - 0.5) * 0.05;
                        const randomLon = 23.3219 + (Math.random() - 0.5) * 0.05;
                        const icon = L.divIcon({ className: 'custom-div-icon vehicle', html: '<i class="fa-solid fa-truck-fire"></i>', iconSize: [35, 35], popupAnchor: [0, -15] });
                        const marker = L.marker([randomLat, randomLon], { icon: icon })
                            .bindPopup(`<h4>Автомобил: ${vehicle.makeModel}</h4><p><strong>Рег. номер:</strong> ${vehicle.regNum}</p><p><strong>Тип:</strong> ${vehicle.type}</p><p><strong>Статус:</strong> Наличен</p>`);
                        vehicleMarkers.addLayer(marker);
                    });
                }

                if (filterType === 'all' || filterType === 'teams') {
                    employees.filter(e => e.status === 'available').forEach(employee => {
                        const randomLat = 42.6977 + (Math.random() - 0.5) * 0.05;
                        const randomLon = 23.3219 + (Math.random() - 0.5) * 0.05;
                        const icon = L.divIcon({ className: 'custom-div-icon employee', html: '<i class="fa-solid fa-person"></i>', iconSize: [35, 35], popupAnchor: [0, -15] });
                        const marker = L.marker([randomLat, randomLon], { icon: icon })
                            .bindPopup(`<h4>Екип: ${employee.team}</h4><p><strong>Служител:</strong> ${employee.firstName} ${employee.lastName}</p><p><strong>Статус:</strong> Свободен</p>`);
                        teamMarkers.addLayer(marker);
                    });
                }
            };

            const mapFilterSelect = document.getElementById('map-filter-type');
            if (mapFilterSelect) {
                mapFilterSelect.addEventListener('change', updateMapMarkers);
            }
            const refreshMapButton = document.getElementById('refresh-map-btn');
            if (refreshMapButton) {
                refreshMapButton.addEventListener('click', updateMapMarkers);
            }

            initMap(); // Initialize map when the page loads
        });