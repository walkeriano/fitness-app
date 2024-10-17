import { useEffect, useState, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import AuthContext from "../auth/auth-context";
import { db } from "../../../firebase-config";

const useUserProfile = () => {
  const { user } = useContext(AuthContext); // Obtén el usuario desde el contexto de autenticación
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) { // Solo intentamos obtener datos si el usuario está autenticado
        // Primero, intentamos obtener los datos del localStorage
        const cachedProfile = localStorage.getItem(`userProfile_${user.uid}`);
        
        if (cachedProfile) {
          setUserProfile(JSON.parse(cachedProfile)); // Cargar desde localStorage
          setLoading(false); // Terminar la carga inmediatamente
          return; // No hacer la solicitud a Firestore
        }

        try {
          const userDocRef = doc(db, "users", user.uid); // Referencia al documento del usuario
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const profileData = userDoc.data();
            setUserProfile(profileData); // Establece el perfil del usuario en el estado
            localStorage.setItem(`userProfile_${user.uid}`, JSON.stringify(profileData)); // Guardar en localStorage
          } else {
            console.error("No se encontró el documento del usuario en Firestore");
          }
        } catch (error) {
          console.error("Error al obtener el perfil del usuario desde Firestore:", error);
          setError("Error al cargar los datos del perfil.");
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [user]); // Ejecuta el efecto cada vez que el usuario cambie

  return { userProfile, loading, error };
};

export default useUserProfile;