import React, { useEffect } from 'react';
import {
    CheckCircle,
    Eye,
    Heart,
    Brain,
    Puzzle,
    Monitor,
    Sparkles,
    Zap,
    Layers,
    Star
} from 'lucide-react';

export default function ProductDescription() {
    useEffect(() => {
        console.log("Full ProductDescription mounted");
    }, []);

    const containerStyle = {
        padding: '2rem 1rem',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
    };

    const twoColGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
        marginBottom: '3rem'
    };

    return (
        <div style={containerStyle}>

            {/* 1. Product Name and Description */}
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '800' }}>
                    <span style={{ color: 'var(--color-primary)' }}>Math</span>
                    <span style={{ color: 'var(--color-secondary)' }}>Play</span>
                </h1>
                <p className="hero-subtitle" style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.25rem', color: '#64748b', lineHeight: '1.6' }}>
                    An interactive, sensory-friendly learning portal designed to make mathematics accessible, engaging, and fun for children on the autism spectrum using proven strategies like the <strong>Line-Stop Method</strong>.
                </p>
            </header>

            {/* 2. Why this product is needed for autism kids */}
            <section className="info-card" style={{ marginBottom: '3rem', backgroundColor: '#fff', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', borderRadius: '1rem' }}>
                        <Heart size={32} style={{ color: '#ef4444' }} />
                    </div>
                    <h2 className="section-title" style={{ margin: 0, color: '#1e293b', fontSize: '1.75rem', fontWeight: 'bold' }}>Why MathPlay?</h2>
                </div>
                <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#475569', marginBottom: '1.5rem' }}>
                    Children with autism often face unique challenges in traditional learning environments, such as <strong>sensory overload</strong>, difficulty with <strong>abstract concepts</strong>, and struggles with <strong>attention span</strong>.
                </p>
                <div style={twoColGridStyle}>
                    <BenefitItem text="Reduces Sensory Overload" icon={<Zap size={20} />} color="var(--color-accent)" />
                    <BenefitItem text="Simplifies Abstract Concepts" icon={<Layers size={20} />} color="var(--color-primary)" />
                    <BenefitItem text="Encourages Focus & Routine" icon={<CheckCircle size={20} />} color="var(--color-success)" />
                    <BenefitItem text="Safe, Failure-Free Practice" icon={<Heart size={20} />} color="#ef4444" />
                </div>
            </section>

            {/* 3. Importance of Visual Learning */}
            <section className="info-card" style={{ marginBottom: '3rem', backgroundColor: '#f0f9ff', padding: '2.5rem', borderRadius: '1.5rem', border: '2px solid #e0f2fe' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#fff', borderRadius: '1rem' }}>
                        <Eye size={32} style={{ color: '#0ea5e9' }} />
                    </div>
                    <h2 className="section-title" style={{ margin: 0, color: '#0c4a6e', fontSize: '1.75rem', fontWeight: 'bold' }}>The Power of Visual Learning</h2>
                </div>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#334155', marginBottom: '2rem' }}>
                    For many learners with autism, <em>"seeing is understanding."</em> Visual cues act as a bridge, translating confusing spoken words or abstract numbers into concrete, meaningful images.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0ea5e9' }}>Line-Stop Method</h3>
                        <p style={{ color: '#64748b' }}>A specialized strategy where students count lines and "stop" at the total, helping physically ground the abstract concept of addition and counting.</p>
                    </div>
                    <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#0ea5e9' }}>Pattern Recognition</h3>
                        <p style={{ color: '#64748b' }}>Consistent visual structures and "crossing out" animations for subtraction help children identify patterns, a key strength for many on the spectrum.</p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section style={{
                marginBottom: '3rem',
                textAlign: 'center',
                padding: '2rem',
                background: 'white',
                borderRadius: '1.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
                <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b', fontWeight: 'bold' }}>How It Works</h2>
                <div style={gridStyle}>
                    <div className="step-card">
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👀</div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-primary)', fontWeight: 'bold' }}>1. Learn Visually</h3>
                        <p style={{ color: '#64748b' }}>Watch easy tutorials and understand math concepts.</p>
                    </div>
                    <div className="step-card">
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎮</div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-secondary)', fontWeight: 'bold' }}>2. Play Games</h3>
                        <p style={{ color: '#64748b' }}>Use the Line-Stop method to solve problems.</p>
                    </div>
                    <div className="step-card">
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-accent)', fontWeight: 'bold' }}>3. Earn Stars</h3>
                        <p style={{ color: '#64748b' }}>Collect rewards and track your progress!</p>
                    </div>
                </div>
            </section>

            {/* 4. Key Features & Highlights */}
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem', color: '#1e293b', fontWeight: 'bold' }}>Key Features</h2>
            <div style={twoColGridStyle}>
                <FeatureCard
                    icon={<Star size={24} />}
                    color="var(--color-accent)"
                    bg="#f3e8ff"
                    title="Visual Progress Tracking"
                    desc="Earn stars and rewards for every completed lesson, motivating continued learning."
                />
                <FeatureCard
                    icon={<Monitor size={24} />}
                    color="var(--color-success)"
                    bg="#dcfce7"
                    title="Hybrid Counting Mode"
                    desc="Switch between item counting and the Line-Stop method ensuring a comprehensive understanding of numbers."
                />
                <FeatureCard
                    icon={<Brain size={24} />}
                    color="var(--color-secondary)"
                    bg="#fff7ed"
                    title="Interactive Line-Stop"
                    desc="A tactical approach to Addition and Subtraction where students physically interact with lines."
                />
                <FeatureCard
                    icon={<Sparkles size={24} />}
                    color="#f59e0b"
                    bg="#fef3c7"
                    title="Positive Reinforcement"
                    desc="Celebratory animations and rewards build confidence and motivation."
                />
                <FeatureCard
                    icon={<CheckCircle size={24} />}
                    color="#db2777"
                    bg="#fce7f3"
                    title="Kid-Friendly Feedback"
                    desc="Emoji-based feedback form and visual choice cards let children easily share their feelings."
                />
                <FeatureCard
                    icon={<Zap size={24} />}
                    color="#7c3aed"
                    bg="#ede9fe"
                    title="Sensory-Friendly Design"
                    desc="Calming colors, clear visuals, and optional audio support (TTS) to reduce anxiety."
                />
            </div>

        </div>
    );
}

function FeatureCard({ icon, color, bg, title, desc }) {
    return (
        <div style={{
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '1.5rem',
            border: '2px solid transparent',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        }}>
            <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                backgroundColor: bg,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
            }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>{title}</h3>
            <p style={{ color: '#64748b', lineHeight: '1.6' }}>{desc}</p>
        </div>
    );
}

function BenefitItem({ text, icon, color }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.75rem' }}>
            <div style={{ color: color }}>{icon}</div>
            <span style={{ fontWeight: '600', color: '#334155' }}>{text}</span>
        </div>
    );
}
