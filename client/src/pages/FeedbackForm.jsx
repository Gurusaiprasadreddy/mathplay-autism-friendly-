import React, { useState } from 'react';
import { ArrowLeft, Send, Check, Star, SortAsc, Sigma, Divide, Orbit, Scale } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // specific return path or default to home/play
    const returnPath = location.state?.from || '/play';

    // State for form data
    const [formData, setFormData] = useState({
        childName: '',
        childAge: '',
        emotion: '',
        difficulty: '',
        activities: [],
        comment: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    // Question 1: Emotions
    const emotions = [
        { label: 'Very Happy', icon: '😀', value: 'very_happy', color: '#dcfce7' },
        { label: 'Happy', icon: '🙂', value: 'happy', color: '#f0f9ff' },
        { label: 'Okay', icon: '😐', value: 'okay', color: '#fff7ed' },
        { label: 'Confused', icon: '😕', value: 'confused', color: '#f3e8ff' },
        { label: 'Not Happy', icon: '😢', value: 'not_happy', color: '#fee2e2' }
    ];

    // Question 2: Difficulty
    const difficulties = [
        { label: 'Easy', value: 'easy' },
        { label: 'Just Right', value: 'medium' },
        { label: 'Hard', value: 'hard' }
    ];

    // Question 3: Activities (Matching Topics.jsx)
    const activities = [
        { id: 'counting', label: 'Counting', icon: <SortAsc size={32} />, color: 'bg-pastel-blue' },
        { id: 'addition', label: 'Addition', icon: <Sigma size={32} />, color: 'bg-pastel-green' },
        { id: 'subtraction', label: 'Subtraction', icon: <div className="text-3xl font-bold">-</div>, color: 'bg-pastel-pink' },
        { id: 'multiplication', label: 'Multiplication', icon: <div className="text-3xl font-bold">×</div>, color: 'bg-pastel-yellow' },
        { id: 'division', label: 'Division', icon: <Divide size={32} />, color: 'bg-pastel-purple' },
        { id: 'sequence', label: 'Sequence', icon: <Orbit size={32} />, color: 'bg-pastel-orange' },
        { id: 'comparison', label: 'Comparisons', icon: <Scale size={32} />, color: 'bg-blue-200' },
    ];

    // Handlers
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleEmotionSelect = (value) => {
        setFormData({ ...formData, emotion: value });
        setError('');
    };

    const handleDifficultySelect = (value) => {
        setFormData({ ...formData, difficulty: value });
        setError('');
    };

    const handleActivityToggle = (label) => {
        const newActivities = formData.activities.includes(label)
            ? formData.activities.filter(a => a !== label)
            : [...formData.activities, label];
        setFormData({ ...formData, activities: newActivities });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: All fields required except comment
        if (!formData.childName.trim()) {
            setError('Please enter your name 📝');
            return;
        }
        if (!formData.childAge) {
            setError('How old are you? 🎂');
            return;
        }
        if (!formData.emotion) {
            setError('Please pick a face to tell us how you feel! 😊');
            return;
        }
        if (!formData.difficulty) {
            setError('Was the game easy or hard? 🤔');
            return;
        }
        if (formData.activities.length === 0) {
            setError('What activity did you like? 🎨');
            return;
        }

        try {
            await fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'general', // or 'game_feedback' if specific
                    message: `Name: ${formData.childName}, Age: ${formData.childAge}, Difficulty: ${formData.difficulty}, Activities: ${formData.activities.join(', ')}, Comment: ${formData.comment}`,
                    rating: formData.emotion
                }),
            });
            console.log('Feedback Submitted:', formData);
            setSubmitted(true);
        } catch (err) {
            console.error('Error submitting feedback:', err);
            setError('Something went wrong. Please try again! 🚫');
        }
    };

    if (submitted) {
        return (
            <div className="container mx-auto" style={{ maxWidth: '600px', padding: '2rem 1rem', textAlign: 'center' }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    style={{
                        background: 'white',
                        padding: '3rem',
                        borderRadius: '2rem',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                        border: '4px solid #4ade80' // success color
                    }}
                >
                    <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⭐</div>
                    <h1 style={{ color: '#16a34a', fontSize: '2.5rem', marginBottom: '1rem' }}>Thank You, {formData.childName}!</h1>
                    <p style={{ fontSize: '1.5rem', color: '#64748b', marginBottom: '2rem' }}>You are a star!</p>

                    <Link to="/" style={{
                        display: 'inline-block',
                        padding: '1rem 2.5rem',
                        background: '#a855f7', // primary
                        color: 'white',
                        borderRadius: '1.5rem',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        boxShadow: '0 4px 0 #7e22ce'
                    }}>
                        Go Home 🏠
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container mx-auto" style={{ maxWidth: '800px', padding: '2rem 1rem' }}>
            <button
                onClick={() => navigate(returnPath)}
                className="btn-back hover:text-purple-600 transition-colors"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', textDecoration: 'none', color: '#64748b', fontWeight: '600', fontSize: '1.1rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
                <ArrowLeft size={24} /> Back to Game
            </button>

            <div style={{
                background: 'white',
                borderRadius: '2rem',
                padding: '2rem',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                border: '3px solid #e2e8f0'
            }}>
                <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ color: '#a855f7', fontSize: '2.5rem', fontWeight: '800' }}>How was your game?</h1>
                </header>

                <form onSubmit={handleSubmit}>
                    {/* 0. Name & Age Section */}
                    <section style={{ marginBottom: '3rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '1.2rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Your Name</label>
                            <input
                                type="text"
                                name="childName"
                                value={formData.childName}
                                onChange={handleChange}
                                placeholder="Name"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    fontSize: '1.2rem',
                                    borderRadius: '1rem',
                                    border: '3px solid #e2e8f0',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '1.2rem', fontWeight: '600', color: '#334155', marginBottom: '0.5rem' }}>Age</label>
                            <input
                                type="number"
                                name="childAge"
                                value={formData.childAge}
                                onChange={handleChange}
                                placeholder="Age"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    fontSize: '1.2rem',
                                    borderRadius: '1rem',
                                    border: '3px solid #e2e8f0',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </section>
                    {/* 1. Emotion Section */}
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#334155', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ background: '#e0f2fe', padding: '0.5rem', borderRadius: '50%' }}>1</span>
                            How do you feel?
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem' }}>
                            {emotions.map((emo) => (
                                <button
                                    key={emo.value}
                                    type="button"
                                    onClick={() => handleEmotionSelect(emo.value)}
                                    style={{
                                        background: formData.emotion === emo.value ? emo.color : 'white',
                                        border: `3px solid ${formData.emotion === emo.value ? '#a855f7' : '#e2e8f0'}`,
                                        borderRadius: '1.5rem',
                                        padding: '1rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        transform: formData.emotion === emo.value ? 'scale(1.05)' : 'scale(1)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <span style={{ fontSize: '3rem' }}>{emo.icon}</span>
                                    <span style={{ fontWeight: '600', color: '#334155' }}>{emo.label}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* 2. Difficulty Section */}
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#334155', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ background: '#dcfce7', padding: '0.5rem', borderRadius: '50%' }}>2</span>
                            Was it hard?
                        </h2>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {difficulties.map((diff) => (
                                <button
                                    key={diff.value}
                                    type="button"
                                    onClick={() => handleDifficultySelect(diff.value)}
                                    style={{
                                        flex: 1,
                                        padding: '1.5rem',
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        borderRadius: '1.5rem',
                                        border: 'none',
                                        background: formData.difficulty === diff.value ? '#a855f7' : '#f1f5f9',
                                        color: formData.difficulty === diff.value ? 'white' : '#64748b',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        boxShadow: formData.difficulty === diff.value ? '0 4px 6px -1px rgba(168, 85, 247, 0.3)' : 'none'
                                    }}
                                >
                                    {diff.label}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* 3. Favorite Activity Section */}
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#334155', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ background: '#fef3c7', padding: '0.5rem', borderRadius: '50%' }}>3</span>
                            What did you like?
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {activities.map((act) => {
                                const isSelected = formData.activities.includes(act.label);
                                return (
                                    <motion.button
                                        key={act.id}
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleActivityToggle(act.label)}
                                        className={`
                                            relative flex flex-col items-center justify-center p-6 gap-3 rounded-2xl transition-all duration-300
                                            ${act.color} bg-opacity-90 border-4 
                                            ${isSelected ? 'border-indigo-600 ring-4 ring-indigo-200' : 'border-white'}
                                            shadow-md hover:shadow-xl
                                        `}
                                    >
                                        <div className="bg-white/80 p-3 rounded-full text-slate-700">
                                            {act.icon}
                                        </div>
                                        <span className="font-bold text-slate-800 text-lg">{act.label}</span>
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 bg-indigo-600 text-white p-1 rounded-full">
                                                <Check size={16} strokeWidth={4} />
                                            </div>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </section>

                    {/* 4. Optional Comment */}
                    <section style={{ marginBottom: '3rem' }}>
                        <textarea
                            value={formData.comment}
                            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                            placeholder="Add comment (optional)..."
                            rows="3"
                            style={{
                                width: '100%',
                                padding: '1.5rem',
                                borderRadius: '1.5rem',
                                border: '3px solid #e2e8f0',
                                fontSize: '1.1rem',
                                fontFamily: 'inherit',
                                resize: 'none'
                            }}
                        />
                    </section>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                marginBottom: '1.5rem',
                                color: '#b91c1c',
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                                textAlign: 'center',
                                padding: '1rem',
                                background: '#fee2e2',
                                borderRadius: '1rem',
                                border: '2px solid #fca5a5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <span>⚠️</span> {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '1.5rem',
                            background: '#f97316', // accent
                            color: 'white',
                            border: 'none',
                            borderRadius: '1.5rem',
                            fontSize: '1.5rem',
                            fontWeight: '800',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            boxShadow: '0 6px 0 #b45309',
                            marginBottom: '2rem',
                            transform: 'translateY(0)',
                            transition: 'all 0.1s'
                        }}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(4px)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Send Feedback <Send size={28} />
                    </button>

                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;
