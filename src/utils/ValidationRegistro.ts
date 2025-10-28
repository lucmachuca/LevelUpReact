// =============================================
// FUNCIONES DE VALIDACIÓN
// =============================================
// Separadas por responsabilidad, cumpliendo
// con Pauta N2 (modularidad y posibilidad de testing).
// =============================================

export function validarEmail(email: string): boolean {
  // Acepta solo correos @duocuc.cl, @profesor.duoc.cl y @gmail.com
  const regex = /^[^\s@]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
  return regex.test(email.trim());
}

export function validarEdad(fecha: string): boolean {
  const hoy = new Date();
  const nac = new Date(fecha);
  let edad = hoy.getFullYear() - nac.getFullYear();
  const mes = hoy.getMonth() - nac.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nac.getDate())) edad--;
  return edad >= 18;
}

export function validarCamposObligatorios(datos: Record<string, any>): boolean {
  const requeridos = [
    "nombre",
    "email",
    "password",
    "confirmar",
    "region",
    "comuna",
    "fechaNacimiento",
  ];
  return requeridos.every((campo) => datos[campo]?.toString().trim() !== "");
}

export function validarCoincidencia(pass: string, confirmar: string): boolean {
  return pass === confirmar;
}

export function validarLongitudPassword(pass: string): boolean {
  return pass.length >= 4 && pass.length <= 10;
}

export function validarTerminos(terminos: boolean): boolean {
  return terminos === true;
}
