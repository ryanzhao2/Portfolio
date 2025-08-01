'use client';

import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

const greetings = [
    'Hello!', //English
    '¡Hola!', // Spanish
    'नमस्ते!', //Hindi
    'Ciao!', //Italian
    '你好！', //Chinese
    'Bonjour!', // French
    '안녕하세요!', // Korean
    'مرحبا!', // Arabic
    'Hallo!' // German
];


const AnimatedGreetings = () => {
    const [idx, setIdx] = useState(0);
    const [showGreeting, setShowGreeting] = useState(false);

    useEffect(() => {
        if (idx < greetings.length) {
            const timer = setTimeout(() => {
                setIdx(idx + 1);
            }, idx === 0 ? 1000 : 200);

            return () => {
                clearTimeout(timer)
            };
        }
    }, [idx]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const hasPlayed = sessionStorage.getItem('greetingPlayed')
        if (!hasPlayed) {
            setShowGreeting(true)
            sessionStorage.setItem('greetingPlayed', 'true')
        }
    }, [])

    if (!showGreeting) return null;
    return (
        <AnimatePresence>
            {idx < greetings.length && (
                <motion.div
                    className="fixed inset-0 z-50 bg-zinc-100 dark:bg-black text-black dark:text-white flex items-center justify-center"
                    initial={{y: 0, borderRadius: 0}}
                    exit={{
                        y: '-100%',
                        borderBottomLeftRadius: '100%',
                        borderBottomRightRadius: '100%',
                        transition: {duration: 1, ease: 'easeInOut'}
                    }}
                >
                    <motion.div
                        key={idx}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.3}}
                        className="text-8xl"
                    >
                        {greetings[idx]}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnimatedGreetings;
