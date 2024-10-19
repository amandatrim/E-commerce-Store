document.addEventListener('DOMContentLoaded', () => {
    const sizeSelect = document.getElementById('size-select');
    const productPrice = document.getElementById('product-price');
    const purchaseButton = document.getElementById('purchase-button');
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    // Object representing stock availability for each size
    const stockAvailability = {
        small: true, // Small size is in stock
        medium: true, // Medium size is in stock
        large: false // Large size is out of stock
    };

    // Task 1: Dynamically update the size options based on stock availability
    function updateSizeOptions() {
        sizeSelect.innerHTML = ''; // Clear existing options

        // Iterate through the stock availability and create new options
        for (const [size, available] of Object.entries(stockAvailability)) {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = available ? `${size.charAt(0).toUpperCase() + size.slice(1)} (In Stock)` : `${size.charAt(0).toUpperCase() + size.slice(1)} (Not In Stock)`;

            // Disable option if not available in stock
            if (!available) {
                option.disabled = true;
            }

            // Append option to the dropdown
            sizeSelect.appendChild(option);
        }
    }

    // Initial call to populate size options
    updateSizeOptions();
    // Task 2: Update price and purchase button status when a size is selected
    sizeSelect.addEventListener('change', (event) => {
        const selectedSize = event.target.value;

        // Update price based on selected size
        if (selectedSize === 'small') {
            productPrice.textContent = '20.00';
        } else if (selectedSize === 'medium') {
            productPrice.textContent = '25.00';
        } else if (selectedSize === 'large') {
            productPrice.textContent = '30.00';
        }

        // Enable or disable purchase button based on stock availability
        purchaseButton.disabled = !stockAvailability[selectedSize];
    });

    // Task 3: Handle the purchase button click event
    purchaseButton.addEventListener('click', () => {
        const selectedSize = sizeSelect.value;

        // Check stock availability before allowing purchase
        if (!stockAvailability[selectedSize]) {
            alert('This product size is out of stock and cannot be purchased.');
        } else {
            alert('Purchase successful! Thank you for your order.');
        }
    });
    // Task 4: Handle form submission for adding new products
    productForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get product details from the form
        const name = document.getElementById('product-name-input').value;
        const price = document.getElementById('product-price-input').value;
        const size = document.getElementById('product-size-input').value;

        // Create a new product entry in the DOM
        const newProduct = document.createElement('div');
        newProduct.classList.add('product');
        newProduct.innerHTML = `
        <h3>${name}</h3>
        <p>Price: $<span class="product-price">${price}</span></p>
        <p>Size: <span class="product-size">${size.charAt(0).toUpperCase() + size.slice(1)}</span></p>
        <button class="purchase-button">Purchase</button>
    `;

        // Append new product to the product list
        productList.appendChild(newProduct);

        // Reset the form for next input
        productForm.reset();
    });
    // Task 5: Enable purchase for newly added products (Event Delegation)
    productList.addEventListener('click', (event) => {
        if (event.target.classList.contains('purchase-button')) {
            const product = event.target.closest('.product');
            const productName = product.querySelector('h3').textContent;
            const productSize = product.querySelector('.product-size').textContent;

            alert(`You have purchased the ${productName} in size ${productSize}.`);
        }
    });
});