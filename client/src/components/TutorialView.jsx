import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Volume2, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const TutorialView = ({ topic, onBack }) => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = topic.tutorial;

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(curr => curr + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(curr => curr - 1);
        }
    };

    const speak = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.rate = 0.9;
        speech.pitch = 1.1; // Slightly higher pitch for kids
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    };

    // Speak when slide changes
    React.useEffect(() => {
        speak(slides[currentSlide].text);
    }, [currentSlide]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 relative overflow-hidden border-4 border-pastel-blue">

                {/* Navigation */}
                <div className="flex justify-between items-center mb-8">
                    <button onClick={onBack} className="text-gray-500 hover:text-purple-600 flex items-center gap-2">
                        <Home /> Back to Menu
                    </button>
                    <div className="flex items-center gap-2 bg-purple-100 rounded-full px-4 py-1">
                        <span className="font-bold text-purple-600">{currentSlide + 1} / {slides.length}</span>
                    </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center gap-8"
                        >
                            {/* Visual */}
                            <div className="text-9xl mb-4 animate-bounce-slow filter drop-shadow-md">
                                {slides[currentSlide].visual}
                            </div>

                            {/* Text */}
                            <h2 className="text-4xl font-bold text-gray-800 leading-tight max-w-2xl">
                                {slides[currentSlide].text}
                            </h2>

                            {/* Speak Button */}
                            <button
                                onClick={() => speak(slides[currentSlide].text)}
                                className="mt-4 p-3 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-600 transition-colors"
                                aria-label="Repeat Text"
                            >
                                <Volume2 size={32} />
                            </button>

                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className={`
              p-4 rounded-full transition-all duration-300 transform hover:scale-110
              ${currentSlide === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-pastel-blue text-white shadow-lg'}
            `}
                    >
                        <ChevronLeft size={40} />
                    </button>

                    {currentSlide === slides.length - 1 ? (
                        <button
                            onClick={() => navigate('?mode=play', { replace: true })}
                            className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-green-600 transition-all shadow-lg animate-pulse"
                        >
                            Play Game! 🎮
                        </button>
                    ) : (
                        <button
                            onClick={nextSlide}
                            className="p-4 rounded-full bg-pastel-blue text-white shadow-lg transition-all duration-300 transform hover:scale-110"
                        >
                            <ChevronRight size={40} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TutorialView;
