"use client";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import AuthContext from "./auth-context";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../../firebase-config";
import Loading from "@/components/loadingExtra/loadingExtra";

const getFirebaseErrorMessage = (error) => {
  switch (error.code) {
    case "auth/invalid-email":
      return "Este email no es válido";
    case "auth/user-disabled":
      return "Cuenta de usuario desconocida";
    case "auth/user-not-found":
      return "No se encontró una cuenta disponible";
    case "auth/wrong-password":
      return "La contraseña es incorrecta";
    case "auth/email-already-in-use":
      return "Este Email ya está en uso";
    case "auth/weak-password":
      return "La contraseña debe tener mínimo 6 caracteres";
    default:
      return "Credenciales incorrectas";
  }
};

const handleFirebaseError = (error) => {
  console.error("Firebase error:", error); 
  return getFirebaseErrorMessage(error);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw new Error(handleFirebaseError(error));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); 
    } catch (error) {
      throw new Error("Error durante el cierre de sesión. Inténtalo de nuevo.");
    }
  };

  const register = async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid; 

      
      await setDoc(doc(db, "users", userId), {
        email: email,
        createdAt: new Date(),
      });

      return userCredential;
    } catch (error) {
      throw new Error(handleFirebaseError(error));
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {loading ? <Loading/> : children}
    </AuthContext.Provider>
  );
};
