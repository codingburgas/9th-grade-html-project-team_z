// Specific script for incidents.html
        document.addEventListener('DOMContentLoaded', () => {
            let incidents = JSON.parse(localStorage.getItem('incidents')) || [
                { id: 1, type: 'Пожар', address: 'ул. Оборище 25', lat: 42.699, lon: 23.322, startTime: '2025-06-05T10:00:00Z', team: 'Alpha', vehicle: 'A1234BK', endTime: '', status: 'active' },
                { id: 2, type: 'Пътен инцидент', address: 'бул. България 150', lat: 42.665, lon: 23.308, startTime: '2025-06-04T14:30:00Z', team: 'Beta', vehicle: 'B5678CC', endTime: '', status: 'active' },
                { id: 3, type: 'Спасителна дейност', address: 'Витоша, Черни връх', lat: 42.593, lon: 23.279, startTime: '2025-06-03T09:00:00Z', team: 'Gamma', vehicle: 'C9012DE', endTime: '2025-06-03T12:00:00Z', status: 'completed' },
                { id: 4, type: 'Пожар', address: 'кв. Надежда 3', lat: 42.730, lon: 23.300, startTime: '2025-06-01T20:00:00Z', team: 'Alpha', vehicle: 'D3456FF', endTime: '2025-06-01T22:30:00Z', status: 'completed' },
            ];

            const populateIncidentsTable = (data) => {
                const tableBody = document.querySelector('#incidents-table tbody');
                if (!tableBody) return;
                tableBody.innerHTML = '';

                data.forEach(incident => {
                    const row = tableBody.insertRow();
                    row.insertCell().textContent = incident.type;
                    row.insertCell().textContent = incident.address;
                    row.insertCell().textContent = `${incident.lat.toFixed(4)}, ${incident.lon.toFixed(4)}`;
                    row.insertCell().textContent = new Date(incident.startTime).toLocaleString('bg-BG');
                    row.insertCell().textContent = incident.team;
                    row.insertCell().textContent = incident.vehicle;
                    row.insertCell().textContent = incident.endTime ? new Date(incident.endTime).toLocaleString('bg-BG') : 'Неприключено';
                    row.insertCell().textContent = incident.status === 'active' ? 'Активно' : 'Приключено';

                    const actionsCell = row.insertCell();
                    actionsCell.classList.add('table-actions');
                    actionsCell.innerHTML = `
                        <button class="btn btn-icon view" data-id="${incident.id}"><i class="fa-solid fa-eye"></i></button>
                        ${incident.status === 'active' ? `<button class="btn btn-icon btn-primary finish-incident-btn" data-id="${incident.id}"><i class="fa-solid fa-check"></i> Завърши</button>` : ''}
                    `;
                });
            };
            populateIncidentsTable(incidents);

            // Finish Incident button functionality
            document.getElementById('incidents-table')?.addEventListener('click', (e) => {
                if (e.target.closest('.finish-incident-btn')) {
                    const incidentId = parseInt(e.target.closest('.finish-incident-btn').dataset.id);
                    const incidentToUpdate = incidents.find(inc => inc.id === incidentId);
                    if (incidentToUpdate && incidentToUpdate.status === 'active') {
                        incidentToUpdate.status = 'completed';
                        incidentToUpdate.endTime = new Date().toISOString();
                        localStorage.setItem('incidents', JSON.stringify(incidents)); // Update storage
                        populateIncidentsTable(incidents); // Re-render table
                        alert(`Произшествие ID ${incidentId} е маркирано като завършено.`);
                    }
                } else if (e.target.closest('.view')) {
                    const incidentId = e.target.closest('.view').dataset.id;
                    alert(`Преглед на произшествие ID: ${incidentId}`);
                    // In a real app, you'd navigate to a detail page or open a modal
                }
            });

            // Filtering and Sorting (simplified)
            const filterType = document.getElementById('filter-type');
            const searchInput = document.getElementById('search-input');
            const sortBy = document.getElementById('sort-by');
            const sortOrderBtn = document.getElementById('sort-order');
            let isAscending = true;

            const applyFiltersAndSort = () => {
                let filteredAndSorted = [...incidents]; // Create a copy

                // Filter
                const currentFilterType = filterType.value;
                const currentSearchTerm = searchInput.value.toLowerCase();

                if (currentFilterType !== 'all') {
                    filteredAndSorted = filteredAndSorted.filter(inc => inc.type === currentFilterType);
                }
                if (currentSearchTerm) {
                    filteredAndSorted = filteredAndSorted.filter(inc =>
                        inc.address.toLowerCase().includes(currentSearchTerm) ||
                        inc.team.toLowerCase().includes(currentSearchTerm) ||
                        inc.type.toLowerCase().includes(currentSearchTerm)
                    );
                }

                // Sort
                const currentSortBy = sortBy.value;
                filteredAndSorted.sort((a, b) => {
                    let valA, valB;
                    switch (currentSortBy) {
                        case 'date':
                            valA = new Date(a.startTime);
                            valB = new Date(b.startTime);
                            break;
                        case 'location':
                            valA = a.address;
                            valB = b.address;
                            break;
                        case 'type':
                            valA = a.type;
                            valB = b.type;
                            break;
                        case 'team':
                            valA = a.team;
                            valB = b.team;
                            break;
                    }
                    if (valA < valB) return isAscending ? -1 : 1;
                    if (valA > valB) return isAscending ? 1 : -1;
                    return 0;
                });

                populateIncidentsTable(filteredAndSorted);
            };

            filterType?.addEventListener('change', applyFiltersAndSort);
            searchInput?.addEventListener('input', applyFiltersAndSort);
            sortBy?.addEventListener('change', applyFiltersAndSort);
            sortOrderBtn?.addEventListener('click', () => {
                isAscending = !isAscending;
                sortOrderBtn.querySelector('i').classList.toggle('fa-arrow-up-wide-short', isAscending);
                sortOrderBtn.querySelector('i').classList.toggle('fa-arrow-down-wide-short', !isAscending);
                applyFiltersAndSort();
            });

            document.getElementById('export-incidents-btn')?.addEventListener('click', () => alert('Експортиране на данни за произшествия.'));
        });