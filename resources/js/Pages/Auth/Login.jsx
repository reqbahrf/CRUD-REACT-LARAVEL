import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login.store'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{ backgroundImage: `url('/images/pagebackground.webp')` }}>
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={submit}>
                    <div className="rounded-md shadow-sm space-y-px">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                className="mt-1 mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                className="mt-1 mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <span className="my-2 text-sm text-gray-600">Remember me</span>
                            </label>

                            <Link
                                href=""
                                className="text-sm text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        </div>

                        <div className="mt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-teal-800 py-2 px-4 block text-center text-white transition hover:bg-teal-700"
                            >
                                {processing ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <Link
                        href={route('register')}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                    >
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
