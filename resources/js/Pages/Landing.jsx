import { Link } from "@inertiajs/react";
import Footer from "@/Components/Footer";
export default function Landing() {
    return (
        <>
            <header className="fixed z-50 w-full bg-teal-800 text-white">
                <div className="container mx-auto flex items-center justify-between px-4 py-4">
                    <h1 className="text-3xl font-bold">Malativas.com</h1>
                    <nav className="flex space-x-4">
                        <a
                            href="#"
                            className="text-lg font-semibold text-white hover:text-teal-200"
                        >
                            HOME
                        </a>
                        <a
                            href="#"
                            className="text-lg font-semibold text-white hover:text-teal-200"
                        >
                            FAQ
                        </a>
                        <a
                            href="#"
                            className="text-lg font-semibold text-white hover:text-teal-200"
                        >
                            ABOUT
                        </a>
                        <Link
                            href={route("login")}
                            className="text-lg font-semibold text-white hover:text-teal-200"
                        >
                            LOG IN
                        </Link>
                    </nav>
                </div>
            </header>

            <div
                className="flex min-h-screen items-center justify-center bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url('/images/pagebackground.webp')`,
                }}
            >
                <div className="absolute w-2/4 bg-teal-800/[0.4] p-4 text-white">
                    <h1 className="relative bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text pb-6 text-5xl font-bold text-transparent">
                        Streamline Your Product Workflow
                    </h1>
                    <p className="z-0 text-gray-200 text-lg font-semibold text-justify">
                        Say goodbye to manual spreadsheets and hello to a
                        streamlined product workflow. Our platform helps you
                        centralize product information, automate tasks, and gain
                        real-time insights. With our intuitive interface and
                        customizable workflows, you can focus on what matters
                        most.
                    </p>
                    <div className="flex justify-end">
                        <button className="mt-6 rounded-lg bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600">
                            Try It Now
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
