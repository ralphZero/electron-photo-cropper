import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Hello from './components/Hello';

import './App.css';
import Photo from './components/Photo';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/photo" element={<Photo />} />
      </Routes>
    </Router>
  );
}
