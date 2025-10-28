
export function validarCamposLogin(datos: { email: string; password: string }): boolean {
  return datos.email.trim() !== "" && datos.password.trim() !== "";
}
