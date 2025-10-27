export default {
  // 📂 Cambiamos el directorio donde buscará las pruebas
  spec_dir: "src/tests",

  // 🔍 Busca cualquier archivo terminado en .spec.js o .spec.mjs
  spec_files: [
    "**/*[sS]pec.?(m)js"
  ],

  // 🧩 Si más adelante agregas helpers, Jasmine los cargará desde aquí
  helpers: [
    "helpers/**/*.?(m)js"
  ],

  // ⚙️ Configuración del entorno de pruebas
  env: {
    stopSpecOnExpectationFailure: false,
    random: false,                // opcional: desactiva el orden aleatorio
    forbidDuplicateNames: true
  }
}

