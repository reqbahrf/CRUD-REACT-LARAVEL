export default class modal {
    /**
     * Initializes a new instance of the modal class.
     * @constructor
     */
    constructor() {
      this.modalInstance = $('.modal');
    }

    /**
     * Displays the update modal for a product.
     * @returns {jQuery} The jQuery object representing the modal instance.
     * @description
     * This method removes the hidden class from the modal, sets the header text to
     * "Update Product", displays the update product form, and returns the modal instance.
     */
    getUpdateModalInstance() {
      this.modalInstance.removeClass('hidden');
      this.modalInstance.find('h3').text('Update Product');
      this.modalInstance.find('#updateProductForm').removeClass('hidden');
      return this.modalInstance;
    }

    /**
     * Displays the order modal for a product.
     * @returns {jQuery} The jQuery object representing the modal instance.
     * @description
     * This method removes the hidden class from the modal, sets the header text to
     * "Order Product", displays the order product form, and returns the modal instance.
     */
    getOrderModalInstance() {
      this.modalInstance.removeClass('hidden');
      this.modalInstance.find('h3').text('Order Product');
      this.modalInstance.find('#orderProductForm').removeClass('hidden');
      return this.modalInstance;
    }

     /**
   * Closes the modal and resets its content.
   * @description
   * This method adds the hidden class to the modal, clears the header text,
   * hides the update and order product forms, unbinds any submit events, and resets
   * all input and select elements within the forms.
   */
  closeModal() {
    this.modalInstance.addClass('hidden');
    this.modalInstance.find('h3').text('');
    const modalForms = this.modalInstance.find(
      '#updateProductForm, #orderProductForm'
    );
    modalForms.off('submit');
    modalForms.addClass('hidden');
    modalForms.find('input, select').val('');
  }
}
