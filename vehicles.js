// Specific script for vehicles.html
        document.addEventListener('DOMContentLoaded', () => {
            // Dummy data (can be global or fetched)
            let vehicles = [
                { id: 1, makeModel: 'Mercedes-Benz Sprinter', regNum: 'A1234BK', type: 'Пожарен', team: 'Alpha', status: 'available' },
                { id: 2, makeModel: 'Ford F-Series', regNum: 'B5678CC', type: 'Спасителен', team: 'Beta', status: 'in-incident' },
                { id: 3, makeModel: 'Volvo FL', regNum: 'C9012DE', type: 'Водоноска', team: 'Gamma', status: 'maintenance' },
                { id: 4, makeModel: 'Iveco Daily', regNum: 'D3456FF', type: 'Пожарен', team: 'Alpha', status: 'available' },
            ];

            const populateVehiclesTable = (data) => {
                const tableBody = document.querySelector('#vehicles-table tbody');
                if (!tableBody) return;
                tableBody.innerHTML = '';

                data.forEach(vehicle => {
                    const row = tableBody.insertRow();
                    row.insertCell().textContent = vehicle.makeModel;
                    row.insertCell().textContent = vehicle.regNum;
                    row.insertCell().textContent = vehicle.type;
                    row.insertCell().textContent = vehicle.team;
                    row.insertCell().textContent = vehicle.status === 'available' ? 'Наличен' : (vehicle.status === 'in-incident' ? 'В произшествие' : 'В ремонт');

                    const actionsCell = row.insertCell();
                    actionsCell.classList.add('table-actions');
                    actionsCell.innerHTML = `
                        <button class="btn btn-icon edit" data-id="${vehicle.id}"><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-icon delete" data-id="${vehicle.id}"><i class="fa-solid fa-trash-can"></i></button>
                    `;
                });
            };
            populateVehiclesTable(vehicles);

            // Add Vehicle button (dummy functionality)
            document.getElementById('add-vehicle-btn')?.addEventListener('click', () => alert('Отвори форма за добавяне на автомобил.'));

            // Filter/Search functionality (simplified)
            const vehicleSearch = document.getElementById('vehicle-search');
            const vehicleStatusFilter = document.getElementById('vehicle-status-filter');

            const filterVehicles = () => {
                let filtered = vehicles;
                const searchTerm = vehicleSearch.value.toLowerCase();
                const statusFilter = vehicleStatusFilter.value;

                if (searchTerm) {
                    filtered = filtered.filter(veh =>
                        veh.makeModel.toLowerCase().includes(searchTerm) ||
                        veh.regNum.toLowerCase().includes(searchTerm) ||
                        veh.type.toLowerCase().includes(searchTerm) ||
                        veh.status.toLowerCase().includes(searchTerm)
                    );
                }

                if (statusFilter !== 'all') {
                    filtered = filtered.filter(veh => veh.status === statusFilter);
                }
                populateVehiclesTable(filtered);
            };

            vehicleSearch?.addEventListener('input', filterVehicles);
            vehicleStatusFilter?.addEventListener('change', filterVehicles);
        });