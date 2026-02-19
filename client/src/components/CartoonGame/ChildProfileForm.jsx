import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartoonGame.css';

const ChildProfileForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [theme, setTheme] = useState('theme-default');

    useEffect(() => {
        // Load saved profile if exists
        const savedProfile = localStorage.getItem('childProfile');
        if (savedProfile) {
            const parsed = JSON.parse(savedProfile);
            setName(parsed.name || '');
            setAge(parsed.age || '');
            setTheme(parsed.theme || 'theme-default');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const profile = { name, age, theme };
        localStorage.setItem('childProfile', JSON.stringify(profile));

        // Provide visual feedback or just navigate
        // For simplicity and sensory reasons, quick navigation is often best
        navigate('/cartoon/game');
    };

    return (
        <div className="landing-screen">
            <div className="about-box" style={{ maxWidth: '600px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>My Profile</h1>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <div className="form-group">
                        <label htmlFor="name" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px', textAlign: 'left' }}>
                            What is your name?
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Type name here..."
                            style={{
                                width: '100%',
                                padding: '15px',
                                fontSize: '1.5rem',
                                borderRadius: '15px',
                                border: '2px solid #ccc',
                                fontFamily: 'var(--primary-font)',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age" style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px', textAlign: 'left' }}>
                            How old are you?
                        </label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="0"
                            style={{
                                width: '100%',
                                padding: '15px',
                                fontSize: '1.5rem',
                                borderRadius: '15px',
                                border: '2px solid #ccc',
                                fontFamily: 'var(--primary-font)',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Simple Theme Selector (Optional enhancement) */}
                    {/* Keeping it simple for now as per plan, but laying groundwork */}

                    <button
                        type="submit"
                        className="big-start-btn"
                        style={{ marginTop: '20px', width: '100%', background: 'linear-gradient(45deg, #43e97b, #38f9d7)' }}
                    >
                        ALL DONE!
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/cartoon')}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#777',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            marginTop: '10px',
                            textDecoration: 'underline'
                        }}
                    >
                        Go Back
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChildProfileForm;
