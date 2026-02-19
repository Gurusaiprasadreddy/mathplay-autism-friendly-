import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowLeft, RefreshCw, MessageCircle, Home, Trophy, Camera, Hand } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ScreenCapture } from 'react-screen-capture';

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
    const [screenCapture, setScreenCapture] = useState('');

    // Line-Stop specific state for Addition/Counting
    const [countedLines, setCountedLines] = useState(0);
    const [totalLinesToCount, setTotalLinesToCount] = useState(0);

    // Line-Stop specific state for Subtraction
    const [crossedOutCount, setCrossedOutCount] = useState(0);

    // Line-Stop specific state for Multiplication
    // We reuse countedLines to track how many lines in total have been clicked across all groups

    const getRange = () => {
        switch (difficulty) {
            case 'medium': return 10;
            case 'hard': return 20;
            case 'easy': default: return 5;
        }
    };

    const handleLineClick = () => {
        if (countedLines < totalLinesToCount) {
            const newCount = countedLines + 1;
            setCountedLines(newCount);
            if (newCount === totalLinesToCount) {
                speak("Stop! That's the total.");
            } else {
                // Optional: Count aloud
                // speak(newCount.toString()); 
            }
        }
    };

    const handleSubtractionClick = () => {
        // For subtraction, we are "crossing out" lines up to the subtrahend (question.b)
        if (crossedOutCount < question.b) {
            const newCount = crossedOutCount + 1;
            setCrossedOutCount(newCount);
            if (newCount === question.b) {
                speak("Stop! Count what is left.");
            }
        }
    };

    // For Multiplication and Counting, we use handleLineClick

    const generateNewQuestion = () => {
        setFeedback(null);
        setCountedLines(0);
        setCrossedOutCount(0);
        if (window.speechSynthesis) window.speechSynthesis.cancel();

        let q, ops, ans;
        const max = getRange();

        switch (topicId) {
            case 'counting':
                // Cap visual items to avoid overcrowding
                let countMax = difficulty === 'hard' ? 12 : max;
                if (difficulty === 'medium') countMax = 8;

                const count = Math.floor(Math.random() * countMax) + 1;

                // Randomly choose between Line-Stop (50%) and Item Counting (50%)
                if (Math.random() > 0.5) {
                    // Line-Stop Method
                    setTotalLinesToCount(count);
                    q = {
                        text: `Count the lines and Stop!`,
                        type: 'linestop_counting',
                        a: count,
                        visual: null
                    };
                } else {
                    // Traditional Item Counting
                    const emojis = ['🍎', '🍌', '🎈', '🚗', '⭐', '🐶', '🐱'];
                    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                    const visualStr = Array(count).fill(emoji).join(' ');

                    setTotalLinesToCount(0); // Disable Line-Stop
                    q = {
                        text: `Count the items!`,
                        type: 'item_counting',
                        visual: visualStr
                    };
                }

                ans = count;
                ops = generateOptions(ans);
                break;

            case 'addition':
                const a1 = Math.floor(Math.random() * max) + 1;
                const b1 = Math.floor(Math.random() * max) + 1;

                // Line-Stop Method Setup
                setTotalLinesToCount(a1 + b1);

                q = {
                    text: `Count the lines and Stop!`,
                    type: 'linestop_addition',
                    a: a1,
                    b: b1,
                    visual: null
                };
                ans = a1 + b1;
                ops = generateOptions(ans);
                break;

            case 'subtraction':
                const a2 = Math.floor(Math.random() * max) + 1;
                const b2 = Math.floor(Math.random() * a2); // Ensure positive result

                // Line-Stop Method Setup for Subtraction
                // Total lines = a2. Target to cross out = b2.

                q = {
                    text: `Cross out ${b2} lines!`,
                    type: 'linestop_subtraction',
                    a: a2,
                    b: b2,
                    visual: null
                };
                ans = a2 - b2;
                ops = generateOptions(ans);
                setTotalLinesToCount(0);
                break;

            case 'multiplication':
                // Lower ranges for multiplication to keep it doable mentally
                const mMax = difficulty === 'easy' ? 3 : (difficulty === 'medium' ? 6 : 9);
                const a3 = Math.floor(Math.random() * mMax) + 1;
                const b3 = Math.floor(Math.random() * mMax) + 1;

                // Line-Stop Method Setup for Multiplication
                // Total lines = a3 * b3.
                setTotalLinesToCount(a3 * b3);

                q = {
                    text: `${a3} groups of ${b3} lines`,
                    type: 'linestop_multiplication',
                    a: a3, // Groups
                    b: b3, // Lines per group
                    visual: null
                };
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
                setTotalLinesToCount(0);
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
                setTotalLinesToCount(0);
                break;

            case 'comparison':
                const n1 = Math.floor(Math.random() * max) + 1;
                const n2 = Math.floor(Math.random() * max) + 1;
                q = { text: `Which symbol fits?`, visual: `${n1} ? ${n2}` };
                if (n1 > n2) ans = '>';
                else if (n1 < n2) ans = '<';
                else ans = '=';
                ops = ['>', '<', '='];
                setTotalLinesToCount(0);
                break;

            default:
                q = { text: 'Unknown Game', visual: '?' };
                ans = 0;
                ops = [];
                setTotalLinesToCount(0);
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

    // Keyboard support for accessibility
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (feedback) return;

            // Check if key is a number or symbol relevant to the answers
            // This logic works best if options are simple numbers or symbols
            const key = e.key;

            // Allow numeric input for numeric options
            const num = parseInt(key);
            if (!isNaN(num)) {
                if (options.includes(num)) {
                    handleOptionClick(num);
                    return;
                }
            }

            // Allow symbol input for comparison game
            if (['>', '<', '='].includes(key) && options.includes(key)) {
                handleOptionClick(key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [options, feedback]); // Re-bind when options change


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

    const handleScreenCapture = (screenCapture) => {
        setScreenCapture(screenCapture);
        // Automatically download the capture
        const link = document.createElement('a');
        link.href = screenCapture;
        link.download = 'MathPlay-Moment.png';
        link.click();
        speak("Screen Captured!");
    };

    if (!question) return <div>Loading...</div>;

    // Helper to render addition content depending on type
    const renderContent = () => {
        if (question.type === 'linestop_counting') {
            return (
                <div className="flex flex-col items-center justify-center p-4">
                    <p className="text-slate-400 mb-6 text-xl text-center">Count the lines one by one!</p>

                    <div className="flex flex-wrap gap-4 justify-center max-w-2xl mb-8">
                        {Array.from({ length: question.a }).map((_, i) => (
                            <div
                                key={`count-${i}`}
                                onClick={handleLineClick}
                                className={`w-3 h-24 rounded-full cursor-pointer transition-all duration-200 transform hover:scale-110 ${countedLines > i ? 'bg-gray-300' : 'bg-cyan-400'
                                    }`}
                            ></div>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 text-6xl font-black text-indigo-600 font-mono">
                        <span>{countedLines}</span>
                    </div>

                    <div className="mt-4 h-16 w-full flex items-center justify-center">
                        {countedLines === totalLinesToCount && totalLinesToCount > 0 && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-2 text-red-500"
                            >
                                <Hand size={32} />
                                <span className="text-2xl font-bold">STOP! It is {totalLinesToCount}.</span>
                            </motion.div>
                        )}
                    </div>
                </div>
            );
        } else if (question.type === 'linestop_addition') {
            return (
                <div className="flex flex-col items-center justify-center p-4">
                    {/* Vertical Addition Layout */}
                    <div className="flex flex-col items-end text-6xl md:text-8xl font-black text-indigo-600 font-mono">
                        <div className="flex items-center gap-6 mb-2">
                            {/* Interactive Lines for A */}
                            <div className="flex gap-2">
                                {Array.from({ length: question.a }).map((_, i) => (
                                    <div
                                        key={`a-${i}`}
                                        onClick={handleLineClick}
                                        className={`w-3 h-16 rounded-full cursor-pointer transition-all duration-200 transform hover:scale-110 ${countedLines > i ? 'bg-gray-300' : 'bg-pink-400'
                                            }`}
                                    ></div>
                                ))}
                            </div>
                            <span>{question.a}</span>
                        </div>
                        <div className="flex items-center gap-6 border-b-8 border-indigo-200 pb-4 pr-4 w-full justify-end">
                            <span className="text-gray-400 mr-4">+</span>
                            {/* Interactive Lines for B */}
                            <div className="flex gap-2">
                                {Array.from({ length: question.b }).map((_, i) => (
                                    <div
                                        key={`b-${i}`}
                                        onClick={handleLineClick}
                                        className={`w-3 h-16 rounded-full cursor-pointer transition-all duration-200 transform hover:scale-110 ${countedLines > (question.a + i) ? 'bg-gray-300' : 'bg-purple-400'
                                            }`}
                                    ></div>
                                ))}
                            </div>
                            <span>{question.b}</span>
                        </div>
                        <div className="mt-4 text-gray-500 h-24 flex items-center justify-center w-full">
                            {countedLines === totalLinesToCount && totalLinesToCount > 0 ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="flex items-center gap-2 text-red-500"
                                >
                                    <Hand size={48} />
                                    <span className="text-4xl font-bold">STOP!</span>
                                </motion.div>
                            ) : (
                                <span className="text-4xl text-gray-300">?</span>
                            )}
                        </div>
                    </div>
                </div>
            );
        } else if (question.type === 'linestop_subtraction') {
            return (
                <div className="flex flex-col items-center justify-center p-4">
                    <p className="text-slate-400 mb-6 text-xl text-center">Tap {question.b} lines to cross them out!</p>

                    <div className="flex flex-col items-center">
                        {/* Display Total Lines (A) */}
                        <div className="flex flex-wrap gap-4 justify-center max-w-2xl">
                            {Array.from({ length: question.a }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    onClick={handleSubtractionClick}
                                    whileHover={{ scale: 1.1 }}
                                    className={`w-6 h-24 rounded-full cursor-pointer transition-all duration-300 relative ${
                                        // If this line index < crossedOutCount, show it as crossed out
                                        i < crossedOutCount ? 'bg-gray-200' : 'bg-blue-400'
                                        }`}
                                >
                                    {i < crossedOutCount && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute inset-0 flex items-center justify-center text-red-500 font-bold text-4xl"
                                        >
                                            X
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Equation Display */}
                        <div className="mt-8 text-6xl font-black text-indigo-600 font-mono flex gap-4 items-center">
                            <span>{question.a}</span>
                            <span className="text-gray-400">-</span>
                            <span>{question.b}</span>
                            <span className="text-gray-400">=</span>
                            <span className="text-gray-300">?</span>
                        </div>

                        <div className="mt-4 h-16 w-full flex items-center justify-center">
                            {crossedOutCount === question.b && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="flex items-center gap-2 text-red-500"
                                >
                                    <Hand size={32} />
                                    <span className="text-2xl font-bold">STOP! Count what is left.</span>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            );
        } else if (question.type === 'linestop_multiplication') {
            return (
                <div className="flex flex-col items-center justify-center p-4">
                    <p className="text-slate-400 mb-6 text-xl text-center">Count all the lines in the groups!</p>

                    {/* Groups Display */}
                    <div className="flex flex-wrap gap-8 justify-center mb-8">
                        {Array.from({ length: question.a }).map((_, groupIndex) => (
                            <div key={`group-${groupIndex}`} className="border-4 border-dashed border-indigo-200 bg-indigo-50 rounded-2xl p-4 flex gap-2">
                                {Array.from({ length: question.b }).map((_, lineIndex) => {
                                    // Calculate global index for this line
                                    const globalIndex = (groupIndex * question.b) + lineIndex;
                                    return (
                                        <div
                                            key={`gline-${globalIndex}`}
                                            onClick={handleLineClick}
                                            className={`w-3 h-16 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 ${countedLines > globalIndex ? 'bg-gray-300' : 'bg-green-400'
                                                }`}
                                        ></div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 text-6xl font-black text-indigo-600 font-mono">
                        <span>{question.a}</span>
                        <span className="text-gray-400">x</span>
                        <span>{question.b}</span>
                    </div>

                    <div className="mt-4 h-16 w-full flex items-center justify-center">
                        {countedLines === totalLinesToCount && totalLinesToCount > 0 && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-2 text-red-500"
                            >
                                <Hand size={32} />
                                <span className="text-2xl font-bold">STOP! That's the total.</span>
                            </motion.div>
                        )}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-700 mb-8 tracking-tight">{question.text}</h2>

                    <div className="relative inline-block max-w-full">
                        <div className="absolute inset-0 bg-indigo-100 rounded-[2rem] transform rotate-3 scale-105 opacity-50"></div>
                        <div className="relative text-7xl md:text-8xl font-black text-indigo-600 animate-wiggle p-8 md:p-12 rounded-[2rem] bg-indigo-50 border-2 border-indigo-100 shadow-inner overflow-hidden">
                            {question.visual}
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <ScreenCapture onEndCapture={handleScreenCapture}>
            {({ onStartCapture }) => (
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
                                <button
                                    onClick={onStartCapture}
                                    className="bg-white/80 backdrop-blur-sm shadow-sm border border-blue-100 text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-full font-bold flex items-center gap-2 transition-colors"
                                    title="Capture Moment"
                                >
                                    <Camera size={20} /> <span className="hidden sm:inline">Capture</span>
                                </button>
                            </div>
                        </div>

                        <motion.div
                            className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 w-full p-8 md:p-12 border border-slate-50 relative overflow-visible mb-8"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            {/* Decorative Elements on Card */}
                            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400"></div>

                            {renderContent()}

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
            )}
        </ScreenCapture>
    );
};

export default GameView;
