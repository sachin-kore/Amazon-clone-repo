import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import existing components
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';

// Import HOC Examples
import HOCExample from './HOCExample';
import ImprovedHOCExample from './ImprovedHOCExample';

// Import context
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Header />
                <Home />
              </>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <>
                <Header />
                <Checkout />
              </>
            } 
          />
          <Route 
            path="/login" 
            element={<Login />} 
          />
          <Route 
            path="/payment" 
            element={
              <>
                <Header />
                <Payment />
              </>
            } 
          />
          {/* Basic HOC Examples Route */}
          <Route 
            path="/hoc-examples" 
            element={
              <>
                <div style={{
                  backgroundColor: '#232f3e',
                  padding: '10px 20px',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Link 
                    to="/" 
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                  >
                    ← Back to Amazon Clone
                  </Link>
                  <h1 style={{ margin: 0, fontSize: '20px' }}>
                    React HOC Examples
                  </h1>
                  <Link 
                    to="/improved-hoc-examples" 
                    style={{
                      color: '#ff9900',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}
                  >
                    View Improved Examples →
                  </Link>
                </div>
                <HOCExample />
              </>
            } 
          />
          {/* New Improved HOC Examples Route */}
          <Route 
            path="/improved-hoc-examples" 
            element={
              <>
                <div style={{
                  backgroundColor: '#232f3e',
                  padding: '10px 20px',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Link 
                    to="/" 
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                  >
                    ← Back to Amazon Clone
                  </Link>
                  <h1 style={{ margin: 0, fontSize: '20px' }}>
                    🚀 Improved HOC Examples
                  </h1>
                  <Link 
                    to="/hoc-examples" 
                    style={{
                      color: '#ff9900',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}
                  >
                    ← Basic Examples
                  </Link>
                </div>
                <ImprovedHOCExample />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
