import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';
import CallsPage from './pages/CallsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/calls" element={<CallsPage />} />
        <Route path="*" element={<NotFoundPage /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;