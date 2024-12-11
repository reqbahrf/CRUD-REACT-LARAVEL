import { useState, useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timeout = setTimeout(() => {
                setVisible(false);
                onClose && onClose();
            }, 3000); // Auto-hide after 3 seconds
            return () => clearTimeout(timeout);
        }
    }, [message, onClose]);

    return visible ? (
        <div
            className={`fixed top-20 right-0 p-4 ${
                type === "success" ? "bg-green-100 border border-green-400" : "bg-red-100 border border-red-400"
            } shadow-md rounded-lg px-4 py-3`}
            role="alert"
        >
            <div className="flex items-center">
                <div className="flex-1 text-sm font-medium text-gray-900">
                    {message}
                </div>
                <button
                    onClick={() => {
                        setVisible(false);
                        onClose && onClose();
                    }}
                    className="ml-3 text-sm font-medium text-blue-500 hover:underline"
                >
                    Close
                </button>
            </div>
        </div>
    ) : null;
};

export default Toast;
