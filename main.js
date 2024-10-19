document.addEventListener('DOMContentLoaded', () => {
    const sizeSelect = document.getElementById('size-select');
    const productPrice = document.getElementById('product-price');
    const purchaseButton = document.getElementById('purchase-button');
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    // Object representing stock availability for each size
    const stockAvailability = {
        small: true,   // Small size is in stock
        medium: true,  // Medium size is in stock
        large: false   // Large size is out of stock
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
