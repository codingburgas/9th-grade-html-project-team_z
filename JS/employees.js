// Specific script for employees.html
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

            const populateEmployeesTable = (data) => {
                const tableBody = document.querySelector('#employees-table tbody');
                if (!tableBody) return;
                tableBody.innerHTML = '';

                data.forEach(emp => {
                    const row = tableBody.insertRow();
                    row.insertCell().textContent = emp.firstName;
                    row.insertCell().textContent = emp.lastName;
                    row.insertCell().textContent = emp.EGN;
                    row.insertCell().textContent = emp.team;
                    row.insertCell().textContent = emp.status === 'available' ? 'Свободен' : (emp.status === 'in-incident' ? 'В произшествие' : 'В отпуск');
                    
                    const actionsCell = row.insertCell();
                    actionsCell.classList.add('table-actions');
                    actionsCell.innerHTML = `
                        <button class="btn btn-icon edit" data-id="${emp.id}"><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-icon delete" data-id="${emp.id}"><i class="fa-solid fa-trash-can"></i></button>
                    `;
                });
            };
            populateEmployeesTable(employees);

            // Add Employee/Manage Teams buttons (dummy functionality)
            document.getElementById('add-employee-btn')?.addEventListener('click', () => alert('Отвори форма за добавяне на служител.'));
            document.getElementById('manage-teams-btn')?.addEventListener('click', () => alert('Отвори прозорец за управление на екипи.'));

            // Filter/Search functionality (simplified)
            const employeeSearch = document.getElementById('employee-search');
            const employeeStatusFilter = document.getElementById('employee-status-filter');

            const filterEmployees = () => {
                let filtered = employees;
                const searchTerm = employeeSearch.value.toLowerCase();
                const statusFilter = employeeStatusFilter.value;

                if (searchTerm) {
                    filtered = filtered.filter(emp =>
                        emp.firstName.toLowerCase().includes(searchTerm) ||
                        emp.lastName.toLowerCase().includes(searchTerm) ||
                        emp.team.toLowerCase().includes(searchTerm) ||
                        emp.status.toLowerCase().includes(searchTerm)
                    );
                }

                if (statusFilter !== 'all') {
                    filtered = filtered.filter(emp => emp.status === statusFilter);
                }
                populateEmployeesTable(filtered);
            };

            employeeSearch?.addEventListener('input', filterEmployees);
            employeeStatusFilter?.addEventListener('change', filterEmployees);
        });