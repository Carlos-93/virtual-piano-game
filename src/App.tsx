import Logo from "./components/Logo/Logo";
import MusicGame from "./components/MusicGame/MusicGame";

export default function App() {
  return (
    <main className='h-screen grid place-items-center'>
      <Logo />
      <MusicGame />
    </main>
  );
}