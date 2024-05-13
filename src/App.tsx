import Logo from "./components/logo/Logo";
import MusicGame from "./components/musicGame/MusicGame";

export default function App() {
  return (
    <main className='h-screen grid place-items-center'>
      <Logo />
      <MusicGame />
    </main>
  );
}