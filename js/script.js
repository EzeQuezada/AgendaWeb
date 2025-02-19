const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const addContactSection = document.getElementById('addContactSection');

// Función para obtener y mostrar los contactos
async function fetchContacts() {
    try {
        const response = await fetch('http://localhost:3000/agenda');
        const data = await response.json();
        contactList.innerHTML = ''; // Limpiar la lista
        data.forEach(contact => {
            const li = document.createElement('li');
            li.textContent = `${contact.nombre} ${contact.apellido} - ${contact.telefono}`;
            contactList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al obtener los contactos:', error);
    }
}

// Función para agregar un nuevo contacto
contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newContact = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value
    };

    try {
        const response = await fetch('http://localhost:3000/agenda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        });
        const data = await response.json();
        console.log('Contacto agregado:', data);
        fetchContacts(); // Actualizar la lista
        contactForm.reset(); // Limpiar el formulario
        addContactSection.style.display = 'block'; // Mostrar el formulario de nuevo
    } catch (error) {
        console.error('Error al agregar el contacto:', error);
    }
});

// Función para buscar contactos
function searchContacts() {
    const searchText = searchInput.value.toLowerCase(); 
    const contactItems = document.querySelectorAll('#contactList li'); 

    // Ocultar el formulario de agregar contacto
    addContactSection.style.display = 'none';

    // Filtrar y mostrar/ocultar contactos
    contactItems.forEach(item => {
        const text = item.textContent.toLowerCase(); // Obtener el texto del contacto
        if (text.includes(searchText)) {
            item.style.display = 'block'; // Mostrar el contacto si coincide
        } else {
            item.style.display = 'none'; // Ocultar el contacto si no coincide
        }
        return  addContactSection.style.display = 'block';
    });
}

// Escuchar el evento de búsqueda
searchButton.addEventListener('click', searchContacts);
searchInput.addEventListener('input', searchContacts);

// Cargar los contactos al cargar la página
fetchContacts();