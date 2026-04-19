import { useEffect } from 'react';
import { useKitten } from './useKitten';
import { type KittenAction } from '../context/KittenContext';

export const useKittenAI = () => {
    const { currentAction, setAction, setTargetElement } = useKitten();

    useEffect(() => {
        // Only run logic if not hiding/peeking
        if (currentAction === 'hide' || currentAction === 'peek') return;

        const findNewTarget = () => {
            // Find walkable elements
            const cards = Array.from(document.querySelectorAll('.rounded-xl.cursor-pointer'));
            const nav = document.querySelector('nav');

            const possibleTargets = [...cards];
            if (nav) possibleTargets.push(nav);

            if (possibleTargets.length > 0) {
                const randomTarget = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
                setTargetElement(randomTarget.getBoundingClientRect());
                setAction('walk');

                // Simulate reaching target and performing an action
                setTimeout(() => {
                    const actions: KittenAction[] = ['idle', 'sit', 'lick', 'sleep'];
                    setAction(actions[Math.floor(Math.random() * actions.length)]);
                }, 2000 + Math.random() * 3000);
            }
        };

        const interval = setInterval(() => {
            if (Math.random() > 0.5) {
                findNewTarget();
            }
        }, 8000); // Check every 8 seconds to potentially move

        return () => clearInterval(interval);

    }, [currentAction, setAction, setTargetElement]);
};
