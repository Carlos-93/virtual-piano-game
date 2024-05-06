// src/components/MusicGame/MusicGame.tsx
import Piano from "../Piano/Piano";

export default function MusicGame() {
    return (
        <div className="flex flex-col relative justify-between items-center w-full lg:w-3/5 h-3/5 backdrop-blur-2xl rounded-3xl border border-yellow-400">
            {/* Instructions */}
            <section className="flex flex-col absolute left-0 bg-white/20 w-fit px-4 py-3 rounded-xl text-sm">
                <div className='flex flex-col items-start gap-1'>
                    <p className='text-white font-semibold text-center mb-3'>Instructions:</p>
                    <p className='text-white font-medium text-center'>• Use the keyboard keys to make the piano sound</p>
                    <p className='text-white font-medium text-center'>• Press the piano keys that will appear</p>
                    <p className='text-white font-medium text-center'>• If you press the wrong key, you will be deleted</p>
                </div>
            </section>

            {/* Piano */}
            <section className="flex-grow flex items-end justify-center w-full px-5">
                <Piano />
            </section>

            {/* Button Start Game */}
            <button id='start' className='px-4 py-2 font-semibold mt-5 bg-yellow-400 rounded-lg w-fit hover:bg-yellow-600 transition-all ease-in-out duration-300'>
                <span>Start Game</span>
            </button>

            {/* Title */}
            <section className="flex justify-center items-center gap-3 sm:gap-5 mt-10 mb-4">
                <img src="/src/assets/images/icon-music.png" className="w-8 sm:w-10 lg:w-12 xl:w-14" alt="Note of music" />
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium text-white font-sans">Virtual Piano Game</h1>
                <img src="/src/assets/images/icon-music.png" className="w-8 sm:w-10 lg:w-12 xl:w-14" alt="Note of music" />
            </section>

            {/* Time y Score */}
            <section className="flex flex-col absolute bottom-0 right-0 bg-white/20 w-fit px-8 py-3 m-4 rounded-xl text-sm text-white">
                <div className='flex flex-row justify-between gap-6'>
                    <div className='flex flex-col items-start'>
                        <p className='font-semibold'>Time:</p>
                        <p id="time" className='font-medium'>00:00</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='font-semibold'>Score:</p>
                        <p id="score" className='font-medium'>0</p>
                    </div>
                </div>
            </section>
        </div>
    );
}