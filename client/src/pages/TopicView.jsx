import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { topicsData } from '../data/topics';
import { ArrowLeft, BookOpen, Gamepad2 } from 'lucide-react';
import TutorialView from '../components/TutorialView';
import GameView from '../components/GameView';
import { motion } from 'framer-motion';

const TopicView = () => {
    const { topicId } = useParams();
    const [searchParams] = useSearchParams();
    const initialMode = searchParams.get('mode') || 'menu'; // 'menu', 'learn', 'play'

    const topic = topicsData[topicId];
    const [mode, setMode] = useState(initialMode);

    // Effect to update mode if URL changes (though unlikely component mount handles it)
    useEffect(() => {
        const urlMode = searchParams.get('mode');
        if (urlMode) setMode(urlMode);
    }, [searchParams]);

    const navigate = useNavigate();

    const handleBack = () => {
        if (mode === 'learn') {
            navigate('/learn');
        } else if (mode === 'play') {
            navigate('/play');
        } else {
            setMode('menu');
        }
    };


    if (!topic) {
        return <div className="text-center mt-20 text-2xl">Topic not found! 😕</div>;
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    if (mode === 'learn') {
        return <TutorialView topic={topic} onBack={handleBack} />;
    }

    if (mode === 'play') {
        return <GameView topic={topic} topicId={topicId} onBack={handleBack} />;
    }

    return (
        <div className="relative w-full min-h-[calc(100vh-4rem)] bg-slate-50 overflow-hidden font-sans">
            {/* Background Gradient & Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-80"></div>
            <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                opacity: 0.5
            }}></div>

            <motion.div
                className="relative z-10 max-w-5xl mx-auto px-4 py-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Link to="/" className="inline-flex items-center text-slate-500 hover:text-purple-600 mb-8 transition-all hover:-translate-x-1 font-medium bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                    <ArrowLeft className="mr-2" size={20} /> Back to Home
                </Link>

                <div className={`${topic.color} rounded-[2rem] p-10 shadow-2xl shadow-purple-100/50 mb-12 text-center relative overflow-hidden transition-transform hover:scale-[1.01]`}>
                    <div className="relative z-10">
                        <h1 className="text-5xl md:text-6xl font-black text-slate-800 mb-6 tracking-tight">{topic.title}</h1>
                        <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto font-medium leading-relaxed opacity-90">{topic.description}</p>
                    </div>
                    {/* Decorative giant icon */}
                    <div className="absolute -top-10 -right-10 opacity-10 rotate-12 mix-blend-multiply">
                        <Gamepad2 size={400} />
                    </div>
                    {/* Sparkles */}
                    <div className="absolute top-10 left-10 text-white/40 animate-pulse">
                        <GameIcon size={40} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <motion.button
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.15)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMode('learn')}
                        className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200 border border-slate-100 flex flex-col items-center gap-6 group transition-all relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="bg-blue-100 p-6 rounded-2xl group-hover:bg-blue-500 transition-colors duration-300 relative z-10">
                            <BookOpen size={48} className="text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">Learn First</h2>
                            <p className="text-slate-500 font-medium">Watch tutorials and understand how it works.</p>
                        </div>
                    </motion.button>

                    <motion.button
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(34, 197, 94, 0.15)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMode('play')}
                        className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200 border border-slate-100 flex flex-col items-center gap-6 group transition-all relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="bg-green-100 p-6 rounded-2xl group-hover:bg-green-500 transition-colors duration-300 relative z-10">
                            <Gamepad2 size={48} className="text-green-600 group-hover:text-white transition-colors" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-slate-800 mb-2">Play Game</h2>
                            <p className="text-slate-500 font-medium">Test your skills with fun interactive games!</p>
                        </div>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

const GameIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
);

export default TopicView;
