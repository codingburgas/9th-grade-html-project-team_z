       // Specific script for messages.html
        document.addEventListener('DOMContentLoaded', () => {
            let employees = [
                { id: 1, firstName: 'Иван', lastName: 'Петров', EGN: '8012051234', team: 'Alpha', status: 'available' },
                { id: 2, firstName: 'Мария', lastName: 'Георгиева', EGN: '9203105678', team: 'Beta', status: 'in-incident' },
                { id: 3, firstName: 'Георги', lastName: 'Иванов', EGN: '7507159876', team: 'Alpha', status: 'available' },
                { id: 4, firstName: 'Елена', lastName: 'Димитрова', EGN: '8801201122', team: 'Gamma', status: 'on-leave' },
                { id: 5, firstName: 'Петър', lastName: 'Колев', EGN: '9504253344', team: 'Beta', status: 'available' },
                { id: 6, firstName: 'Николай', lastName: 'Стоянов', EGN: '8309015566', team: 'Gamma', status: 'in-incident' },
            ];

            const messageRecipientSelect = document.getElementById('message-recipient');

            const populateRecipientSelect = () => {
                if (messageRecipientSelect) {
                    messageRecipientSelect.innerHTML = '<option value="all">Всички служители</option>';
                    employees.forEach(emp => {
                        const option = document.createElement('option');
                        option.value = emp.id;
                        option.textContent = `${emp.firstName} ${emp.lastName} (${emp.team})`;
                        messageRecipientSelect.appendChild(option);
                    });
                }
            };
            populateRecipientSelect();

            const messageForm = document.getElementById('message-form');
            const messageStatusDiv = document.getElementById('message-status');

            if (messageForm) {
                messageForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const formData = new FormData(messageForm);
                    const recipient = formData.get('message-recipient');
                    const messageText = formData.get('message-text');

                    console.log(`Sending message to ${recipient}: "${messageText}"`);

                    messageStatusDiv.textContent = `Съобщението е изпратено до ${recipient === 'all' ? 'всички служители' : 'служител ' + employees.find(e => e.id == recipient)?.firstName || 'Неизвестен'}!`;
                    messageStatusDiv.classList.remove('error');
                    messageStatusDiv.classList.add('success');
                    messageStatusDiv.style.display = 'block';
                    messageForm.reset();

                    setTimeout(() => {
                        messageStatusDiv.style.display = 'none';
                    }, 3000);

                    const inboxList = document.getElementById('inbox-list');
                    if (inboxList) {
                        const newMessageItem = document.createElement('li');
                        newMessageItem.classList.add('inbox-item', 'new');
                        newMessageItem.innerHTML = `
                            <span class="sender">Вие (До ${recipient === 'all' ? 'Всички' : employees.find(e => e.id == recipient)?.firstName || 'Неизвестен'})</span>
                            <span class="timestamp">${new Date().toLocaleString('bg-BG')}</span>
                            <p>${messageText}</p>
                            <button class="read-btn"><i class="fa-solid fa-eye"></i> Прочетено</button>
                        `;
                        inboxList.prepend(newMessageItem);
                    }
                });
            }

            document.getElementById('messages')?.addEventListener('click', (e) => {
                if (e.target.closest('.read-btn')) {
                    const item = e.target.closest('.inbox-item');
                    if (item) {
                        item.classList.remove('new');
                        e.target.remove();
                    }
                }
            });
        });