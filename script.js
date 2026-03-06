// ===============================
// SMARTRETAIL MAIN SCRIPT
// Beginner Friendly Version
// ===============================

// Get cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ===============================
// ADD TO CART FUNCTION
// ===============================
function addToCart(name, price, selectId) {

    let quantity = parseInt(document.getElementById(selectId).value);

    // Check if item already exists
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart successfully!");
}



// ===============================
// DISPLAY CART ITEMS (cart.html)
// ===============================
function displayCart() {

    let cartContainer = document.getElementById("cart-items");

    if (!cartContainer) return; // stop if not on cart page

    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<h3>Your cart is empty</h3>";
        return;
    }

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <p><b>${item.name}</b></p>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: ${item.quantity} Kg</p>
                <p>Total: ₹${itemTotal}</p>
                <button onclick="removeItem(${index})">Remove</button>
                <hr>
            </div>
        `;
    });

    cartContainer.innerHTML += `<h2>Grand Total: ₹${total}</h2>`;
}



// ===============================
// REMOVE SINGLE ITEM
// ===============================
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}



// ===============================
// CLEAR ENTIRE CART
// ===============================
function clearCart() {
    localStorage.removeItem("cart");
    cart = [];
    displayCart();
}





// ===============================
// PRINT BILL
// ===============================
function printBill() {
    window.print();
}

// ===============================
// PLACE ORDER FUNCTION
// ===============================
function placeOrder() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully! Thank you for shopping with SmartRetail.");

    // Clear cart after order
    localStorage.removeItem("cart");
    cart = [];

    // Redirect to home page (optional)
    window.location.href = "index.html";
}
// =======================
// SHOW CHECKOUT ITEMS
// =======================
function displayCheckout() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let itemsDiv = document.getElementById("checkout-items");
    let subtotalSpan = document.getElementById("subtotal");
    let taxSpan = document.getElementById("tax");
    let totalSpan = document.getElementById("total");

    // If checkout page not open, stop
    if (!itemsDiv) return;

    itemsDiv.innerHTML = "";

    if (cart.length === 0) {
        itemsDiv.innerHTML = "<h3>Your cart is empty</h3>";
        subtotalSpan.innerText = "0";
        taxSpan.innerText = "0";
        totalSpan.innerText = "0";
        return;
    }

    let subtotal = 0;

    cart.forEach(function(item) {

        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        itemsDiv.innerHTML +=
            "<p>" +
            item.name + " - " +
            item.quantity + " Kg - ₹" +
            itemTotal +
            "</p>";
    });

    let tax = subtotal * 0.05;
    let total = subtotal + tax;

    subtotalSpan.innerText = subtotal;
    taxSpan.innerText = tax.toFixed(2);
    totalSpan.innerText = total.toFixed(2);
}

// ===============================
// AUTO RUN FUNCTIONS WHEN PAGE LOADS
// ===============================
window.onload = function() {
    displayCart();
    displayCheckout();
};