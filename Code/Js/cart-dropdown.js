document.addEventListener("DOMContentLoaded", function() {
    const cartToggle = document.querySelector(".nav-link.cart-toggle");
    const cartDropdown = document.querySelector(".cart-dropdown");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {}; // Charger le contenu du panier depuis le stockage local ou initialiser un objet vide

    renderCart(); // Appeler la fonction pour afficher le panier dès que le DOM est chargé

    cartToggle.addEventListener("click", function(event) {
        event.preventDefault();
        cartDropdown.classList.toggle("d-none");
    });

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const itemName = button.getAttribute("data-name");

            if (cartItems[itemName]) {
                // Si l'article existe déjà dans le panier, mettez à jour la quantité
                cartItems[itemName]++;
            } else {
                // Si l'article n'existe pas encore dans le panier, ajoutez-le avec une quantité de 1
                cartItems[itemName] = 1;
            }
            // Mettre à jour le contenu du panier dans le stockage local
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            renderCart(); // Réafficher le panier avec les modifications apportées
        });
    });

    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-button")) {
            const itemName = event.target.parentElement.querySelector("span").textContent.split(" - ")[0];
            delete cartItems[itemName];
            // Mettre à jour le contenu du panier dans le stockage local après la suppression
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            renderCart(); // Réafficher le panier avec les modifications apportées
        }
    });

    function renderCart() {
        // Effacer le contenu actuel du panier
        cartDropdown.innerHTML = "";

        // Ajouter chaque article avec sa quantité non nulle au panier
        Object.keys(cartItems).forEach(itemName => {
            if (cartItems[itemName] !== null) { // Vérifier si la quantité n'est pas nulle
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");

                // Nom de l'article avec sa quantité
                const itemNameElement = document.createElement("span");
                itemNameElement.textContent = `${itemName} - x${cartItems[itemName]}`;
                cartItem.appendChild(itemNameElement);

                // Bouton de suppression
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.classList.add("delete-button");
                cartItem.appendChild(deleteButton);

                cartDropdown.appendChild(cartItem);
            }
        });

        // Ajouter le bouton "Checkout" en bas du panier
        const checkoutButton = document.createElement("a");
        checkoutButton.classList.add("dropdown-item", "checkout-button");
        checkoutButton.href = "payment.html";
        checkoutButton.textContent = "Checkout";
        cartDropdown.appendChild(checkoutButton);
    }
});

