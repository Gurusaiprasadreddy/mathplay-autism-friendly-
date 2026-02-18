import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Scale, Gauge, ChevronDown } from 'lucide-react';

const options = [
    { value: 'easy', label: 'EASY', color: '#166534', bg: '#dcfce7', icon: <Sparkles size={16} /> },
    { value: 'medium', label: 'MEDIUM', color: '#b45309', bg: '#fef3c7', icon: <Scale size={16} /> },
    { value: 'hard', label: 'HARD', color: '#991b1b', bg: '#fee2e2', icon: <Gauge size={16} /> }
];

export default function DifficultySelector({ currentDifficulty, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);

    const activeOption = options.find(opt => opt.value === currentDifficulty) || options[0];

    return (
        <div style={{ position: 'relative', zIndex: 50 }}>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.95 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'white',
                    border: '2px solid var(--color-border, #e2e8f0)',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: activeOption.color,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    minWidth: '140px',
                    justifyContent: 'space-between'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: activeOption.bg,
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        color: activeOption.color
                    }}>
                        {activeOption.icon}
                    </div>
                    {activeOption.label}
                </div>
                <ChevronDown size={16} style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                    color: '#94a3b8'
                }} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'absolute',
                            top: '120%',
                            left: 0,
                            right: 0,
                            background: 'white',
                            borderRadius: '1rem',
                            border: '1px solid var(--color-border, #e2e8f0)',
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            padding: '0.5rem'
                        }}
                    >
                        {options.map((opt) => (
                            <motion.button
                                key={opt.value}
                                onClick={() => {
                                    onSelect(opt.value);
                                    setIsOpen(false);
                                }}
                                whileHover={{ backgroundColor: '#f1f5f9' }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: 'none',
                                    background: 'transparent',
                                    borderRadius: '0.75rem',
                                    cursor: 'pointer',
                                    color: opt.color,
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    textAlign: 'left'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: opt.bg,
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px'
                                }}>
                                    {opt.icon}
                                </div>
                                {opt.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
