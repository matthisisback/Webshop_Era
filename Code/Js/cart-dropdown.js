document.addEventListener("DOMContentLoaded", function() {
    const cartToggle = document.querySelector(".nav-link.cart-toggle");
    const cartDropdown = document.querySelector(".cart-dropdown");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItems = {}; // Stocke les articles ajoutés avec leur quantité

    cartToggle.addEventListener("click", function(event) {
        event.preventDefault();
        cartDropdown.classList.toggle("d-none");
    });

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const itemName = button.getAttribute("data-name");
            const itemPrice = button.getAttribute("data-price");

            if (cartItems[itemName]) {
                // Si l'article existe déjà dans le panier, mettez à jour la quantité
                cartItems[itemName]++;
            } else {
                // Si l'article n'existe pas encore dans le panier, ajoutez-le avec une quantité de 1
                cartItems[itemName] = 1;
            }
            renderCart();
        });
    });

    function renderCart() {
        // Effacer le contenu actuel du panier
        cartDropdown.innerHTML = "";

        // Ajouter chaque article avec sa quantité au panier
        for (const itemName in cartItems) {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            // Nom de l'article
            const itemNameElement = document.createElement("span");
            itemNameElement.textContent = `${itemName} - ${cartItems[itemName]}`;
            cartItem.appendChild(itemNameElement);

            // Bouton de suppression
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", function() {
                delete cartItems[itemName];
                renderCart();
            });
            cartItem.appendChild(deleteButton);

            cartDropdown.appendChild(cartItem);
        }

        // Ajouter le bouton "Checkout" en bas du panier
        const checkoutButton = document.createElement("a");
        checkoutButton.classList.add("dropdown-item", "checkout-button");
        checkoutButton.href = "payment.html";
        checkoutButton.textContent = "Checkout";
        cartDropdown.appendChild(checkoutButton);
    }
});
