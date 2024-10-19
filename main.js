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
