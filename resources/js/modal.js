export class Modal {
    /**
     * Creates a new Modal instance
     * @param {string} modalClass - The class of the modal element (default: 'modal')
     */
    constructor(modalClass = "modal") {
        this.modalElement = document.querySelector(`.${modalClass}`);
    }

    /**
     * Displays the update modal for a product.
     * @returns {HTMLElement} The modal element
     */
    getUpdateModalInstance() {
        this.modalElement.classList.remove("hidden");
        this.modalElement.querySelector("h3").textContent = "Update Product";
        this.modalElement
            .querySelector("#updateProductForm")
            .classList.remove("hidden");
        return this.modalElement;
    }

    /**
     * Displays the order modal for a product.
     * @returns {HTMLElement} The modal element
     */
    getOrderModalInstance() {
        this.modalElement.classList.remove("hidden");
        this.modalElement.querySelector("h3").textContent = "Order Product";
        this.modalElement
            .querySelector("#orderProductForm")
            .classList.remove("hidden");
        return this.modalElement;
    }

    /**
     * Closes the modal and resets its content.
     */
    closeModal() {
        this.modalElement.classList.add("hidden");
        this.modalElement.querySelector("h3").textContent = "";

        const forms = ["#updateProductForm", "#orderProductForm"];
        forms.forEach((formId) => {
            const form = this.modalElement.querySelector(formId);
            // Remove event listeners
            const newForm = form.cloneNode(true);
            form.parentNode.replaceChild(newForm, form);

            // Hide form and reset values
            newForm.classList.add("hidden");
            newForm.querySelectorAll("input, select").forEach((input) => {
                input.value = "";
            });
        });
    }
}

// Create a singleton instance for easy usage
const modal = new Modal();
export default modal;
