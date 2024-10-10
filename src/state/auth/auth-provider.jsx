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

// Función para obtener mensajes de error específicos de Firebase
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

// Hook para manejar errores
const handleFirebaseError = (error) => {
  console.error("Firebase error:", error); // Log del error para depuración
  return getFirebaseErrorMessage(error); // Retorna un mensaje amigable
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
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error("Error durante el cierre de sesión. Inténtalo de nuevo.");
    }
  };

  const register = async ({
    email,
    password,
    name,
    lastName,
    country,
    city,
    birthDate,
  }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid; // Obtener el UID del usuario recién registrado

    // Crear un documento en Firestore en la colección "users"
    await setDoc(doc(db, "users", userId), {
      email: email,
      name: name,
      lastName: lastName,
      country: country,
      city: city,
      createdAt: new Date(),
    });

    return userCredential;
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {loading ? <p>Cargando...</p> : children}
    </AuthContext.Provider>
  );
};
