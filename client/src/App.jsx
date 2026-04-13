import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookAppointment from './pages/BookAppointment';
import Confirmation from './pages/Confirmation';
import MyAppointments from './pages/MyAppointments';
import Pricing from './pages/Pricing';
import Showcase from './pages/Showcase';

function App() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    useEffect(() => {
        let currentX = window.innerWidth / 2;
        let currentY = window.innerHeight / 2;
        let targetX = currentX;
        let targetY = currentY;
        
        let currentSize = 800;
        let targetSize = 800;
        let currentOpacity = 0.08;
        let targetOpacity = 0.08;
        let currentStretch = 1;
        
        let animId;

        const handleMouseMove = (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        };

        const handleMouseOver = (e) => {
            const interactive = e.target.closest('a, button, input, .card');
            if (interactive) {
                targetSize = 350; // Focus spotlight
                targetOpacity = 0.35; // Intense glow
            } else {
                targetSize = 800; // Wide ambient
                targetOpacity = 0.08;
            }
        };

        const animate = () => {
            const time = Date.now() / 700; // Faster breathing cycle
            const breatheScale = Math.sin(time) * 0.05 + 1; // 0.95 to 1.05
            const breatheOpacity = Math.sin(time) * 0.15 + 0.85; // 0.7 to 1.0

            // Faster, snappier lerp for position
            currentX += (targetX - currentX) * 0.25;
            currentY += (targetY - currentY) * 0.25;

            // Snappier lerp for adaptive spotlight shape
            currentSize += (targetSize - currentSize) * 0.25;
            currentOpacity += (targetOpacity - currentOpacity) * 0.25;

            // Snappier velocity stretch recovery
            const dx = targetX - currentX;
            const dy = targetY - currentY;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const targetStretch = (1 + Math.min(dist * 0.003, 0.4)) * breatheScale;
            currentStretch += (targetStretch - currentStretch) * 0.25;

            const finalOpacity = currentOpacity * breatheOpacity;

            document.documentElement.style.setProperty('--mouse-x', `${currentX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${currentY}px`);
            document.documentElement.style.setProperty('--mouse-stretch', currentStretch);
            document.documentElement.style.setProperty('--hover-size', `${currentSize * breatheScale}px`);
            document.documentElement.style.setProperty('--hover-opacity', finalOpacity);

            const normX = (currentX / window.innerWidth) * 2 - 1;
            const normY = (currentY / window.innerHeight) * 2 - 1;

            document.documentElement.style.setProperty('--card-tilt-x', `${-normY * 12}deg`);
            document.documentElement.style.setProperty('--card-tilt-y', `${normX * 12}deg`);

            document.documentElement.style.setProperty('--bg-shift-x', `${-normX * 30}px`);
            document.documentElement.style.setProperty('--bg-shift-y', `${-normY * 30}px`);

            animId = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <Router>
            <div className="min-h-screen bg-dental-cream dark:bg-slate-900 text-dental-dark dark:text-gray-100 transition-colors duration-300">
                <Navbar isDark={isDark} toggleDark={() => setIsDark(!isDark)} />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/book" element={<BookAppointment />} />
                    <Route path="/confirmation/:id" element={<Confirmation />} />
                    <Route path="/appointments" element={<MyAppointments />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/showcase" element={<Showcase />} />
                </Routes>
                
                {/* Global Mouse Glow */}
                <div className="mouse-glow" />
            </div>
        </Router>
    );
}

export default App;
