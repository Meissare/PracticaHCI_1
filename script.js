document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-events');
    const citySelect = document.getElementById('select-city');
    const cardsContainer = document.getElementById('event-cards-container');
    const filtersContainer = document.getElementById('category-filters');

    // Datos de eventos simulados con ciudades y categorías
    let eventsData = [
        { id: 1, title: 'Estreno: Interestelar', category: 'Cine', city: 'Madrid' },
        { id: 2, title: 'Ciclo Kubrick', category: 'Cine', city: 'Barcelona' },
        { id: 3, title: 'Hamlet en el Albéniz', category: 'Teatro', city: 'Madrid' },
        { id: 4, title: 'Musical: El Rey León', category: 'Teatro', city: 'Madrid' },
        { id: 5, title: 'Concierto de Rock: Banda X', category: 'Concierto', city: 'Valencia' },
        { id: 6, title: 'Festival de Jazz 2025', category: 'Concierto', city: 'Barcelona' },
        { id: 7, title: 'Partido Baloncesto', category: 'Deporte', city: 'Madrid' },
        { id: 8, title: 'Carrera Popular', category: 'Deporte', city: 'Valencia' },
    ];

    const categories = ['Todos', 'Cine', 'Teatro', 'Concierto', 'Deporte'];

    // Variables de estado
    let currentSearchQuery = '';
    let currentCategory = 'Todos';
    let currentCity = 'Todos';

    // --- Funciones de Renderizado ---

    function createEventCard(event) {
        const card = document.createElement('div');
        card.classList.add('event-card');
        card.innerHTML = `
            <h3>${event.title}</h3>
            <p>Categoría: <strong>${event.category}</strong></p>
            <p>Ciudad: <strong>${event.city}</strong></p>
            <button class="reserve-btn" data-event-id="${event.id}">Reservar</button>
        `;
        cardsContainer.appendChild(card);
    }

    function createFilterBadges() {
        categories.forEach(category => {
            const button = document.createElement('button');
            button.classList.add('badge');
            button.textContent = category;
            button.setAttribute('data-category', category);
            if (category === 'Todos') button.classList.add('active');

            button.addEventListener('click', () => {
                // Actualiza el estado y el UI de los botones
                document.querySelectorAll('.badge').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentCategory = category;
                filterAndRenderEvents();
            });

            filtersContainer.appendChild(button);
        });
    }

    // --- Lógica de Filtrado Principal ---

    function filterAndRenderEvents() {
        cardsContainer.innerHTML = ''; // Limpia el contenedor actual

        const filteredEvents = eventsData.filter(event => {
            // Filtrar por búsqueda (título)
            const matchesSearch = event.title.toLowerCase().includes(currentSearchQuery.toLowerCase());
            
            // Filtrar por categoría
            const matchesCategory = currentCategory === 'Todos' || event.category === currentCategory;

            // Filtrar por ciudad
            const matchesCity = currentCity === 'Todos' || event.city === currentCity;
            
            return matchesSearch && matchesCategory && matchesCity;
        });

        filteredEvents.forEach(createEventCard);
        addReservationListeners();
    }

    // --- Lógica de Reserva ---

    function addReservationListeners() {
        document.querySelectorAll('.reserve-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const eventId = e.target.getAttribute('data-event-id');
                const event = eventsData.find(e => e.id == eventId);
                alert(`¡Has reservado una plaza para "${event.title}" en ${event.city}! (ID: ${eventId})`);
                // Aquí se añadiría lógica real de reserva, como enviar a un servidor o guardar en localStorage
            });
        });
    }

    // --- Inicialización y Event Listeners ---

    // Event Listener para Input de Búsqueda
    searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value;
        filterAndRenderEvents();
    });

    // Event Listener para Select de Ciudad
    citySelect.addEventListener('change', (e) => {
        currentCity = e.target.value;
        filterAndRenderEvents();
    });

    // Inicializar filtros, renderizar botones y eventos iniciales
    createFilterBadges();
    filterAndRenderEvents(); // Renderiza todos los eventos por defecto
});
