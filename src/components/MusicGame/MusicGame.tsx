import Piano from "../Piano/Piano";

export default function MusicGame() {
    return (
        <div className="w-3/5 h-3/5 backdrop-blur-xl rounded-3xl border-2 grid place-items-center">
            <h1 className="text-4xl font-bold">Music Piano Game</h1>
            <Piano />
        </div>
    );
}