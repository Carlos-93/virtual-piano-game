// Lógica del juego Virtual Piano Game

// 1. Generar una secuencia aleatoria 4 teclas (Notas musicales)
// 2. Reproducir la secuencia de teclas generada
// 3. Esperar a que el usuario presione las teclas correctas en el mismo orden
// 4. Cada ronda completada con éxito aumenta la dificultad del juego (Velocidad de reproducción de la secuencia)
// 5. Si el usuario presiona la tecla correcta, aumentamos la puntuación a 50 puntos y continuamos con la siguiente ronda (Secuencia anterior + 1 tecla)
// 6. Si el usuario presiona una tecla incorrecta, detenemos el juego, mostramos un modal con la puntuación final junto con un botón para cerrar el modal

import { useEffect, useState, useRef } from "react";
import { keys, playNote } from "../../utils/tone";
import Piano from "../Piano/Piano";

export default function MusicGame() {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timeInterval = useRef<number | undefined>();

    let sequence: string[] = [];

    useEffect(() => {
        function updateTime() {
            setTime((prevTime) => prevTime + 1);
        }
        if (isRunning) {
            timeInterval.current = window.setInterval(updateTime, 1000);
        }
        return () => clearInterval(timeInterval.current);
    }, [isRunning]);

    // Función para generar una secuencia aleatoria de teclas
    function generateRandomSequence(length: number) {
        const notes = keys.map((key) => key.key);
        const sequence: string[] = [];
        for (let i = 1; i <= length; i++) {
            const randomIndex = Math.floor(Math.random() * notes.length);
            sequence.push(notes[randomIndex]);
        }
        return sequence;
    }

    // Función para reproducir una secuencia de teclas
    async function playSequence(sequence: string[]) {
        for (const key of sequence) {
            const pianoKey = keys.find((k) => k.key === key);
            if (pianoKey) {
                await new Promise((resolve) => {
                    setTimeout(() => {
                        playNote(pianoKey.note);
                        resolve(null);
                    }, 1000);
                });
            }
        }
    }

    // Función para iniciar el juego
    function startGame() {

        // Reiniciar el tiempo y la secuencia
        setIsRunning(true);
        setTime(0);

        // Generar una secuencia aleatoria de teclas
        sequence = generateRandomSequence(4);

        setInterval(() => {
            sequence.push(...generateRandomSequence(1));
            playSequence(sequence);
        }, 4000 + sequence.length * 1000);

        playSequence(sequence);
    }

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

            {/* Button Start Game */}
            <button id='start' onClick={startGame} className='px-5 py-2 font-medium mb-4 mt-8 bg-yellow-400 rounded-lg w-fit hover:bg-yellow-600 transition-all ease-in-out duration-300'>
                <span>Start Game</span>
            </button>

            {/* Time y Score */}
            <article className="flex flex-col absolute bottom-0 right-0 bg-white/20 w-fit px-8 py-2 m-4 rounded-xl  text-white">
                <div className='flex flex-row justify-between gap-4'>
                    <div className='flex flex-col items-start min-w-20'>
                        <p className='font-medium'>Time:</p>
                        <p id="time" className='font-medium text-yellow-400'>{time} Seg</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='font-medium'>Score:</p>
                        <p id="score" className='font-medium text-yellow-400'>0</p>
                    </div>
                </div>
            </article>
        </section>
    );
}