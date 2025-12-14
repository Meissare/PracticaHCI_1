document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.querySelector('.event-cards-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventForm = document.getElementById('event-form');
    const eventTitleInput = document.getElementById('event-title');
    const eventCategorySelect = document.getElementById('event-category');

    // Datos iniciales de eventos (simulando 2 por categoría)
    let eventsData = [
        { id: 1, title: 'Estreno: Interestelar', category: 'Cine' },
        { id: 2, title: 'Ciclo Kubrick en Cineteca', category: 'Cine' },
        { id: 3, title: 'Hamlet en el Albéniz', category: 'Teatro' },
        { id: 4, title: 'Musical: El Rey León', category: 'Teatro' },
        { id: 5, title: 'Concierto de Rock: Banda X', category: 'Concierto' },
        { id: 6, title: 'Festival de Jazz 2025', category: 'Concierto' }
    ];

    // Cargar eventos guardados de localStorage si existen
    function loadEventsFromStorage() {
        const storedEvents = localStorage.getItem('userEvents');
        if (storedEvents) {
            // Combinamos los eventos predefinidos con los guardados por el usuario
            eventsData = eventsData.concat(JSON.parse(storedEvents));
        }
    }

    // Guardar solo los eventos añadidos por el usuario en localStorage
    function saveUserEvent(newEvent) {
        // Obtenemos solo los eventos que no son los predefinidos (ID > 6 en este ejemplo simple)
        const userEvents = eventsData.filter(event => event.id > 6);
        localStorage.setItem('userEvents', JSON.stringify(userEvents));
    }

    // Función para renderizar una sola tarjeta de evento
    function createEventCard(event) {
        const card = document.createElement('div');
        card.classList.add('event-card');
        card.setAttribute('data-category', event.category);
        card.innerHTML = `
            <h3>${event.title}</h3>
            <p>Categoría: <strong>${event.category}</strong></p>
        `;
        cardsContainer.appendChild(card);
    }

    // Función principal para mostrar los eventos filtrados
    function filterEvents(selectedCategory) {
        // Elimina el estado 'active' de todos los botones
        filterButtons.forEach(button => button.classList.remove('active'));
        // Añade 'active' solo al botón clickeado
        document.querySelector(`button[data-category="${selectedCategory}"]`).classList.add('active');

        // Renderiza u oculta las tarjetas
        document.querySelectorAll('.event-card').forEach(card => {
            if (selectedCategory === 'Todos' || card.getAttribute('data-category') === selectedCategory) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // --- Inicialización y Event Listeners ---

    // 1. Cargar datos guardados al inicio
    loadEventsFromStorage();

    // 2. Renderizar todos los eventos iniciales
    eventsData.forEach(createEventCard);
    
    // 3. Añadir Event Listeners a los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            filterEvents(category);
        });
    });

    // 4. Manejar el formulario para guardar nuevos eventos
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTitle = eventTitleInput.value.trim();
        const newCategory = eventCategorySelect.value;
        
        if (newTitle && newCategory) {
            const newEvent = {
                id: Date.now(), // Usamos timestamp como ID simple para evitar colisiones
                title: newTitle,
                category: newCategory
            };
            
            eventsData.push(newEvent);
            createEventCard(newEvent); // Añade la tarjeta al DOM
            saveUserEvent(newEvent); // Guarda en localStorage
            
            eventTitleInput.value = ''; // Limpia el input
            // Si el filtro actual es 'Todos' o la categoría del nuevo evento, se mostrará automáticamente.
        }
    });
});

