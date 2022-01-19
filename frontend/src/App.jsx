import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";


import './App.css';


//////////////////
import Login from "./pages/Login";
import Register from "./pages/Register";
import MapView from "./pages/MapView";
import NewItem from "./pages/NewItem";
import Home from "./pages/Home";
// import LoginForm from './components/LoginForm';

function App() {

  // const [users, setUsers] = useState()
  // const [pins, setPins] = useState()

  // useEffect(() => {
  //   //requests for data should have /api
  //   axios.get("/api/users").then((res) => setUsers(res.data));
  // }, []);

  // useEffect(() => {
  //   axios.get("/api/pins").then((res) => setPins(res.data));
  // }, []);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  return (
    <div className="App container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/mapview"
          element={
            <MapView
              latitude={latitude}
              longitude={longitude}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
          }
        />
        <Route
          path="/newitem"
          element={
            <NewItem
              latitude={latitude}
              longitude={longitude}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
            />
          }
        />


      </Routes>


    </div >
  );
}

export default App;
