document.addEventListener("DOMContentLoaded", function() {
    let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    if (!cartItems || typeof cartItems !== "object") {
        cartItems = {};
    }
    let paymentList = document.querySelector(".payment-list");
    let totalPriceElement = document.querySelector(".total-price");
    let payButton = document.querySelector(".pay-button");

    renderPayment();

    function renderPayment() {
        paymentList.innerHTML = "";

        let totalPrice = 0;

        Object.keys(cartItems).forEach(itemName => {
            const itemQuantity = cartItems[itemName].quantity;
            const itemPrice = cartItems[itemName].price;
            let totalItemPrice = itemQuantity * itemPrice;

            if (itemQuantity >= 8 && itemQuantity < 16) {
                totalItemPrice *= 0.92;
            } else if (itemQuantity >= 16) {
                totalItemPrice *= 0.84;
            }

            const paymentItem = document.createElement("li");
            paymentItem.textContent = `${itemName} - Quantity: ${itemQuantity} - Total Price: ${totalItemPrice.toFixed(2)}€`;

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
            payButton.style.display = "none";
        } else {
            payButton.style.display = "block";
        }
    }

    payButton.addEventListener("click", function() {
        alert("Payment completed successfully!");
    });
});
