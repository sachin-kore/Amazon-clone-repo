import './App.css';
import { Header } from './Header';
import { Home } from './Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Checkout } from './Checkout';
import { Login } from './Login';
import { useEffect } from 'react';
import { auth } from './Firebase';
import { useStateValue } from './StateProvider';
import { Payment } from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51LuEVdSBac3jzOzMrVq3Z4SdSpLw0UC6HDZMN2iObQxZJnlAGd0ULOCmfiPqakz1QPpm9vDfHxaTd8oW4IymrY6M00OYugYunt');

function App() {
  const [{ basket, user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser
        })

      } else {
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/' element={<><Header /><Home /></>} />
          <Route path='/checkout' element={<><Header /><Checkout /></>} />
          <Route path='/payment' element={<><Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </>} />
        </Routes>
      </Router>


    </div>
  );
}
export default App;
