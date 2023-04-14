import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherApp from "./scenes/main/LandingPage";
import FloodPredict from "./scenes/js/App";
import Register from "./scenes/main/Register";
import Login from "./scenes/main/Login";
import AdminHome from "./scenes/admin/AdminHome";
import AdminLayout from "./scenes/admin/AdminLayout";
import ReliefCenter from "./scenes/volunteer/reliefCenter/ReliefCenter";
// import ReliefCenterPage from "./scenes/volunteer/reliefCenter/ReliefCenterPage";
import CollectionCenter from "./scenes/volunteer/collection/CollectionCenter";
import NavBar from "./scenes/main/NavBar";
import SnackBar from "./scenes/main/Snackbar";
import axios from "axios";
import MyReliefCenter from "./scenes/volunteer/reliefCenter/MyReliefCenter";
import MyCollectionCenter from "./scenes/volunteer/collection/MyCollectionCenter"
import WTA from "./scenes/main/LandingPage";

function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  // axios.defaults.withCredentials = true;

  return (
    <BrowserRouter>
      <NavBar />
      <SnackBar />
      <Routes>
        <Route path="/" element={<FloodPredict/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* admin */}
        <Route path="/admin">
          <Route index element={<AdminLayout />} />
          <Route path="home" element={<AdminHome />} />
        </Route>
        {/* Volunterrs */}

        <Route path="/volunteer">
          {/* relief-center */}
          <Route path="relief-center" element={<ReliefCenter />} />
          <Route path="my-relief-center" element={<MyReliefCenter />} />
      

          {/* collection center */}
          <Route path="collection-center" element={<CollectionCenter />} />
          <Route path="my-collection-center" element={<MyCollectionCenter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
