const readline = require("readline");

function mostrarMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("\n=== MENÚ PRINCIPAL ===");
  console.log("1. Crear cliente");
  console.log("2. Listar clientes");
  console.log("0. Salir");

  rl.question("\nElige una opción: ", (opcion) => {
    console.log(`Elegiste: ${opcion}`);
    rl.close();
  });
}

module.exports = mostrarMenu;
