import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<div className="text-center py-20 text-2xl font-bold">404 - Not Found</div>} />
            </Routes>
          </main>
          <footer className="bg-white p-8 border-t border-gray-100 text-center text-gray-500">
            <p>&copy; 2024 House Rental Management System. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
