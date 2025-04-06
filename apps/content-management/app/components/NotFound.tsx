import { Link } from "@tanstack/react-router";

export function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center text-white p-4 max-h-[calc(100vh - 65px)]">
            <div className="text-center mb-8">
                <h2 className="text-8xl font-bold text-yellow-400 mb-4">404</h2>
                <p className="max-w-md mb-8 text-gray-400">
                    The page you're looking for doesn't exist.
                </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/" className="border-zinc-800 bg-yellow-500 text-zinc-950 hover:bg-yellow-400 transition-colors text-sm font-medium transition-all flex items-center rounded-md p-2 px-4">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};