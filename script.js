const products = [
    { id: 1, name: 'Producto 1', price: 100, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Producto 2', price: 200, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Producto 3', price: 300, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Producto 4', price: 400, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Producto 5', price: 500, image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Producto 6', price: 600, image: 'https://via.placeholder.com/150' },
];

let cart = JSON.parse(localStorage.getItem('cart')) || []; // Cargar el carrito desde localStorage

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar la lista antes de añadir los productos

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product); // Agregar el producto al carrito
        updateCartCount(); // Actualizar el conteo del carrito
        localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage
        showNotification(`${product.name} ha sido agregado al carrito.`); // Notificación
        console.log(cart); // Verifica que el carrito tenga productos
    }
}

function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId); // Eliminar el producto del carrito
    updateCartCount(); // Actualizar el conteo del carrito
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage
    showNotification(`Producto eliminado del carrito.`); // Notificación
    viewCart(); // Volver a mostrar el carrito
}

function clearCart() {
    cart = []; // Vaciar el carrito
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage
    updateCartCount(); // Actualizar el conteo del carrito
    viewCart(); // Volver a mostrar el carrito
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Ocultar después de 3 segundos
}

function calculateTotal() {
    return cart.reduce((total, product) => total + product.price, 0); // Calcular el total
}

function updateCartCount() {
    const cartCountDisplay = document.getElementById('cart-count');
    cartCountDisplay.textContent = `Carrito: ${cart.length} artículo(s)`;
}

function viewCart() {
    console.log(cart); // Para ver el contenido del carrito en la consola
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Limpiar la lista del carrito

    if (cart.length === 0) {
        cartList.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>Precio: $${product.price}</p>
            <button onclick="removeFromCart(${product.id})">Eliminar</button>
        `;
        
        cartList.appendChild(cartItem);
    });

    // Mostrar el precio total
    const total = calculateTotal();
    const totalDisplay = document.createElement('div');
    totalDisplay.innerHTML = `<strong>Precio Total: $${total}</strong>`;
    cartList.appendChild(totalDisplay);
}

function searchProducts() {
    const query = document.getElementById('search').value.toLowerCase();
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar la lista antes de añadir los productos

    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        
        productList.appendChild(productDiv);
    });
}

function toggleCart() {
    const cartContainer = document.getElementById('cart-container');
    
    if (cartContainer.style.display === 'none' || cartContainer.style.display === '') {
        cartContainer.style.display = 'block'; // Mostrar carrito
        viewCart(); // Llenar la vista del carrito
    } else {
        cartContainer.style.display = 'none'; // Ocultar carrito
    }
}

// Inicializa el evento del botón del carrito al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cart-button').addEventListener('click', toggleCart);
    displayProducts();
    updateCartCount(); // Muestra el conteo inicial del carrito
});
