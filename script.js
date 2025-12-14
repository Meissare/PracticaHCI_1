document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Funcionalidad de Filtros ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const contentCards = document.querySelectorAll('.card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Manejar estados active (CSS)
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Filtrar los elementos
            contentCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- 2. Simulación de Guardar Eventos (usando localStorage) ---
    // En un proyecto real, usarías un ID único para cada evento.
    const saveButtons = document.querySelectorAll('.save-btn');
    
    saveButtons.forEach((button, index) => {
        // Cargar estado guardado al cargar la página
        const isSaved = localStorage.getItem(`eventSaved_${index}`) === 'true';
        if (isSaved) {
            button.classList.add('saved');
            button.textContent = "Evento Guardado";
        }

        button.addEventListener('click', (event) => {
            // Prevenir comportamiento por defecto si estuviera en un formulario
            event.preventDefault(); 

            // Alternar estado guardado
            if (button.classList.contains('saved')) {
                button.classList.remove('saved');
                button.textContent = "Guardar Evento";
                localStorage.setItem(`eventSaved_${index}`, 'false');
                console.log(`Evento ${index} eliminado de guardados.`);
            } else {
                button.classList.add('saved');
                button.textContent = "Evento Guardado";
                localStorage.setItem(`eventSaved_${index}`, 'true');
                console.log(`Evento ${index} guardado exitosamente.`);
            }
        });
    });
});
