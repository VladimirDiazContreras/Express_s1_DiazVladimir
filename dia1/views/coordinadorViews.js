module.exports = {
    listaTrainers: (trainers) =>
      "📋 Lista de Trainers:\n" +
      trainers.map((t) => `${t.nombre} ${t.apellido} - Grupo: ${t.grupo}`).join("\n"),
    listaCampers: (campers) =>
      "📋 Lista de Campers:\n" +
      campers.map((c) => `${c.nombre} - Riesgo: ${c.riesgo}`).join("\n"),
  };
  