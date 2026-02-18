import React from 'react';
import { Link } from 'react-router-dom';
import {
    Calculator,
    Award,
    Heart,
    Gamepad2,
    BookOpen,
    Info,
    Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="relative w-full min-h-[calc(100vh-4rem)] bg-slate-50 overflow-hidden flex flex-col items-center justify-center font-sans">

            {/* Background Gradient & Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 opacity-80"></div>
            <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                opacity: 0.5
            }}></div>

            {/* Soft decorative glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-float"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-float" style={{ animationDelay: '3s' }}></div>

            <div className="relative z-10 text-center px-4 max-w-6xl mx-auto w-full py-12">

                {/* Hero Mascot */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="mb-8 inline-block relative"
                >
                    <div className="absolute inset-0 bg-yellow-300 rounded-full blur-xl opacity-60 animate-pulse"></div>
                    <div className="relative bg-white p-6 rounded-full shadow-2xl border-[6px] border-white/80">
                        <span className="text-8xl">🦁</span>
                    </div>
                    {/* Floating Sparkles */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-4 -right-4 text-yellow-500"
                    >
                        <Sparkles size={40} />
                    </motion.div>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 drop-shadow-sm font-comic">
                        MathPlay
                    </h1>
                    <p className="text-2xl md:text-3xl text-slate-600 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
                        Where learning math feels like <span className="text-purple-600 font-bold relative inline-block">
                            magic <svg className="absolute w-full h-3 -bottom-1 left-0 text-purple-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.5" /></svg>
                        </span>!
                    </p>
                </motion.div>

                {/* Primary Actions */}
                <div className="flex flex-wrap justify-center gap-6 mb-20">
                    <Link to="/play">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(124, 58, 237, 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-10 py-5 rounded-full text-xl font-bold shadow-lg transition-all"
                        >
                            <Gamepad2 size={28} />
                            Play Games
                        </motion.button>
                    </Link>

                    <Link to="/learn">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.2)" }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-3 bg-white text-slate-700 px-10 py-5 rounded-full text-xl font-bold shadow-lg border-2 border-slate-100 transition-all hover:text-purple-600 hover:border-purple-100"
                        >
                            <BookOpen size={28} className="text-blue-500" />
                            Start Learning
                        </motion.button>
                    </Link>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
                    <FeatureCard
                        icon={<Calculator size={28} className="text-white" />}
                        title="Visual Learning"
                        desc="Understand numbers with fun, interactive objects."
                        color="bg-blue-500"
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={<Award size={28} className="text-white" />}
                        title="Earn Rewards"
                        desc="Collect stars and badges as you master new topics!"
                        color="bg-yellow-500"
                        delay={0.4}
                    />
                    <FeatureCard
                        icon={<Heart size={28} className="text-white" />}
                        title="Autism Friendly"
                        desc="Designed with gentle colors and clear focus."
                        color="bg-pink-500"
                        delay={0.5}
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, color, delay }) => (
    <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay, duration: 0.6, type: "spring" }}
        whileHover={{ y: -8 }}
        className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-50 transition-all hover:shadow-2xl hover:shadow-purple-100/50"
    >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${color} rotate-3`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
        <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
    </motion.div>
);

export default Home;
