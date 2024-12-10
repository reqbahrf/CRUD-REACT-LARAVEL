export default class toast {
    /**
     * Initializes a new instance of the toast class.
     * @constructor
     */
    constructor() {
      this.toastInstance = $('#toast');
    }

    /**
     * Displays a toast notification with the specified background color and message.
     * @param {string} bgcolor - The CSS class for the background color of the toast.
     * @param {string} message - The message to be displayed in the toast.
     * @description
     * This method removes the hidden class from the toast element, updates the background color
     * and message, and sets a timeout to hide the toast after 2 seconds.
     */
    showToast(bgcolor, message) {
      this.toastInstance.find('#toast-content').addClass(bgcolor);
      this.toastInstance.find('#toast-message').text(message);
      this.toastInstance.removeClass('hidden');
      setTimeout(() => {
        this.toastInstance.addClass('hidden');
        this.toastInstance
          .find('#toast-content')
          .removeClass(
            'bg-green-100 bg-red-100 border border-green-400 border-red-400'
          );
      }, 2000);
    }

    /**
     * Hides the toast notification immediately.
     * @description
     * This method adds the hidden class to the toast element,
     * removes any background color and border classes, and clears the toast message.
     */
    closeToast() {
      this.toastInstance.addClass('hidden');
      this.toastInstance
        .find('#toast-content')
        .removeClass(
          'bg-green-100 bg-red-100 border border-green-400 border-red-400'
        );
      this.toastInstance.find('#toast-message').text('');
    }
  }
