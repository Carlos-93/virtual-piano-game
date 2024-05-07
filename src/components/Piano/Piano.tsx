import { useEffect } from "react";
import { keys, playNote, handlePressKey, handleReleaseKey } from "../../utils/tone";

export default function Piano() {

    useEffect(() => {
        document.addEventListener("keydown", handlePressKey);
        document.addEventListener("keyup", handleReleaseKey);

        return () => {
            document.removeEventListener("keydown", handlePressKey);
            document.removeEventListener("keyup", handleReleaseKey);
        };
    }, []);

    return (
        <div className="mb-5 font-medium">
            <div className="flex relative">
                {keys.map((key) => (
                    <div
                        key={key.note}
                        id={`key-${key.note}`}
                        className={`flex justify-center items-end border border-black cursor-pointer pb-4 rounded-b-lg
                            ${key.color === "white"
                                ? "w-20 h-80 bg-white text-black hover:bg-white-hover"
                                : "w-12 h-48 bg-black text-white hover:bg-black-hover relative z-10 -mx-6"}`}
                        onClick={() => playNote(key.note)}>
                        {key.key}
                    </div>
                ))}
            </div>
        </div>
    );
}