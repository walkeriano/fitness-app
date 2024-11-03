import styles from "./visualizerAlimentacion.module.css";
import useUserAlimentacion from "@/state/hook/useUserAlimentacion";

export default function VisualizerAlimentacion(){
    const { alimentacionData, loading, error } = useUserAlimentacion();

  if (loading) {
    return <p>Cargando datos de entrenamiento...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!alimentacionData) {
    return <p>No se encontraron datos de entrenamiento.</p>;
  }


    return(
        <section className={styles.containerVisualizer}>
            <iframe src={`${alimentacionData?.archivo}#toolbar=0`} className={styles.cont} />
        </section>
    )
}