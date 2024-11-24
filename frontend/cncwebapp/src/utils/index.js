const camelCaseToCapitalCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Inserta un espacio antes de las letras mayúsculas
    .replace(/^./, (match) => match.toUpperCase()); // Capitaliza la primera letra
};

const formatDateTime = (isoStringDate) => {
  const date = new Date(isoStringDate);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
  const year = date.getUTCFullYear();

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const capitalize = (s) => {
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

export { camelCaseToCapitalCase, capitalize, formatDateTime };
