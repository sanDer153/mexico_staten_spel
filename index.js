const currentMapState = initialMapState;

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
  document.getElementById("map-info__title").innerHTML = "Selecteer een staat";
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
  if (name === "Selecteer een staat") return;
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

// reload the ui for the resourcebank
function reloadResourceBank() {
  document.getElementById("bank__m-hout").innerHTML = bank["maya's"].hout;
  document.getElementById("bank__m-graan").innerHTML = bank["maya's"].graan;
  document.getElementById("bank__m-steen").innerHTML = bank["maya's"].steen;
  document.getElementById("bank__m-kippen").innerHTML = bank["maya's"].kippen;
  document.getElementById("bank__m-goud").innerHTML = bank["maya's"].goud;
  document.getElementById("bank__a-hout").innerHTML = bank["azteken"].hout;
  document.getElementById("bank__a-graan").innerHTML = bank["azteken"].graan;
  document.getElementById("bank__a-steen").innerHTML = bank["azteken"].steen;
  document.getElementById("bank__a-kippen").innerHTML = bank["azteken"].kippen;
  document.getElementById("bank__a-goud").innerHTML = bank["azteken"].goud;
}

// add one to a certain resource in the bank
function incrementResource(faction, resource) {
  bank[faction][resource] += 1;
  reloadResourceBank();
}

// remove one from a certain resource in the bank
function decrementResource(faction, resource) {
  if (bank[faction][resource] <= 0) return;
  bank[faction][resource] -= 1;
  reloadResourceBank();
}
