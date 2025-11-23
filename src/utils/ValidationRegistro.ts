interface Registro {
  nombre: string;
  email: string;
  telefono?: string;
  region: string;
  comuna: string;
  password: string;
  confirmPassword: string;
  fechaNacimiento?: string;
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

  if (form.confirmPassword !== form.password)
    errors.confirmPassword = "Las contraseñas no coinciden.";

  // Validación de edad +18
  if (!form.fechaNacimiento) {
    errors.fechaNacimiento = "Ingresa tu fecha de nacimiento.";
  } else {
    const hoy = new Date();
    const nacimiento = new Date(form.fechaNacimiento);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    if (edad < 18) {
      errors.fechaNacimiento = "Debes ser mayor de 18 años para registrarte.";
    }
  }

  return errors;
}

// utilidad recomendada para calcular edad
export function calcularEdad(fechaNacimiento: string): number {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}
