'use client'
import  { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { gsap } from 'gsap';

const BreathingExercisePage = () => {
    const MapAndCountMap = {
        'breath-in': 4,
        'hold': 2,
        'breath-out': 4,
        'start-it': 0
    };

    const phases = ['breath-in', 'hold', 'breath-out'];
    const [isStop, setIsStop] = useState(true);
    const [totalCycles, setTotalCycles] = useState(0);
    const [message, setMessage] = useState('start-it');
    const [count, setCount] = useState(0);

    const messageRef = useRef(null);
    const countdownRef = useRef(null);

    const startAndStopExercise = () => {
        setIsStop(!isStop);
    };

    useEffect(() => {
        if (!isStop) {
            setMessage('breath-in');
            setCount(MapAndCountMap['breath-in']);
        } else {
            setMessage('start-it');
            setCount(0);
        }
    }, [isStop]);

    useEffect(() => {
        let id = null;

        if (!isStop && count > 0) {
            id = setInterval(() => {
                setCount(prevCount => prevCount - 1);
            }, 1000);
        } else if (count === 0 && !isStop) {
            const nextPhaseIndex = (phases.indexOf(message) + 1) % phases.length;
            const nextPhase = phases[nextPhaseIndex];

            if (nextPhase === 'breath-in' && message === 'breath-out') {
                setTotalCycles(prevCycles => prevCycles + 1);
            }

            setMessage(nextPhase);
            setCount(MapAndCountMap[nextPhase]);

            // Apply GSAP animations for phase change on the message and countdown
            gsap.fromTo(messageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
            gsap.fromTo(countdownRef.current, { scale: 0.8 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        }

        return () => {
            clearInterval(id);
        };
    }, [count, isStop, message]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
            <div className="bg-white rounded-lg shadow-xl p-8 text-center w-full max-w-sm">
                <TotalCycles totalCycles={totalCycles} />
                <div ref={messageRef}>
                    <MessageComponent message={message} />
                </div>
                <div ref={countdownRef}>
                    <CountDownComponent count={count} />
                </div>
                <StartAndStopComponent
                    isStop={isStop}
                    StartAndStopExercise={startAndStopExercise}
                />
            </div>
        </div>
    );
};

const TotalCycles = ({ totalCycles }) => {
    return (
        <div className="mb-4">
            <p className="text-xl font-semibold text-gray-700">Total Cycles</p>
            <p className="text-3xl font-bold text-indigo-600">{totalCycles}</p>
        </div>
    );
};

const CountDownComponent = ({ count }) => {
    return (
        <div className="my-6">
            <p className="text-5xl font-bold text-indigo-600">{count}</p>
        </div>
    );
};

const MessageComponent = ({ message }) => {
    const phaseColors = {
        'breath-in': 'text-green-500',
        'hold': 'text-yellow-500',
        'breath-out': 'text-red-500',
        'start-it': 'text-gray-500'
    };

    return (
        <div className={`my-4 text-2xl font-semibold ${phaseColors[message]}`}>
            {message.replace('-', ' ')}
        </div>
    );
};

const StartAndStopComponent = ({ isStop, StartAndStopExercise }) => {
    return (
        <div>
            <button
                onClick={StartAndStopExercise}
                className={`transition duration-300 ease-in-out transform hover:scale-105 
                            font-bold uppercase py-2 px-6 rounded-full shadow-md 
                            text-white ${isStop ? "bg-green-500 hover:bg-green-700" : "bg-red-500 hover:bg-red-700"}`}>
                {isStop ? <FaPlay className="inline-block mr-2" /> : <FaPause className="inline-block mr-2" />}
                {isStop ? "Start" : "Stop"}
            </button>
        </div>
    );
};

export default BreathingExercisePage;
