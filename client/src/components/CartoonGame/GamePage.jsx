import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card.jsx';
import { shuffleCards } from './GameLogic';
import './CartoonGame.css';

const GamePage = () => {
    const navigate = useNavigate();
    const [characterData, setCharacterData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [cards, setCards] = useState([]);
    const [level, setLevel] = useState({ r: 4, c: 3 });
    const [speed] = useState(1000);
    const [theme, setTheme] = useState('PURPLE');
    const [moves, setMoves] = useState(0);
    const [mistakes, setMistakes] = useState(0);

    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [isPeek, setIsPeek] = useState(false);

    // Fetch data logic moved here from App.js of Lab 1
    useEffect(() => {
        fetch('/characters.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load character data');
                }
                return response.json();
            })
            .then(data => {
                setCharacterData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Timer states - Initialize with a default time
    const getTimeLimit = useCallback((levelConfig) => {
        const totalCards = levelConfig.r * levelConfig.c;
        // More cards = more time (base: 45s for 12 cards, +10s per 4 additional cards)
        const baseTime = 45;
        const additionalTime = Math.floor((totalCards - 12) / 4) * 10;
        return Math.max(baseTime + additionalTime, 45);
    }, []);

    const [timeLeft, setTimeLeft] = useState(() => getTimeLimit({ r: 4, c: 3 }));
    const [isTimeUp, setIsTimeUp] = useState(false);

    const totalPairsNeeded = (level.r * level.c) / 2;

    const initGame = useCallback(() => {
        if (!characterData || characterData.length === 0) return;
        const totalNeeded = (level.r * level.c) / 2;
        const selectedChars = characterData.slice(0, totalNeeded);
        setCards(shuffleCards(selectedChars));
        setMatchedPairs(0);
        setMoves(0);
        setMistakes(0);

        setChoiceOne(null);
        setChoiceTwo(null);
        setIsPeek(false);

        // Reset timer
        setTimeLeft(getTimeLimit(level));
        setIsTimeUp(false);
    }, [level, characterData, getTimeLimit]);

    const handleReveal = () => {
        if (isPeek) return;
        setIsPeek(true);
        setTimeout(() => {
            setIsPeek(false);
        }, 2000);
    };

    useEffect(() => {
        initGame();
    }, [level, initGame, characterData]); // Added characterData to dependency

    // Timer countdown effect
    useEffect(() => {
        if (timeLeft <= 0 || matchedPairs === totalPairsNeeded) {
            if (timeLeft <= 0 && matchedPairs < totalPairsNeeded) {
                setIsTimeUp(true);
            }
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, matchedPairs, totalPairsNeeded]);

    const handleChoice = (card) => {
        if (!disabled && !isPeek && !card.matched && card !== choiceOne && !isTimeUp) {
            choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
        }
    };

    const resetTurn = useCallback(() => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setDisabled(false);
    }, []);

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            setMoves(prev => prev + 1);
            if (choiceOne.id === choiceTwo.id) {
                setCards(prev => prev.map(c => c.id === choiceOne.id ? { ...c, matched: true } : c));
                setMatchedPairs(prev => prev + 1);
                resetTurn();
            } else {
                setMistakes(prev => prev + 1);
                setTimeout(() => resetTurn(), speed);
            }
        }
    }, [choiceOne, choiceTwo, speed, resetTurn]);

    // If characterData is not loaded yet
    if (loading) return <div className="loading-screen">Loading Game Assets...</div>;
    if (error) return <div className="error-screen">Error: {error}</div>;

    return (
        <div className={`cartoon-game-App theme-${theme.replace(/\s+/g, '-').toLowerCase()}`}>
            <div className="status-bar-large">
                <div className="stat-box">Tries: {mistakes}</div>
                <div className="stat-box">Moves: {moves}</div>
                <div className="stat-box" style={{
                    background: timeLeft <= 10 ? '#ff4444' : '#6200ee',
                    color: 'white',
                    fontWeight: 'bold',
                    animation: timeLeft <= 10 ? 'pulse 1s infinite' : 'none'
                }}>
                    ⏱️ Time: {timeLeft}s
                </div>
                <button className="reveal-btn" onClick={handleReveal}>👀 Show Cards</button>
                <button className="menu-btn-large" onClick={() => navigate('/cartoon')}>Menu</button>
            </div>

            <div className="game-main-area">
                {/* Time Up Overlay */}
                {isTimeUp && (
                    <div className="success-overlay">
                        <div className="success-message" style={{ background: '#ff4444' }}>
                            ⏰ Time's Up! 😔
                        </div>
                        <div style={{ fontSize: '1.2rem', color: '#666', marginTop: '10px' }}>
                            You matched {matchedPairs} out of {totalPairsNeeded} pairs
                        </div>
                        <button className="restart-btn" onClick={initGame}>Play Again</button>
                        <button
                            className="menu-btn-large"
                            style={{ marginTop: '15px', background: '#333', color: 'white', border: 'none' }}
                            onClick={() => navigate('/cartoon')}
                        >
                            Back to Menu
                        </button>
                    </div>
                )}

                {/* Success Overlay */}
                {matchedPairs === totalPairsNeeded && !isTimeUp && (
                    <div className="success-overlay">
                        <div className="success-message">Success! All pairs found! 🌟</div>
                        <button className="restart-btn" onClick={initGame}>Play Again</button>
                        <button
                            className="menu-btn-large"
                            style={{ marginTop: '15px', background: '#6200ee', color: 'white', border: 'none' }}
                            onClick={() => navigate('/cartoon/feedback')}
                        >
                            Give Feedback 📝
                        </button>
                    </div>
                )}

                <div className="card-grid" style={{
                    gridTemplateColumns: `repeat(${level.c}, 1fr)`,
                    gridTemplateRows: `repeat(${level.r}, 1fr)`,
                    "--rows": level.r,
                    "--cols": level.c,
                    "--min-size": level.r >= 6 ? '60px' : '90px'
                }}>
                    {cards.map(card => (
                        <Card
                            key={card.uniqueId}
                            card={card}
                            handleChoice={() => handleChoice(card)}
                            flipped={card === choiceOne || card === choiceTwo || card.matched || isPeek}
                            disabled={disabled || matchedPairs === totalPairsNeeded || isPeek || isTimeUp}
                        />
                    ))}
                </div>
            </div>

            <div className="settings-footer-unified">
                <div className="footer-row">
                    <label>LEVEL:</label>
                    <div className="level-buttons-grid">
                        {[
                            { r: 4, c: 3 }, { r: 4, c: 4 }, { r: 4, c: 5 }, { r: 4, c: 6 },
                            { r: 5, c: 4 }, { r: 6, c: 5 }
                        ].map(l => (
                            <button key={`${l.r}x${l.c}`}
                                className={level.r === l.r && level.c === l.c ? 'btn-active' : 'btn-inactive'}
                                onClick={() => setLevel(l)}>
                                {l.r}x{l.c}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="footer-row">
                    <label>LOOK:</label>
                    {['BLACK', 'PURPLE', 'LIGHT BLUE', 'GREEN', 'ZEN'].map(t => (
                        <button key={t}
                            className={theme === t ? 'btn-active' : 'btn-inactive'}
                            onClick={() => setTheme(t)}>
                            {t}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GamePage;
