import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (err) {
        setError("Error al obtener usuarios");
        console.error("Error al obtener documentos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Función para eliminar usuario
  const deleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, "users", userId));
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  // Función para cambiar suscripción a "suspendido"
  const suspendUser = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { suscripcion: "suspendido" });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, suscripcion: "suspendido" } : user
        )
      );
    } catch (error) {
      console.error("Error al suspender usuario:", error);
    }
  };

  // Función para cambiar suscripción a "activo"
  const activateUser = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { suscripcion: "activo" });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, suscripcion: "activo" } : user
        )
      );
    } catch (error) {
      console.error("Error al activar usuario:", error);
    }
  };

    // Función para cambiar suscripción a "suspendido"
    const suspenderNivel = async (userId) => {
      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { niveles: "suspendido" });
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, niveles: "suspendido" } : user
          )
        );
      } catch (error) {
        console.error("Error al suspender usuario:", error);
      }
    };
  
    // Función para cambiar suscripción a "activo"
    const activateNivel = async (userId) => {
      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { niveles: "activo" });
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, niveles: "activo" } : user
          )
        );
      } catch (error) {
        console.error("Error al activar usuario:", error);
      }
    };

  return { users, loading, error, deleteUser, suspendUser, activateUser, activateNivel, suspenderNivel };
};

export default useFetchUsers;