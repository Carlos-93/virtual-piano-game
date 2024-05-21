import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Logo from "./components/logo/Logo";
import MusicGame from "./components/musicGame/MusicGame";

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <main className='h-screen grid place-items-center'>
            <Logo />
            <MusicGame />
          </main>
        } />
      </Routes>
    </Router>
  );
}