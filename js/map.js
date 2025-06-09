
        // Инициализиране на картата с център София
        var map = L.map('map').setView([42.49485565542847, 27.466464873406828], 13);
        
        // Добавяне на OpenStreetMap слой
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Добавяне на маркер за Бургас
        var fireStation = L.marker([42.49485565542847, 27.466464873406828]).addTo(map);
        fireStation.bindPopup("<b>Fire station Burgas</b>").openPopup();
    