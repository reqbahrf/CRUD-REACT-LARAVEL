export class Toast {
    /**
     * Creates a new Toast instance
     * @param {string} toastId - The ID of the toast element (default: 'toast')
     */
    constructor(toastId = "toast") {
        this.toastElement = document.getElementById(toastId);
    }

    /**
     * Displays a toast notification with the specified background color and message.
     * @param {string} bgcolor - The CSS class for the background color of the toast.
     * @param {string} message - The message to be displayed in the toast.
     */
    showToast(bgcolor, message) {
        const toastContent = this.toastElement.querySelector("#toast-content");
        const toastMessage = this.toastElement.querySelector("#toast-message");

        toastContent.classList.add(bgcolor);
        toastMessage.textContent = message;
        this.toastElement.classList.remove("hidden");

        setTimeout(() => {
            this.toastElement.classList.add("hidden");
            toastContent.classList.remove(
                "bg-green-100",
                "bg-red-100",
                "border",
                "border-green-400",
                "border-red-400"
            );
        }, 2000);
    }

    /**
     * Hides the toast notification immediately.
     */
    closeToast() {
        const toastContent = this.toastElement.querySelector("#toast-content");
        const toastMessage = this.toastElement.querySelector("#toast-message");

        this.toastElement.classList.add("hidden");
        toastContent.classList.remove(
            "bg-green-100",
            "bg-red-100",
            "border",
            "border-green-400",
            "border-red-400"
        );
        toastMessage.textContent = "";
    }
}

// Create a singleton instance for easy usage
const toast = new Toast();
export default toast;
