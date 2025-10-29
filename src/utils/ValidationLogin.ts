export function validarLogin(form: { email: string; password: string }) {
  const errors: { email?: string; password?: string } = {};
  if (!form.email?.trim()) errors.email = "El correo es obligatorio.";
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Formato de correo no válido.";
  if (!form.password?.trim()) errors.password = "La contraseña es obligatoria.";
  else if (form.password.length < 6) errors.password = "Mínimo 6 caracteres.";
  return errors;
}
