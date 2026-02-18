import React from 'react';
import { Link } from 'react-router-dom';
import {
    SortAsc,
    Sigma,
    Divide,
    Orbit,
    Scale
} from 'lucide-react';
import { motion } from 'framer-motion';

const topics = [
    { id: 'counting', title: 'Counting', icon: <SortAsc size={40} />, color: 'bg-pastel-blue' },
    { id: 'addition', title: 'Addition', icon: <Sigma size={40} />, color: 'bg-pastel-green' },
    { id: 'subtraction', title: 'Subtraction', icon: <div className="text-4xl font-bold pb-2">-</div>, color: 'bg-pastel-pink' },
    { id: 'multiplication', title: 'Multiplication', icon: <div className="text-4xl font-bold pb-1">×</div>, color: 'bg-pastel-yellow' },
    { id: 'division', title: 'Division', icon: <Divide size={40} />, color: 'bg-pastel-purple' },
    { id: 'sequence', title: 'Sequence', icon: <Orbit size={40} />, color: 'bg-pastel-orange' },
    { id: 'comparison', title: 'Comparisons', icon: <Scale size={40} />, color: 'bg-blue-200' },
];

const Topics = ({ mode }) => {
    const pageTitle = mode === 'learn' ? 'Time to Learn!' : 'Time to Play!';
    const pageSubtitle = mode === 'learn' ? 'Pick a topic to start a tutorial.' : 'Pick a game to start playing.';
    const buttonText = mode === 'learn' ? 'Start Tutorial' : 'Play Game';

    return (
        <div className="flex flex-col items-center w-full min-h-screen py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl font-bold text-slate-800 mb-4 font-comic">{pageTitle}</h1>
                <p className="text-xl text-slate-600">{pageSubtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {topics.map((topic, index) => (
                    <motion.div
                        key={topic.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link
                            to={`/topic/${topic.id}?mode=${mode}`}
                            className={`
                            relative group overflow-hidden rounded-3xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl
                            ${topic.color} bg-opacity-90 border-4 border-white h-64 flex flex-col items-center justify-center gap-4 p-8 block
                            `}
                        >
                            <div className="bg-white/90 p-5 rounded-full shadow-sm text-slate-700 group-hover:scale-110 transition-transform duration-300">
                                {topic.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-slate-800 tracking-wide text-center">
                                {topic.title}
                            </h3>

                            <span className="bg-white/60 px-4 py-1 rounded-full text-sm font-semibold text-slate-700 group-hover:bg-white group-hover:text-purple-600 transition-colors">
                                {buttonText}
                            </span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Topics;
