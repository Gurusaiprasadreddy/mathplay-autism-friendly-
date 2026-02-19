import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, BookOpen, Gamepad2, Settings, Info } from 'lucide-react';

const Layout = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gradient-to-br from-pastel-blue via-white to-pastel-pink font-comic overflow-hidden">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-md z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-wiggle">
                                MathPlay
                            </span>
                            <span className="text-2xl">🎓</span>
                        </Link>

                        <div className="flex space-x-8">
                            <Link to="/" className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${isActive('/') ? 'bg-pastel-blue text-white' : 'text-gray-600 hover:text-purple-500'}`}>
                                <Home size={20} />
                                <span className="font-semibold">Home</span>
                            </Link>
                            <Link to="/learn" className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${isActive('/learn') ? 'bg-pastel-blue text-white' : 'text-gray-600 hover:text-purple-500'}`}>
                                <BookOpen size={20} />
                                <span className="font-semibold">Learn</span>
                            </Link>
                            <Link to="/play" className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${isActive('/play') ? 'bg-pastel-blue text-white' : 'text-gray-600 hover:text-purple-500'}`}>
                                <Gamepad2 size={20} />
                                <span className="font-semibold">Play</span>
                            </Link>
                            <Link to="/cartoon" className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${isActive('/cartoon') ? 'bg-pastel-blue text-white' : 'text-gray-600 hover:text-purple-500'}`}>
                                <Gamepad2 size={20} />
                                <span className="font-semibold">Cartoon</span>
                            </Link>
                            <Link to="/product" className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${isActive('/product') ? 'bg-pastel-blue text-white' : 'text-gray-600 hover:text-purple-500'}`}>
                                <Info size={20} />
                                <span className="font-semibold">About</span>
                            </Link>
                            <Link to="/details" className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${isActive('/details') ? 'bg-pastel-blue text-white' : 'text-gray-600 hover:text-purple-500'}`}>
                                <BookOpen size={20} />
                                <span className="font-semibold">Details</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[calc(100vh-4rem)]">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white/50 backdrop-blur-sm py-4 text-center text-gray-500 text-sm">
                <p>© 2026 MathPlay for Kids using MERN Stack</p>
            </footer>
        </div>
    );
};

export default Layout;
