import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import useProfile, { ProfileContext } from './hooks/useProfile';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Message from './pages/Message';

export function App() {
  const profile = useProfile();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function setGlobalProfile() {
      if (['/login', '/register'].includes(location.pathname)) return;

      if (!Object.keys(profile.profile).length) {
        const localProfile = localStorage.getItem('profile');

        if (!localProfile) navigate('/login');
        profile.setProfile(JSON.parse(localProfile));
      }
    }

    setGlobalProfile();
  }, []);

  return (
    <ProfileContext.Provider value={profile}>
      {console.log('render app.js')}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/message/:id" element={<Message />} />
        </Route>
      </Routes>
    </ProfileContext.Provider>
  );
}
