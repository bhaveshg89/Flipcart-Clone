let cartItems = [];
let cartPrices = [];
const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");

searchInput.addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    let visibleCount = 0;

    productCards.forEach(function (card) {
        const productName = card.querySelector("h3").textContent.toLowerCase();

        if (productName.includes(searchText)) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    document.getElementById("noResultsMessage").style.display =
        visibleCount === 0 ? "block" : "none";
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
        <h2>🛒 My Shopping Cart</h2>
        <button onclick="closeCart()" class="continue-shopping">
    Continue Shopping
</button>
        ${cartItems.length === 0 ? "<p>Your cart is empty!</p>" : ""}
       ${cartItems.map((item, index) => `
    <p>
        ${item} - ₹${cartPrices[index]}
        <button onclick="removeFromCart(${index})">Remove</button>
    </p>
`).join("")}
    `;
    const totalPrice = cartPrices.reduce((total, price) => total + price, 0);

cartItemsDiv.querySelector(".cart-box").innerHTML += `
    <h3>Total: ₹${totalPrice.toLocaleString("en-IN")}</h3>
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
    cartPrices.splice(index, 1);

    cartCount = cartItems.length;

    document.getElementById("cartCount").textContent = cartCount;

    openCart();
}


function togglePassword() {
    const passwordInput = document.getElementById("passwordInput");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

document.getElementById("loginPopup").addEventListener("click", function(event) {
    if (event.target.id === "loginPopup") {
        closeLogin();
    }
});


const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

function subscribeNewsletter() {
    const email = document.getElementById("newsletterEmail").value;

    if (email === "") {
        alert("Please enter your email address!");
    } else if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address!");
    } else {
        alert("Thank you for subscribing! 🎉");
        document.getElementById("newsletterEmail").value = "";
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const button = document.getElementById("darkModeBtn");

    if (document.body.classList.contains("dark-mode")) {
        button.textContent = "☀️ Light Mode";
        localStorage.setItem("darkMode", "enabled");
    } else {
        button.textContent = "🌙 Dark Mode";
        localStorage.setItem("darkMode", "disabled");
    }
}


window.addEventListener("DOMContentLoaded", function () {
    const darkModeBtn = document.getElementById("darkModeBtn");

    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeBtn.textContent = "☀️ Light Mode";
    }
});

function clearSearch() {
    const searchInput = document.getElementById("searchInput");

    searchInput.value = "";

    productCards.forEach(function (card) {
        card.style.display = "block";
    });

    document.getElementById("noResultsMessage").style.display = "none";
}

function sortProducts() {
    const sortValue = document.getElementById("sortProducts").value;
    const cards = document.querySelectorAll(".product-card");

    const groups = {};

    cards.forEach(function (card, index) {
        if (card.dataset.originalOrder === undefined) {
            card.dataset.originalOrder = index;
        }

        const parent = card.parentElement;

        if (!groups[parent]) {
            groups[parent] = [];
        }

        groups[parent].push(card);
    });

    Object.values(groups).forEach(function (group) {
        group.sort(function (a, b) {
            const priceA = Number(
                (a.textContent.match(/₹\s*([\d,]+)/) || ["", "0"])[1].replace(/,/g, "")
            );

            const priceB = Number(
                (b.textContent.match(/₹\s*([\d,]+)/) || ["", "0"])[1].replace(/,/g, "")
            );

            if (sortValue === "low") return priceA - priceB;
            if (sortValue === "high") return priceB - priceA;

            if (sortValue === "name") {
                return a.querySelector("h3").textContent.localeCompare(
                    b.querySelector("h3").textContent
                );
            }

            return Number(a.dataset.originalOrder) - Number(b.dataset.originalOrder);
        });

        group.forEach(function (card) {
            card.parentElement.appendChild(card);
        });
    });
}































