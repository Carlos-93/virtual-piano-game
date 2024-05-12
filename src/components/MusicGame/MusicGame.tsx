import { useState, useEffect, useRef } from "react";
import { keys, playNote } from "../../utils/tone";
import Piano from "../Piano/Piano";
import Modal from "../Modal/Modal";

export default function MusicGame() {
    const [sequence, setSequence] = useState<string[]>([]);
    const [playbackSpeed, setPlaybackSpeed] = useState(1000);
    const [gameActive, setGameActive] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const currentPosition = useRef(0);

    // Función para iniciar el juego
    function startGame() {
        setGameActive(true);
        setTime(0);
        setScore(0);
        setPlaybackSpeed(1000);
        currentPosition.current = 0;
        const initialSequence = generateSequence(4);
        setSequence(initialSequence);
        playSequence(initialSequence, 1000);
    }

    // Función para detener el juego
    function stopGame() {
        setGameActive(false);
        setTime(0);
        setScore(0);
        setSequence([]);
        currentPosition.current = 0;
        setModalOpen(false);
    }

    // Función para generar una secuencia de notas aleatorias
    function generateSequence(length: number) {
        return Array.from({ length }, () => keys[Math.floor(Math.random() * keys.length)].note);
    }

    // Función para reproducir una secuencia de notas
    function playSequence(sequence: string[], speed: number) {
        sequence.forEach((note, index) => {
            setTimeout(() => playNote(note), index * speed);
        });
    }

    // Hook para manejar el tiempo del juego
    useEffect(() => {
        if (gameActive) {
            const timerId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [gameActive]);

    // Hook para manejar el evento de teclado y verificar si la nota presionada es correcta
    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (!gameActive) return;
            const key = keys.find(k => k.key.toLowerCase() === event.key.toLowerCase());

            if (key && sequence[currentPosition.current] === key.note) {
                setScore((currentScore) => currentScore + 50);
                if (currentPosition.current === sequence.length - 1) {
                    const newSequence = [...sequence, generateSequence(1)[0]];
                    const newSpeed = Math.max(100, playbackSpeed * 0.95);
                    setTimeout(() => {
                        setPlaybackSpeed(newSpeed);
                        setSequence(newSequence);
                        currentPosition.current = 0;
                        playSequence(newSequence, newSpeed);
                    }, 2000);
                } else {
                    currentPosition.current++;
                }
            } else if (key) {
                setGameActive(false);
                setModalOpen(true);
            }
        }
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [sequence, playbackSpeed, gameActive, score]);

    return (
        <section className="flex flex-col relative items-center w-full lg:w-3/5 h-[37rem] backdrop-blur-xl rounded-3xl border border-yellow-400">
            {/* Instructions */}
            <article className="flex flex-col absolute left-0 bg-white/20 w-fit px-4 py-3 rounded-xl text-sm">
                <div className='flex flex-col items-start gap-1'>
                    <p className='text-white font-semibold text-center mb-3'>Instructions:</p>
                    <p className='text-white font-medium text-center'>• Get score by replicating the keys pressed by the computer</p>
                    <p className='text-white font-medium text-center'>• With each correct sequence, the game increases the difficulty</p>
                    <p className='text-white font-medium text-center'>• If you press the wrong key you will be removed from the game</p>
                </div>
            </article>

            {/* Title */}
            <article className="flex absolute right-14 justify-center items-center gap-3 sm:gap-5 mt-7 mb-4">
                <img src="/src/assets/images/icon-music.png" className="w-8 sm:w-10 lg:w-12 xl:w-14" alt="Note of music" />
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium text-white font-sans">Virtual Piano Game</h1>
                <img src="/src/assets/images/icon-music.png" className="w-8 sm:w-10 lg:w-12 xl:w-14" alt="Note of music" />
            </article>

            {/* Piano */}
            <article className="flex-grow flex items-end justify-center w-full px-5">
                <Piano />
            </article>

            {/* Buttons */}
            <button onClick={gameActive ? stopGame : startGame} className={`font-semibold py-2.5 px-6 rounded-lg mt-6 mb-8 transition-all ease-in-out duration-300
                ${gameActive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-yellow-400 hover:bg-yellow-600'}`}>
                {gameActive ? 'Stop Game' : 'Start Game'}
            </button>

            {/* Time y Score */}
            <article className="flex flex-col absolute bottom-0 right-0 bg-white/20 w-fit px-8 py-2 m-4 rounded-xl text-white">
                <div className='flex flex-row justify-between gap-4'>
                    <div className='flex flex-col items-start min-w-20'>
                        <p className='font-medium'>Time:</p>
                        <p id="time" className='font-medium text-yellow-400'>{time} Sec</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='font-medium'>Score:</p>
                        <p id="score" className='font-medium text-yellow-400'>{score}</p>
                    </div>
                </div>
            </article>

            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <p className="text-xl font-semibold">¡ Game Over !</p>
                <p className="font-medium">Your score: {score} Points</p>
            </Modal>
        </section>
    );
}