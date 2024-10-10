"use client";
import { createContext } from "react";

export const initialAuthState = {
  user: null, // Inicialmente, no hay usuario autenticado
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
};

const AuthContext = createContext(initialAuthState);

export default AuthContext;
