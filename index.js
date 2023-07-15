const resources = ["Hout", "Graan", "Steen", "Kippen", "Goud"];
const factions = ["Maya's", "Azteken"];

const currentMapState = {
  "baja-california": {
    name: "Baja California",
    faction: "None",
    resource: "None",
  },
  "baja-california-sur": {
    name: "Baja California Sur",
    faction: "None",
    resource: "None",
  },
  coahuila: {
    name: "Coahuila",
    faction: "None",
    resource: "None",
  },
  chihuahua: {
    name: "Chihuahua",
    faction: "None",
    resource: "None",
  },
  durango: {
    name: "Durango",
    faction: "None",
    resource: "None",
  },
  sinaloa: {
    name: "Sinaloa",
    faction: "None",
    resource: "None",
  },
  sonora: {
    name: "Sonora",
    faction: "None",
    resource: "None",
  },
  zacatecas: {
    name: "Zacatecas",
    faction: "None",
    resource: "None",
  },
  "nuevo-león": {
    name: "Nuevo León",
    faction: "None",
    resource: "None",
  },
  "san-luis-potosí": {
    name: "San Luis Potosí",
    faction: "None",
    resource: "None",
  },
  tamaulipas: {
    name: "Tamaulipas",
    faction: "None",
    resource: "None",
  },
  aguascalientes: {
    name: "Aguascalientes",
    faction: "None",
    resource: "None",
  },
  colima: {
    name: "Colima",
    faction: "None",
    resource: "None",
  },
  jalisco: {
    name: "Jalisco",
    faction: "None",
    resource: "None",
  },
  michoacán: {
    name: "Michoacán",
    faction: "None",
    resource: "None",
  },
  nayarit: {
    name: "Nayarit",
    faction: "None",
    resource: "None",
  },
  campeche: {
    name: "Campeche",
    faction: "None",
    resource: "None",
  },
  oaxaca: {
    name: "Oaxaca",
    faction: "None",
    resource: "None",
  },
  puebla: {
    name: "Puebla",
    faction: "None",
    resource: "None",
  },
  tabasco: {
    name: "Tabasco",
    faction: "None",
    resource: "None",
  },
  tlaxcala: {
    name: "Tlaxcala",
    faction: "None",
    resource: "None",
  },
  "distrito-federal": {
    name: "Distrito Federal",
    faction: "None",
    resource: "None",
  },
  guanajuato: {
    name: "Guanajuato",
    faction: "None",
    resource: "None",
  },
  guerrero: {
    name: "Guerrero",
    faction: "None",
    resource: "None",
  },
  hidalgo: {
    name: "Hidalgo",
    faction: "None",
    resource: "None",
  },
  méxico: {
    name: "México",
    faction: "None",
    resource: "None",
  },
  morelos: {
    name: "Morelos",
    faction: "None",
    resource: "None",
  },
  querétaro: {
    name: "Querétaro",
    faction: "None",
    resource: "None",
  },
  veracruz: {
    name: "Veracruz",
    faction: "None",
    resource: "None",
  },
  chiapas: {
    name: "Chiapas",
    faction: "None",
    resource: "None",
  },
  "quintana-roo": {
    name: "Quintana Roo",
    faction: "None",
    resource: "None",
  },
  yucatán: {
    name: "Yucatán",
    faction: "None",
    resource: "None",
  },
};

function removeSelectedState() {
  Array.from(document.getElementsByClassName("map-state")).forEach(
    (element) => {
      element.classList.remove("selected");
    }
  );
}

function stateClicked(id) {
  removeSelectedState();
  document.getElementById(id).classList.add("selected");
  updateMapInfoModule(id);
}

function updateMapInfoModule(id) {
  document.getElementById("map-info__title").innerHTML =
    currentMapState[id].name;
  document.getElementById("map-info__faction").innerHTML =
    currentMapState[id].faction;
  document.getElementById("map-info__resource").innerHTML =
    currentMapState[id].resource;
}
