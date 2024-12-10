class Product {
    /**
     * Initializes a new instance of the Product class, setting up CSRF token and API endpoints.
     *
     * @property {string} csrfToken - The CSRF token for requests.
     * @property {string} getSales - The endpoint URL to fetch sales data.
     * @property {string} getAllProductsUrl - The endpoint URL to retrieve all products.
     * @property {string} addProductUrl - The endpoint URL to add a new product.
     * @property {string} showProduct - The endpoint URL to display a specific product.
     * @property {string} updateProductUrl - The endpoint URL to update a product.
     * @property {string} deleteProductUrl - The endpoint URL to delete a product.
     */
    constructor() {
        const metaTag = document.querySelector('meta[name="csrf-token"]');
        this.csrfToken = metaTag ? metaTag.getAttribute('content') : '';
        this.getSales = PRODUCTS_URL_ENDPOINTS.GET_SALES;
        this.getAllProductsUrl = PRODUCTS_URL_ENDPOINTS.GET_ALL_PRODUCTS;
        this.addProductUrl = PRODUCTS_URL_ENDPOINTS.ADD_PRODUCT;
        this.showProduct = PRODUCTS_URL_ENDPOINTS.SHOW_PRODUCT;
        this.updateProductUrl = PRODUCTS_URL_ENDPOINTS.UPDATE_PRODUCT;
        this.deleteProductUrl = PRODUCTS_URL_ENDPOINTS.DELETE_PRODUCT;
    }

    /**
     * Fetches all products from the API.
     *
     * @returns {Promise<Object>} - A promise that resolves with the response containing
     * the list of products or an error message if the request fails.
     */
    async getAllProducts() {
        try {
            const response = await fetch(this.getAllProductsUrl, {
                method: 'GET',
                headers: {
                    'X-CSRF-TOKEN': this.csrfToken,
                    'Accept': 'application/json'
                },
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            return { message: 'Error: ' + error.message, success: false };
        }
    }

    /**
     * Adds a new product to the inventory.
     * @param {File} image The product image
     * @param {string} name The product name
     * @param {string} category The product category
     * @param {number} quantity The product quantity
     * @param {number} price The product price
     * @returns {Promise<{message: string, success: boolean, response: object}>}
     */
    async addProduct(image, name, category, quantity, price) {
        try {
            const formData = new FormData();
            formData.append('product-image', image, image.name);
            formData.append('product-name', name);
            formData.append('category', category);
            formData.append('quantity', quantity);
            formData.append('price', price);

            const response = await fetch(this.addProductUrl, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': this.csrfToken,
                },
                body: formData
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return { message: 'Product Added Successfully', success: true, response: data };
        } catch (error) {
            const errorMessage = this.getErrorMessage(error);
            return { message: 'Error: ' + errorMessage, success: false };
        }
    }

    /**
     * Updates a product using the specified id and values.
     *
     * @param {number} id The id of the product to update
     * @param {File} [image] The image to update (if any)
     * @param {'ORDER'|'UPDATE'} action The type of update to perform
     * @param {string} name The new name of the product (if updating)
     * @param {string} category The new category of the product (if updating)
     * @param {number} quantity The new quantity of the product (if updating)
     * @param {number} price The new price of the product (if updating)
     * @param {{quantity: number, price: number}} [soldProduct] The sold product information (if ordering)
     *
     * @returns {Promise<{message: string, success: boolean, response: object}>}
     */
    async updateProduct(id, image = null, action, name, category, quantity, price, soldProduct = null) {
        try {
            const updateProductData = new FormData();
            updateProductData.append('_method', 'PUT');
            updateProductData.append('Action', action);

            if (action === 'ORDER' && soldProduct) {
                updateProductData.append('Ordered_quantity', soldProduct.quantity);
                updateProductData.append('Ordered_Total', soldProduct.price);
            } else if (action === 'UPDATE') {
                if (image) {
                    updateProductData.append('product-image', image, image.name);
                }
                updateProductData.append('name', name);
                updateProductData.append('category', category);
                updateProductData.append('quantity', quantity);
                updateProductData.append('price', price);
            }

            const response = await fetch(this.updateProductUrl.replace(':id', id), {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': this.csrfToken,
                },
                body: updateProductData
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return { message: 'Product Updated Successfully', success: true, response: data };
        } catch (error) {
            const errorMessage = this.getErrorMessage(error);
            return { message: 'Error: ' + errorMessage, success: false };
        }
    }

    /**
     * Deletes a product from the inventory by its id using a DELETE request.
     *
     * @param {number} id - The id of the product to delete.
     * @returns {Promise<Object>} - An object containing a success message if the product was deleted,
     *                              or an error message if the deletion failed.
     */
    async deleteProduct(id) {
        try {
            const response = await fetch(this.deleteProductUrl.replace(':id', id), {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': this.csrfToken,
                    'Accept': 'application/json'
                },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            
            if (data.message) {
                return { message: data.message, success: true };
            } else {
                throw new Error('Failed to delete product');
            }
        } catch (error) {
            const errorMessage = this.getErrorMessage(error);
            return { message: 'Error: ' + errorMessage, success: false };
        }
    }

    /**
     * Places an order for a product and updates the product's quantity and sales info
     * @param {number} id - The id of the product to order
     * @param {string} action - The type of action to perform (ORDER)
     * @param {number} orderedProductQuantity - The quantity of the product ordered
     * @param {number} orderedProductTotalPrice - The total price of the product ordered
     * @returns {Promise<Object>} - A promise that resolves to an object with message, success, and updatedProduct properties
     */
    async orderProduct(id, action, orderedProductQuantity, orderedProductTotalPrice) {
        try {
            const product = await this.getProductById(id);
            if (product) {
                product.quantity -= orderedProductQuantity;

                const soldProduct = {
                    id: product.id,
                    name: product.product_name,
                    quantity: orderedProductQuantity,
                    price: orderedProductTotalPrice,
                };

                const updatedProduct = await this.updateProduct(id, null, action, null, null, null, null, soldProduct);
                return {
                    message: `Order for Product ${product.product_name} processed successfully`,
                    success: true,
                    updatedProduct,
                };
            } else {
                return { message: 'Product Not Found', success: false };
            }
        } catch (error) {
            const errorMessage = this.getErrorMessage(error);
            return { message: 'Error: ' + errorMessage, success: false };
        }
    }

    /**
     * Fetches a product from the Laravel API by its id
     *
     * @param {number} id - The id of the product to fetch
     * @returns {Promise<Object|null>} - The fetched product object or null if an error occurred
     */
    async getProductById(id) {
        try {
            const response = await fetch(this.showProduct.replace(':id', id), {
                method: 'GET',
                headers: {
                    'X-CSRF-TOKEN': this.csrfToken,
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    }

    /**
     * Retrieves a list of sold products, their total quantity sold, and total revenue from the Laravel API.
     * @returns {Promise<{soldProductNames: string[], totalQuantitySold: number, totalPriceSold: number}>}
     * Returns a promise that resolves to an object containing the sold product names, total quantity sold, and total price sold.
     * If an error occurs, the promise resolves to an object with a "message" property and "success" property set to false.
     */
    async getSoldProducts() {
        try {
            const response = await fetch(this.getSales, {
                method: 'GET',
                headers: {
                    'X-CSRF-TOKEN': this.csrfToken,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            
            const soldProductNames = data.map((product) => product.product_name);
            const totalQuantitySold = data.reduce(
                (acc, product) => acc + product.total_qty,
                0
            );
            const totalPriceSold = data.reduce(
                (acc, product) => acc + product.total_price,
                0
            );

            return { soldProductNames, totalQuantitySold, totalPriceSold };
        } catch (error) {
            return { message: 'Error: ' + error.message, success: false };
        }
    }

    getErrorMessage(error) {
        if (error.response && error.response.json) {
            return error.response.json().then(data => 
                `${data.error || data.message}`
            );
        } else if (error.message) {
            return error.message.includes('HTTP error') ? 
                'Network error. Please try again later.' : 
                error.message;
        } else {
            return 'An unexpected error occurred';
        }
    }
}
