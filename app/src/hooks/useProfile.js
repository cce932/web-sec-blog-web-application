import { useContext } from 'react';
import { createContext } from 'react';
import { useState } from 'react';

export default function useProfile() {
  const [profile, setProfile] = useState({});

  const clearProfile = () => {
    setProfile({});
  };

  return { profile, setProfile, clearProfile };
}

export const ProfileContext = createContext({});

export const useProfileContext = () => useContext(ProfileContext);
