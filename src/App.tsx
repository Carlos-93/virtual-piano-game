import Logo from "./components/logo/Logo";
import MusicGame from "./components/musicGame/MusicGame";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// export default function App() {
//   return (
//     <main className='h-screen grid place-items-center'>
//       <Logo />
//       <MusicGame />
//     </main>
//   );
// }

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