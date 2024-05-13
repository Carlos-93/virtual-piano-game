import { useEffect, useCallback } from "react";
import { keys, playNote, handleKeyPress, handleKeyRelease } from "../../utils/tone";

export default function Piano() {
    const handlePressKey = useCallback((event: KeyboardEvent) => {
        handleKeyPress(event, playNote);
    }, []);

    const handleReleaseKey = useCallback((event: KeyboardEvent) => {
        handleKeyRelease(event);
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handlePressKey);
        window.addEventListener("keyup", handleReleaseKey);

        return () => {
            window.removeEventListener("keydown", handlePressKey);
            window.removeEventListener("keyup", handleReleaseKey);
        };
    }, [handlePressKey, handleReleaseKey]);

    return (
        <section className="mb-6 font-medium">
            <article className="flex relative">
                {keys.map((key) => (
                    <button
                        type="button"
                        key={key.note}
                        id={`key-${key.note}`}
                        className={`flex justify-center items-end border border-black cursor-pointer pb-4
                            ${key.color === "white"
                                ? "w-20 h-80 bg-white text-black hover:bg-white-hover  rounded-b-md"
                                : "w-12 h-48 bg-black text-white hover:bg-black-hover relative z-10 -mx-6  rounded-b-xl"}`}
                        onClick={() => playNote(key.note)}
                        aria-label={`Play note ${key.note}`}
                    >
                        {key.key}
                    </button>
                ))}
            </article>
        </section>
    );
}