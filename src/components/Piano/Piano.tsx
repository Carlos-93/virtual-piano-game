// src/components/Piano.tsx
import { useState, useEffect } from "react";
import { keys, playNote, handlePressKey } from "../../utils/tone";

export default function Piano() {
    const [sequence, setSequence] = useState<string[]>([]);
    const [userInput, setUserInput] = useState<string[]>([]);

    useEffect(() => {
        // Añade el evento para manejar teclas
        document.addEventListener("keydown", handlePressKey);
        return () => {
            document.removeEventListener("keydown", handlePressKey);
        };
    }, []);

    // Genera un patrón aleatorio de notas
    function generatePattern(): void {

    }

    // Reproduce el patrón generado
    function playPattern(): void {

    }

    // Maneja la entrada del usuario
    function handleUserInput(note: string): void {

    }

    /*
    .piano-container {
    background-color: #f0f0f0;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;

    .piano {
    display: flex;
    justify-content: center;

    .key {
    width: 40px;
    height: 150px;
    margin: 0 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    cursor: pointer;
}

.key.white {
    background-color: #fff;
}
}
}
}
    */
    return (
        <div className=" bg-white w-full max-w-[800px] m-0 text-center">
            <div className="flex justify-center">
                {keys.map((key) => (
                    <div
                        key={key.note}
                        className={`key w-10 h-[150px] m-0 hover:bg-[#fff] flex justify-center items-center border border-black cursor-pointer
                         ${key.color === "white" ? "bg-white" : "bg-black w-[30px] h-[100px] text-white relative z-10 -mx-5"}`}
                        onClick={() => {
                            playNote(key.note);
                        }}
                    >
                        {key.key}
                    </div>
                ))}
            </div>
        </div>
    );
}
