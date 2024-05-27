import { PianoKey } from "../interfaces";
import * as Tone from "tone";

export const keys: PianoKey[] = [
    { note: "C4",  key: "A", color: "white" },
    { note: "Db4", key: "W", color: "black" },
    { note: "D4",  key: "S", color: "white" },
    { note: "Eb4", key: "E", color: "black" },
    { note: "E4",  key: "D", color: "white" },
    { note: "F4",  key: "F", color: "white" },
    { note: "Gb4", key: "T", color: "black" },
    { note: "G4",  key: "G", color: "white" },
    { note: "Ab4", key: "Y", color: "black" },
    { note: "A4",  key: "H", color: "white" },
    { note: "Bb4", key: "U", color: "black" },
    { note: "B4",  key: "J", color: "white" },
    { note: "C5",  key: "K", color: "white" },
    { note: "Db5", key: "O", color: "black" },
    { note: "D5",  key: "L", color: "white" }
];

const synth = new Tone.Synth().toDestination();

function toggleKeyClass(note: string, add: boolean): void {
    const keyElement = document.getElementById(`key-${note}`);
    const key = keys.find(k => k.note === note);

    if (keyElement && key) {
        const className = key.color === "white" ? "bg-white-hover" : "bg-black-hover";
        add ? keyElement.classList.add(className) : keyElement.classList.remove(className);
    }
}

export function playNote(note: string): void {
    synth.triggerAttackRelease(note, "8n");
    toggleKeyClass(note, true);
    setTimeout(() => toggleKeyClass(note, false), 200);
}

export function handleKeyPress(event: KeyboardEvent, playNote: (note: string) => void): void {
    const key = keys.find(k => k.key.toLowerCase() === event.key.toLowerCase());

    if (key) {
        playNote(key.note);
    }
}

export function handleKeyRelease(event: KeyboardEvent): void {
    const key = keys.find(k => k.key.toLowerCase() === event.key.toLowerCase());

    if (key) {
        toggleKeyClass(key.note, false);
    }
}