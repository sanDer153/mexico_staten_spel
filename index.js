const resources = ["Hout", "Graan", "Steen", "Kippen", "Goud"];

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

const bank = {
  "maya's": {
    hout: 0,
    graan: 0,
    steen: 0,
    kippen: 0,
    goud: 0,
  },
  azteken: {
    hout: 0,
    graan: 0,
    steen: 0,
    kippen: 0,
    goud: 0,
  },
};

function capitalized(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Get the faction of a certain state
function getFaction(stateId) {
  return currentMapState[stateId].faction;
}

// Set the faction of a certain state
function setFaction(stateId, faction) {
  // Faction === "maya's" or "azteken"
  if (faction !== "maya's" && faction !== "azteken") return;
  currentMapState[stateId].faction = faction;
  updateMap(stateId, faction);
}

// Remove the blue highlight from the selected state and clear map info module
function removeSelectedState() {
  Array.from(document.getElementsByClassName("map-state")).forEach(
    (element) => {
      element.classList.remove("selected");
    }
  );
  clearMapInfoModule();
}

// Clear the info in the map info module
function clearMapInfoModule() {
  document.getElementById("map-info__title").innerHTML = "";
  document.getElementById("map-info__faction").innerHTML = "None";
  document.getElementById("map-info__resource").innerHTML = "None";
  document
    .getElementById("map-info__maya-selector")
    .classList.remove("selected");
  document
    .getElementById("map-info__aztec-selector")
    .classList.remove("selected");
}

// Fires when a state is clicked: set blue highlight and load map info module
function stateClicked(stateId) {
  removeSelectedState();
  document.getElementById(stateId).classList.add("selected");
  updateMapInfoModule(stateId);
}

// Fires when option in faction selector is clicked: update faction of that state
function factionSelectorClicked(faction) {
  let name = document.getElementById("map-info__title").innerHTML;
  if (name === "") return;
  const id = name.replaceAll(" ", "-").toLowerCase();

  currentMapState[id].faction = faction;
  updateMap(id, faction);
  clearMapInfoModule();
  updateMapInfoModule(id);
}

// Update the mapcolor of a certain state
function updateMap(stateId, faction) {
  document.getElementById(stateId).classList.remove("maya");
  document.getElementById(stateId).classList.remove("aztec");
  if (faction === "maya's") {
    document.getElementById(stateId).classList.add("maya");
  } else if (faction === "azteken") {
    document.getElementById(stateId).classList.add("aztec");
  }
}

// Update de info in the map info module
function updateMapInfoModule(stateId) {
  document.getElementById("map-info__title").innerHTML =
    currentMapState[stateId].name;
  document.getElementById("map-info__faction").innerHTML = capitalized(
    currentMapState[stateId].faction
  );
  document.getElementById("map-info__resource").innerHTML = capitalized(
    currentMapState[stateId].resource
  );
  if (currentMapState[stateId].faction === "maya's") {
    document
      .getElementById("map-info__maya-selector")
      .classList.add("selected");
  } else if (currentMapState[stateId].faction === "azteken") {
    document
      .getElementById("map-info__aztec-selector")
      .classList.add("selected");
  }
}
