document.addEventListener("DOMContentLoaded", function() {
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || {};
    const paymentList = document.querySelector(".payment-list");
    const totalPriceElement = document.querySelector(".total-price");
    const addButtons = document.querySelectorAll(".add-button");
    const removeButtons = document.querySelectorAll(".remove-button");
    const deleteButton = document.querySelector(".delete-button");

    renderPayment();

    function renderPayment() {
        paymentList.innerHTML = "";

        let totalPrice = 0;

        Object.keys(cartItems).forEach(itemName => {
            const itemQuantity = cartItems[itemName].quantity;
            const itemPrice = cartItems[itemName].price;
            const totalItemPrice = itemQuantity * itemPrice;

            const paymentItem = document.createElement("li");
            paymentItem.textContent = `${itemName} - Quantity: ${itemQuantity} - Price per item: ${itemPrice.toFixed(2)}€ - Total: ${totalItemPrice.toFixed(2)}€`;

            const addButton = document.createElement("button");
            addButton.textContent = "+";
            addButton.classList.add("add-button");
            addButton.addEventListener("click", function() {
                cartItems[itemName].quantity++;
                sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
                renderPayment();
            });

            const removeButton = document.createElement("button");
            removeButton.textContent = "-";
            removeButton.classList.add("remove-button");
            removeButton.addEventListener("click", function() {
                if (cartItems[itemName].quantity > 0) {
                    cartItems[itemName].quantity--;
                    if (cartItems[itemName].quantity === 0) {
                        delete cartItems[itemName];
                    }
                    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
                    renderPayment();
                }
            });

            paymentItem.appendChild(addButton);
            paymentItem.appendChild(removeButton);
            paymentList.appendChild(paymentItem);

            totalPrice += totalItemPrice;
        });

        totalPriceElement.textContent = `Total Price: ${totalPrice.toFixed(2)}€`;

        if (Object.keys(cartItems).length === 0) {
            deleteButton.style.display = "none";
        } else {
            deleteButton.style.display = "block";
        }
    }

    deleteButton.addEventListener("click", function() {
        sessionStorage.removeItem("cartItems");
        renderPayment();
    });
});
