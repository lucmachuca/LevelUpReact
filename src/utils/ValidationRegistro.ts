interface Registro {
  nombre: string;
  email: string;
  telefono?: string;
  region: string;
  comuna: string;
  password: string;
  confirmPassword: string;
}

export function validarRegistro(form: Registro) {
  const errors: Partial<Record<keyof Registro, string>> = {};

  if (!form.nombre?.trim()) errors.nombre = "El nombre es obligatorio.";
  if (!form.email?.trim()) errors.email = "El correo es obligatorio.";
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Correo no válido.";
  if (!form.region) errors.region = "Selecciona una región.";
  if (!form.comuna) errors.comuna = "Selecciona una comuna.";
  if (!form.password?.trim()) errors.password = "La contraseña es obligatoria.";
  else if (form.password.length < 6) errors.password = "Mínimo 6 caracteres.";
  if (form.confirmPassword !== form.password) errors.confirmPassword = "Las contraseñas no coinciden.";

  return errors;
}
