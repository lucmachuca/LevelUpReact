// Componente de mensaje de alerta (éxito o error)
type Props = { tipo: "success" | "error"; mensaje: string };

export default function AlertMessage({ tipo, mensaje }: Props) {
  const estilo =
    tipo === "success" ? "alert alert-success" : "alert alert-danger";
  return (
    <div role="alert" className={`${estilo} text-center mt-3 fw-bold`}>
      {mensaje}
    </div>
  );
}
