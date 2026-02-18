import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowLeft, RefreshCw, MessageCircle, Home, Trophy } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import DifficultySelector from './DifficultySelector';

const GameView = ({ topic, topicId, onBack }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'
    const [showConfetti, setShowConfetti] = useState(false);
    const [difficulty, setDifficulty] = useState('easy');

    const getRange = () => {
        switch (difficulty) {
            case 'medium': return 10;
            case 'hard': return 20;
            case 'easy': default: return 5;
        }
    };

    const generateNewQuestion = () => {
        setFeedback(null);
        let q, ops, ans;
        const max = getRange();

        switch (topicId) {
            case 'counting':
                // Cap visual items to avoid overcrowding
                let countMax = difficulty === 'hard' ? 12 : max;
                if (difficulty === 'medium') countMax = 8;

                const count = Math.floor(Math.random() * countMax) + 1;
                const emoji = ['🍎', '🍌', '🎈', '🚗', '⭐'][Math.floor(Math.random() * 5)];
                q = { text: `Count the items!`, visual: Array(count).fill(emoji).join(' ') };
                ans = count;
                ops = generateOptions(ans);
                break;

            case 'addition':
                const a1 = Math.floor(Math.random() * max) + 1;
                const b1 = Math.floor(Math.random() * max) + 1;
                q = { text: `${a1} + ${b1} = ?`, visual: `${a1} + ${b1}` };
                ans = a1 + b1;
                ops = generateOptions(ans);
                break;

            case 'subtraction':
                const a2 = Math.floor(Math.random() * max) + 1;
                const b2 = Math.floor(Math.random() * a2); // Ensure positive result
                q = { text: `${a2} - ${b2} = ?`, visual: `${a2} - ${b2}` };
                ans = a2 - b2;
                ops = generateOptions(ans);
                break;

            case 'multiplication':
                // Lower ranges for multiplication to keep it doable mentally
                const mMax = difficulty === 'easy' ? 3 : (difficulty === 'medium' ? 6 : 9);
                const a3 = Math.floor(Math.random() * mMax) + 1;
                const b3 = Math.floor(Math.random() * mMax) + 1;
                q = { text: `${a3} x ${b3} = ?`, visual: `${a3} x ${b3}` };
                ans = a3 * b3;
                ops = generateOptions(ans);
                break;

            case 'division':
                // Divisor and Quotient ranges
                const dMax = difficulty === 'easy' ? 3 : (difficulty === 'medium' ? 6 : 9);
                const b4 = Math.floor(Math.random() * dMax) + 1; // Divisor
                const ans4 = Math.floor(Math.random() * dMax) + 1; // Quotient
                const a4 = b4 * ans4; // Dividend
                q = { text: `${a4} ÷ ${b4} = ?`, visual: `${a4} ÷ ${b4}` };
                ans = ans4;
                ops = generateOptions(ans);
                break;

            case 'sequence':
                const sStartMax = difficulty === 'hard' ? 20 : 10;
                const sStepMax = difficulty === 'easy' ? 2 : (difficulty === 'medium' ? 4 : 6);

                const start = Math.floor(Math.random() * sStartMax) + 1;
                const step = Math.floor(Math.random() * sStepMax) + 1;
                const seq = [start, start + step, start + step * 2];
                q = { text: `What comes next?`, visual: `${seq.join(', ')}, ?` };
                ans = start + step * 3;
                ops = generateOptions(ans);
                break;

            case 'comparison':
                const n1 = Math.floor(Math.random() * max) + 1;
                const n2 = Math.floor(Math.random() * max) + 1;
                q = { text: `Which symbol fits?`, visual: `${n1} ? ${n2}` };
                if (n1 > n2) ans = '>';
                else if (n1 < n2) ans = '<';
                else ans = '=';
                ops = ['>', '<', '='];
                break;

            default:
                q = { text: 'Unknown Game', visual: '?' };
                ans = 0;
                ops = [];
        }

        setQuestion({ ...q, answer: ans });
        setOptions(ops);
    };

    const generateOptions = (correctAnswer) => {
        const opts = new Set([correctAnswer]);
        while (opts.size < 3) {
            let r = Math.floor(Math.random() * 10) + 1;
            // Adjust range for larger numbers if needed
            if (typeof correctAnswer === 'number' && correctAnswer > 10) {
                r = Math.floor(Math.random() * 20) + 1;
            }
            if (r !== correctAnswer) opts.add(r);
        }
        return Array.from(opts).sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        generateNewQuestion();
    }, [topicId, difficulty]);

    const handleOptionClick = (option) => {
        if (feedback) return; // Prevent double clicks

        if (option === question.answer) {
            setFeedback('correct');
            setScore(s => s + 10);
            setStreak(s => s + 1);
            setShowConfetti(true);
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'); // Success sound placeholder
            // audio.play().catch(e => console.log("Audio play failed", e));
            speak("Correct! Great job!");

            setTimeout(() => {
                setShowConfetti(false);
                generateNewQuestion();
            }, 2000);
        } else {
            setFeedback('incorrect');
            setStreak(0);
            speak("Oops! Try again.");
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    const speak = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.rate = 1.1;
        speech.pitch = 1.2;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    };

    const handleQuit = async () => {
        if (score > 0) {
            try {
                await fetch('http://localhost:5000/api/score', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        topic: topicId,
                        score: score,
                        difficulty: difficulty
                    }),
                });
                console.log("Score saved!");
            } catch (err) {
                console.error("Failed to save score:", err);
            }
        }
        onBack();
    };

    if (!question) return <div>Loading...</div>;

    return (
        <div className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center font-sans overflow-hidden">
            {/* Background Gradient & Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-80 -z-10"></div>
            <div className="absolute inset-0 -z-10" style={{
                backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                opacity: 0.5
            }}></div>

            {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

            <div className="w-full max-w-4xl px-4 py-6 z-10">
                <div className="w-full flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <button onClick={handleQuit} className="bg-white/50 backdrop-blur-md px-6 py-3 rounded-full text-slate-600 hover:text-purple-600 hover:bg-white transition-all shadow-sm font-bold flex items-center gap-2">
                        <Home size={20} /> <span className="hidden md:inline">Quit Game</span>
                    </button>

                    <div className="flex flex-wrap gap-4 items-center justify-center">
                        <DifficultySelector
                            currentDifficulty={difficulty}
                            onSelect={setDifficulty}
                        />
                        <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-yellow-100 text-yellow-700 px-6 py-3 rounded-full font-bold flex items-center gap-2">
                            <Trophy size={20} className="text-yellow-500" /> Score: {score}
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-orange-100 text-orange-700 px-6 py-3 rounded-full font-bold flex items-center gap-2">
                            <span className="text-orange-500 text-xl">🔥</span> Streak: {streak}
                        </div>
                    </div>
                </div>

                <motion.div
                    className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 w-full p-8 md:p-12 border border-slate-50 relative overflow-visible mb-8"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    {/* Decorative Elements on Card */}
                    <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400"></div>

                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-700 mb-8 tracking-tight">{question.text}</h2>

                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-indigo-100 rounded-[2rem] transform rotate-3 scale-105 opacity-50"></div>
                            <div className="relative text-7xl md:text-8xl font-black text-indigo-600 animate-wiggle p-8 md:p-12 rounded-[2rem] bg-indigo-50 border-2 border-indigo-100 shadow-inner">
                                {question.visual}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {options.map((opt, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ y: -4, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleOptionClick(opt)}
                                className={`
                                    p-6 md:p-8 rounded-2xl text-4xl md:text-5xl font-black shadow-lg transition-all duration-200 border-b-4
                                    ${feedback === 'correct' && opt === question.answer
                                        ? 'bg-green-500 text-white border-green-700 shadow-green-200'
                                        : ''}
                                    ${feedback === 'incorrect' && opt !== question.answer
                                        ? 'opacity-40 bg-slate-100 text-slate-400 border-slate-200'
                                        : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:text-purple-600 hover:shadow-xl'}
                                    ${feedback === 'incorrect' && opt === question.answer
                                        ? 'bg-green-100 text-green-600 border-green-300'
                                        : ''}
                                `}
                            >
                                {opt}
                            </motion.button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                                className={`
                                    absolute inset-0 flex items-center justify-center bg-white/60 z-20 rounded-[2.5rem]
                                `}
                            >
                                <motion.div
                                    initial={{ scale: 0.5, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 text-center"
                                >
                                    <div className="mb-4">
                                        {feedback === 'correct' ?
                                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-500"><CheckCircle size={64} strokeWidth={4} /></div> :
                                            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-500"><XCircle size={64} strokeWidth={4} /></div>
                                        }
                                    </div>
                                    <h2 className={`text-5xl font-black mb-2 ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                                        {feedback === 'correct' ? 'Awesome!' : 'Oops!'}
                                    </h2>
                                    <p className="text-slate-500 font-bold text-lg">
                                        {feedback === 'correct' ? 'Keep it up!' : 'Don\'t give up!'}
                                    </p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Feedback Button Section */}
                <div className="w-full flex justify-center mt-4">
                    <button
                        onClick={() => navigate('/feedback', { state: { from: location.pathname + location.search } })}
                        className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold py-3 px-6 rounded-full transition-all text-sm hover:bg-white/50"
                    >
                        <MessageCircle size={18} />
                        Give Feedback
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameView;
