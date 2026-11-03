let cartItems = [];
let cartPrices = [];
const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");

searchInput.addEventListener("input", function () {

    const searchText = this.value.toLowerCase();

    productCards.forEach(function (card) {

        const productName = card.querySelector("h3").textContent.toLowerCase();

        if (productName.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});
function openLogin() {
    document.getElementById("loginPopup").style.display = "flex";
}

function closeLogin() {
    document.getElementById("loginPopup").style.display = "none";
}
let cartCount = 0;

function addToCart(productName, productPrice) {

    cartCount++;

    cartItems.push(productName);
    cartPrices.push(productPrice);

    document.getElementById("cartCount").textContent = cartCount;

    alert(productName + " added to cart!");
}
function openCart() {
    const cartItemsDiv = document.getElementById("cartPopup");

    cartItemsDiv.querySelector(".cart-box").innerHTML = `
        <span class="close-cart" onclick="closeCart()">×</span>
        <h2>My Cart</h2>
       ${cartItems.map((item, index) => `
    <p>
        ${item}
        <button onclick="removeFromCart(${index})">Remove</button>
    </p>
`).join("")}
    `;

    cartItemsDiv.style.display = "flex";
}
document.querySelector(".close-cart").addEventListener("click", function() {
    document.getElementById("cartPopup").style.display = "none";
});
function closeCart() {
    document.getElementById("cartPopup").style.display = "none";
}
function removeFromCart(index) {
    cartItems.splice(index, 1);

    cartCount = cartItems.length;

    document.getElementById("cartCount").textContent = cartCount;

    openCart();
}











