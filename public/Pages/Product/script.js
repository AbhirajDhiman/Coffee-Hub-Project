// Select elements
const productContainer = document.querySelector(".products-container");
const cartContainer = document.querySelector(".cart-container");
const Total = document.querySelector(".final");
const badge = document.querySelector(".badge");
const cartPopUp = document.querySelector(".cart-wrapper");
const Cart = document.querySelector(".cart");
const closeBtn = document.querySelector(".close");

// Variables
let cartProducts = [];

// Functions
function productCard(imgPath, name, description, price) {
    productContainer.innerHTML += `
        <div class="card">
            <div class="image-container">
                <img class="product-img" src=${imgPath} alt="Coffee Product"/>
            </div>
            <div class="content">
                <h2 class="item-head">${name}</h2>
                <p>${description}</p>
                <h3 class="product-price">${price}</h3>
                <button class="buy-now">Add To Cart</button>
            </div>
        </div>
    `;
}

function inArray(needle, haystack) {
    return haystack.includes(needle);
}

function addItem(img, name, price) {
    const imgPath = img.src.replace("http://127.0.0.1:5500/public/Pages/Product/", "");
    cartContainer.innerHTML += `
        <div class="cart-row">
            <div class="cart-item">
                <img class="cart-img" src=${imgPath} alt="error">
                <p class="cart-item-name">${name}</p>
            </div>
            <div class="cart-price">
                ${price}$
            </div>
            <div class="cart-quantity">
                <input class="item-no" value="1" type="number">
                <div class="remove-btn">
                    <button class="button">
                        <div class="icon">
                            <svg class="top"><use xlink:href="#top"></use></svg>
                            <svg class="bottom"><use xlink:href="#bottom"></use></svg>
                        </div>
                        <span>Delete</span>
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                        <symbol id="top" viewBox="0 0 24 24">
                            <path d="M15,4 C15.5522847,4 16,4.44771525 16,5 L16,6 L18.25,6 C18.6642136,6 19,6.33578644 19,6.75 C19,7.16421356 18.6642136,7.5 18.25,7.5 L5.75,7.5 C5.33578644,7.5 5,7.16421356 5,6.75 C5,6.33578644 5.33578644,6 5.75,6 L8,6 L8,5 C8,4.44771525 8.44771525,4 9,4 L15,4 Z"></path>
                        </symbol>
                        <symbol id="bottom" viewBox="0 0 24 24">
                            <path d="M16.9535129,8 C17.4663488,8 17.8890201,8.38604019 17.9467852,8.88337887 L17.953255,9.02270969 L17.5309272,18.3196017 C17.5119599,18.7374363 17.2349366,19.0993109 16.8365446,19.2267053 C15.2243631,19.7422351 13.6121815,20 12,20 C10.3878264,20 8.77565288,19.7422377 7.16347932,19.226713 C6.76508717,19.0993333 6.48806648,18.7374627 6.46907425,18.3196335 L6.04751853,9.04540766 C6.02423185,8.53310079 6.39068134,8.09333626 6.88488406,8.01304774 L7.02377738,8.0002579 L16.9535129,8 Z"></path>
                        </symbol>
                    </svg>
                </div>
            </div>
        </div>
    `;

    setupDeleteButton();
    priceUpdate();
    setupQuantityChangeListener();
}

function setupDeleteButton() {
    document.querySelectorAll(".button").forEach(button => {
        button.addEventListener("click", e => {
            if (!button.classList.contains("delete")) {
                button.classList.add("delete");
            }

            const parentTarget = e.target.closest(".cart-row");
            setTimeout(() => {
                parentTarget.remove();
                cartProducts = cartProducts.filter(item => item !== parentTarget.querySelector(".cart-item-name").innerText);
                priceUpdate();
            }, 2000);
        });
    });
}

function setupQuantityChangeListener() {
    document.querySelectorAll(".item-no").forEach(element => {
        element.addEventListener("change", () => priceUpdate());
    });
}

function priceUpdate() {
    const noOfItems = document.querySelectorAll(".item-no");
    let total = 0;

    noOfItems.forEach(element => {
        const elementPrice = parseFloat(element.parentElement.parentElement.querySelector(".cart-price").innerText.replace("$", ""));
        const quantity = element.value;
        total += elementPrice * quantity;
    });

    Total.innerHTML = `${total}$`;
    if(cartProducts.length == 0){
        badge.style.opacity = '0';
    }
    else{
        console.log("cart khali haini");
        badge.style.opacity = '1';
    }
}

// Fetch product data
fetch('imageData.json')
    .then(response => response.json())
    .then(imageData => {
        imageData.forEach(element => productCard(element.image, element.name, element.description, element.price));
    })
    .then(() => {
        document.querySelectorAll(".buy-now").forEach(button => {
            button.addEventListener("click", e => {
                const productCard = e.target.closest(".card");
                const name = productCard.querySelector(".item-head").innerText;
                const img = productCard.querySelector(".product-img");
                const price = productCard.querySelector(".product-price").innerText;

                if (inArray(name, cartProducts)) {
                    alert("Product is already in cart");
                } else {
                    cartProducts.push(name);
                    addItem(img, name, price);
                    alert("Product added to cart");
                }
            });
        });
    });
cartPopUp.addEventListener("click", function(){
    console.log("I am clicked");
    
    Cart.style.transform = "translatex(0)"
})
closeBtn.addEventListener("click", function(){
    console.log("I am clicked");
    
    Cart.style.transform = "translateY(100%)"
})