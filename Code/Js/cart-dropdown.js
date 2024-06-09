document.addEventListener("DOMContentLoaded", function() {
    const cartToggle = document.querySelector(".nav-link.cart-toggle");
    const cartDropdown = document.querySelector(".cart-dropdown");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartCountElement = document.querySelector(".cart-count");
    let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || {};

    renderCart();
    updateCartCount();

    cartToggle.addEventListener("click", function(event) {
        event.preventDefault();
        cartDropdown.classList.toggle("d-none");
    });

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const itemName = button.getAttribute("data-name");
            const itemPrice = parseFloat(button.getAttribute("data-price"));

            if (cartItems[itemName]) {
                cartItems[itemName].quantity++;
            } else {
                cartItems[itemName] = {
                    quantity: 1,
                    price: itemPrice
                };
            }

            sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
            renderCart();
            updateCartCount();
        });
    });

    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-button")) {
            const itemName = event.target.parentElement.querySelector("span").textContent.split(" - ")[0];
            delete cartItems[itemName];
            sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
            renderCart();
            updateCartCount();
        }
    });

    function renderCart() {
        cartDropdown.innerHTML = "";

        Object.keys(cartItems).forEach(itemName => {
            if (cartItems[itemName].quantity !== null) {
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");

                const itemQuantity = cartItems[itemName].quantity;

                const itemNameElement = document.createElement("span");
                itemNameElement.textContent = `${itemName} - Quantity: ${itemQuantity}`;
                cartItem.appendChild(itemNameElement);

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.classList.add("delete-button");
                cartItem.appendChild(deleteButton);

                cartDropdown.appendChild(cartItem);
            }
        });

        const checkoutButton = document.createElement("a");
        checkoutButton.classList.add("dropdown-item", "checkout-button");
        checkoutButton.href = "payment.html";
        checkoutButton.textContent = "Checkout";
        cartDropdown.appendChild(checkoutButton);
    }

    function updateCartCount() {
        const itemCount = Object.values(cartItems).reduce((sum, item) => sum + (item.quantity || 0), 0);
        cartCountElement.textContent = itemCount;
    }
});
