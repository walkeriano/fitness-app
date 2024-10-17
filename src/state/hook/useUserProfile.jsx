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
    let isMounted = true; // Variable para comprobar si el componente sigue montado

    const fetchUserProfile = async () => {
      if (user) { // Solo intentamos obtener datos si el usuario está autenticado
        try {
          const userDocRef = doc(db, "users", user.uid); // Referencia al documento del usuario
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists() && isMounted) {
            const profileData = userDoc.data();
            setUserProfile(profileData); // Establece el perfil del usuario en el estado
          } else if (isMounted) {
            console.error("No se encontró el documento del usuario en Firestore");
          }
        } catch (error) {
          console.error("Error al obtener el perfil del usuario desde Firestore:", error);
          if (isMounted) setError("Error al cargar los datos del perfil.");
        }
      }
      if (isMounted) setLoading(false);
    };

    fetchUserProfile();

    return () => {
      isMounted = false; // Cleanup para evitar actualizaciones de estado en componentes desmontados
    };
  }, [user]); // Ejecuta el efecto cada vez que el usuario cambie

  return { userProfile, loading, error };
};

export default useUserProfile;