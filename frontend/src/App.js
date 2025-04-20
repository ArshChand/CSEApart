// import './App.css';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import TextForm from './components/Analyze';
// import About from './components/About';
// import Alert from './components/Alert';
// import FChatButton from './components/FChatButton';
// import Login from './components/Login';
// import Signup from './components/Signup'; // 🆕 Import Signup

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// function App() {
//   const [mode, setMode] = useState('light');
//   const [alert, setAlert] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const showAlert = (message, type) => {
//     setAlert({ msg: message, type: type });
//     setTimeout(() => setAlert(null), 2000);
//   };

//   const toggleMode = () => {
//     if (mode === 'light') {
//       setMode('dark');
//       document.body.style.backgroundColor = '#1e1e1e';
//       showAlert("Dark mode activated!", "info");
//     } else {
//       setMode('light');
//       document.body.style.backgroundColor = '#f8f9fa';
//       showAlert("Light mode activated!", "info");
//     }
//   };

//   return (
//     <Router>
//       {isLoggedIn && <Navbar title="PaperMind" mode={mode} toggleMode={toggleMode} />}
//       <Alert alert={alert} />
//       <div className="container my-4">
//         <Routes>
//           {!isLoggedIn ? (
//             <>
//               <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="*" element={<Navigate to="/login" />} />
//             </>
//           ) : (
//             <>
//               <Route path="/dashboard" element={<Home />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/analyze" element={<TextForm />} />
//               <Route path="*" element={<Navigate to="/dashboard" />} />
//             </>
//           )}
//         </Routes>
//       </div>
//       {isLoggedIn && <FChatButton />}
//     </Router>
//   );
// }

// export default App;

// import './App.css';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import TextForm from './components/Analyze';
// import About from './components/About';
// import Alert from './components/Alert';
// import FChatButton from './components/FChatButton';
// import Login from './components/Login';
// import Signup from './components/Signup'; // 🆕 Import Signup
// import { useNavigate } from "react-router-dom";

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// function App() {
//   const [mode, setMode] = useState('light');
//   const [alert, setAlert] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   const showAlert = (message, type) => {
//     setAlert({ msg: message, type: type });
//     setTimeout(() => setAlert(null), 2000);
//   };

//   const toggleMode = () => {
//     if (mode === 'light') {
//       setMode('dark');
//       document.body.style.backgroundColor = '#1e1e1e';
//       showAlert("Dark mode activated!", "info");
//     } else {
//       setMode('light');
//       document.body.style.backgroundColor = '#f8f9fa';
//       showAlert("Light mode activated!", "info");
//     }
//   };

//   return (
//     <Router>
//       {isLoggedIn && <Navbar title="PaperMind" mode={mode} toggleMode={toggleMode} handleLogout={handleLogout}/>}
//       <Alert alert={alert} />
//       <div className="container my-4">
//         <Routes>
//           {/* Routes for login and signup */}
//           {!isLoggedIn ? (
//             <>
//               <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//               <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
//               <Route path="*" element={<Navigate to="/login" />} />
//             </>
//           ) : (
//             <>
//               {/* Authenticated Routes */}
//               <Route path="/dashboard" element={<Home />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/analyze" element={<TextForm showAlert={showAlert} mode={mode} />} />
//               <Route path="*" element={<Navigate to="/dashboard" />} />
//             </>
//           )}
//         </Routes>
//       </div>
//       {isLoggedIn && <FChatButton />}
//     </Router>
//   );
// }

// export default App;
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TextForm from './components/Analyze';
import About from './components/About';
import Alert from './components/Alert';
import FChatButton from './components/FChatButton';
import Login from './components/Login';
import Signup from './components/Signup';

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Wrapper to access navigate inside App
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 2000);
  };

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#1e1e1e';
      showAlert("Dark mode activated!", "info");
    } else {
      setMode('light');
      document.body.style.backgroundColor = '#f8f9fa';
      showAlert("Light mode activated!", "info");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
    showAlert("Logged out successfully!", "info");
  };

  return (
    <>
      {isLoggedIn && (
        <Navbar
          title="PaperMind"
          mode={mode}
          toggleMode={toggleMode}
          handleLogout={handleLogout}
        />
      )}
      <Alert alert={alert} />
      <div className="container my-4">
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/analyze" element={<TextForm showAlert={showAlert} mode={mode} />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          )}
        </Routes>
      </div>
      {isLoggedIn && <FChatButton />}
    </>
  );
}

export default AppWrapper;
