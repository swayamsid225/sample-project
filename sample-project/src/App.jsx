import React, { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useLoginMutation } from './services/auth';
import { useGetPostsQuery } from './services/posts';
import './index.css';

const ThemeContext = createContext();

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded shadow"
    >
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    try {
      const res = await login({
        username: username.trim(),
        password: password.trim(),
        expiresInMins: 30,
      }).unwrap();
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.username);
      navigate('/home');
    } catch (err) {
      setError(err?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

const ChatSidebar = ({ onClose }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const ws = new WebSocket('wss://echo.websocket.org/.ws');
    setSocket(ws);
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, { from: 'server', text: event.data }]);
    };
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return;
    socket.send(input);
    setMessages((prev) => [...prev, { from: 'user', text: input }]);
    setInput('');
  };

  return (
    <div className="fixed right-0 top-0 w-96 max-w-full h-full bg-white dark:bg-gray-900 border-l border-gray-300 dark:border-gray-700 shadow-2xl z-50 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Chat</h2>
        <button onClick={onClose} className="text-sm text-red-500 hover:text-red-600">Close</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-md ${
              msg.from === 'user'
                ? 'ml-auto bg-blue-500 text-white'
                : 'mr-auto bg-gray-200 dark:bg-gray-700 dark:text-white'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [page, setPage] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const username = localStorage.getItem('username');
  const { data, isLoading, isFetching } = useGetPostsQuery({ page });
  const posts = data?.posts || [];

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white relative">
      <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow">
        <h1 className="text-xl font-bold">Home</h1>
        <div className="flex items-center space-x-4">
          <span>Welcome, {username}</span>
          <ThemeToggle />
        </div>
      </nav>
      <main className="p-6">
        {posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 bg-white dark:bg-gray-700 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
        {(isLoading || isFetching) && <p className="text-center mt-4">Loading...</p>}
      </main>
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
      >
        Chat
      </button>
      {chatOpen && <ChatSidebar onClose={() => setChatOpen(false)} />}
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/" />;
};

export const useTheme = () => useContext(ThemeContext);
export default App;
