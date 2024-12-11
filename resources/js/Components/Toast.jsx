export default function Toast() {
    return (
        <div id="toast" class="fixed top-20 right-0 p-4 bg-green hidden">
            <div id="toast-content" class="shadow-md rounded-lg px-4 py-3">
                <div class="flex items-center">
                    <div
                        id="toast-message"
                        class="flex-1 text-sm font-medium text-gray-900"
                    ></div>
                    <button class="ml-3 text-sm font-medium text-blue-500 hover:underline">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
