import styles from "./visualizerAlimentacion.module.css";
import useUserAlimentacion from "@/state/hook/useUserAlimentacion";

export default function VisualizerAlimentacion() {
  const { alimentacionData, loading, error } = useUserAlimentacion();

  if (loading) {
    return <p>Cargando plan de alimentación...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!alimentacionData) {
    return <p>No se encontró un plan de alimentación.</p>;
  }

  const archivo = alimentacionData.archivo;

  if (typeof archivo !== "string" || !archivo.trim()) {
    return <p>El plan de alimentación no tiene un archivo PDF disponible.</p>;
  }

  return (
    <section className={styles.containerVisualizer}>
      <iframe
        src={`${archivo.trim().split("#")[0]}#toolbar=0&navpanes=0&scrollbar=0`}
        title="Plan de alimentación personalizado"
        className={styles.cont}
      />
    </section>
  );
}
