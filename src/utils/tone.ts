import * as Tone from "tone";
import { KeyMapping } from "../interfaces/keyMapping";

export const keys: KeyMapping[] = [
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
];

const synth = new Tone.Synth().toDestination();

export function playNote(note: string): void {
    synth.triggerAttackRelease(note, "8n");
}

export function handlePressKey(event: KeyboardEvent) {
    const noteToPlay = keys.find(
        (item) => item.key.toLowerCase() === event.key.toLowerCase()
    );
    if (noteToPlay) {
        playNote(noteToPlay.note);
    }
}