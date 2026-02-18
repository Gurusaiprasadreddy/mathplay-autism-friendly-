import React from 'react';
import { Monitor } from 'lucide-react';
import profileImg from '../assets/sai1.jpg';

export default function Details() {
    return (
        <div className="container mx-auto" style={{ padding: '2rem 1rem', maxWidth: '1000px' }}>
            <section style={{
                marginTop: '2rem',
                padding: '3rem',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '2rem',
                textAlign: 'center'
            }}>
                <h2 className="text-3xl font-bold mb-12 text-slate-800">Product Details</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', justifyContent: 'center', gap: '2rem' }}>

                    {/* Developed By Card */}
                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '1.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        borderLeft: '5px solid #06b6d4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '2rem',
                        textAlign: 'left'
                    }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' }}>Developed By</h3>

                            <div style={{ display: 'grid', gap: '0.75rem', fontSize: '1rem', color: '#334155' }}>
                                <p><strong>Name:</strong> B. GuruSaiPrasadReddy</p>
                                <p><strong>Roll No:</strong> CB.SC.U4CSE23111</p>
                                <p><strong>Course Code:</strong> 23CSE461</p>
                                <p><strong>Course:</strong> FullStack Frameworks</p>
                                <p><strong>Dept:</strong> CSE, Amrita Vishwa Vidyapeetham</p>
                            </div>
                        </div>

                        <div style={{
                            width: '130px',
                            height: '130px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '4px solid white',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            flexShrink: 0
                        }}>
                            <img
                                src={profileImg}
                                alt="B. GuruSaiPrasadReddy"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    </div>

                    {/* Course Details Card */}
                    <div style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '1.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        borderLeft: '5px solid #06b6d4',
                        textAlign: 'left'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' }}>Course Details</h3>

                        <div style={{ display: 'grid', gap: '0.75rem', fontSize: '1rem', color: '#334155' }}>
                            <p><strong>Professor:</strong> Dr. T. Senthil Kumar</p>
                            <p>Amrita School of Computing</p>
                            <p>Amrita Vishwa Vidyapeetham</p>
                            <p>Coimbatore - 641112</p>
                            <p><strong>Email:</strong> <a href="mailto:t_senthilkumar@cb.amrita.edu" style={{ color: '#0284c7', textDecoration: 'none' }}>t_senthilkumar@cb.amrita.edu</a></p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
