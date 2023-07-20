const currentMapState = initialMapState;

let mayaStatecount = 0;
let aztecStatecount = 0;

let timerRunning = false;
let timerStart;

const maxTechtreeLevel =
  Object.keys(polTechtree)[Object.keys(polTechtree).length - 1];
let mayaTechtreeLevel = 0;
let aztecTechtreeLevel = 0;

let referendumRunning = false;

const bank = {
  "maya's": {
    gras: 0,
    hout: 0,
    geiten: 0,
    goud: 0,
  },
  azteken: {
    gras: 0,
    hout: 0,
    geiten: 0,
    goud: 0,
  },
};

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
  reloadStatecounters();
}

// Remove the blue highlight from the selected state and clear map info module
function removeSelectedState() {
  Array.from(document.getElementsByClassName("map-state")).forEach(
    (element) => {
      element.classList.remove("selected");
    }
  );
  clearRightModule();
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

function clearRightModule() {
  clearMapInfoModule();
  clearReferendumModule();
}

// Fires when a state is clicked: set blue highlight and load map info module
function stateClicked(stateId) {
  if (referendumRunning) return;
  removeSelectedState();
  document.getElementById(stateId).classList.add("selected");
  updateMapInfoModule(stateId);
  clearReferendumModule();
}

// Fires when option in faction selector is clicked: update faction of that state
function factionSelectorClicked(faction) {
  if (referendumRunning) return;
  let name = document.getElementById("map-info__title").innerHTML;
  if (name === "Selecteer een staat") return;
  const id = name.replaceAll(" ", "-").toLowerCase();

  currentMapState[id].faction = faction;
  updateMap(id, faction);
  clearMapInfoModule();
  updateMapInfoModule(id);
  reloadStatecounters();
  clearReferendumModule();
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
  document.getElementById("bank__m-gras").innerHTML = bank["maya's"].gras;
  document.getElementById("bank__m-hout").innerHTML = bank["maya's"].hout;
  document.getElementById("bank__m-geiten").innerHTML = bank["maya's"].geiten;
  document.getElementById("bank__m-goud").innerHTML = bank["maya's"].goud;
  document.getElementById("bank__a-gras").innerHTML = bank["azteken"].gras;
  document.getElementById("bank__a-hout").innerHTML = bank["azteken"].hout;
  document.getElementById("bank__a-geiten").innerHTML = bank["azteken"].geiten;
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

function toggleTimer() {
  if (timerRunning) {
    timerRunning = false;
    document.getElementById("timer__toggle-btn").innerHTML = "Start";
  } else {
    timerRunning = true;
    timerStart = new Date().getTime();
    document.getElementById("timer__toggle-btn").innerHTML = "Stop";

    let timer = setInterval(function () {
      let now = new Date().getTime();
      let distance = now - timerStart;
      if (distance >= timeBetweenTurns) {
        timerStart = now;
        distance = 0;
        turn();
      }
      let timeToNextTurn = timeBetweenTurns - distance;

      let minutes = Math.floor(timeToNextTurn / (1000 * 60));
      let seconds = Math.floor((timeToNextTurn % (1000 * 60)) / 1000);

      formattedSeconds = ("0" + seconds).slice(-2); //Puts 0 in front if seconds is 1 digit

      document.getElementById(
        "timer"
      ).innerHTML = `${minutes}:${formattedSeconds}`;

      if (!timerRunning) {
        clearInterval(timer);
      }
    }, 500);
  }
}

function turn() {
  distributeResources();
}

function distributeResources() {
  for (const stateId in currentMapState) {
    const faction = currentMapState[stateId].faction;
    const resource = currentMapState[stateId].resource;

    if (faction !== "none") bank[faction][resource] += 1;
  }
  reloadResourceBank();
}

function reloadStatecounters() {
  mayaStatecount = 0;
  aztecStatecount = 0;
  for (const stateId in currentMapState) {
    const faction = currentMapState[stateId].faction;
    if (faction === "maya's") mayaStatecount += 1;
    if (faction === "azteken") aztecStatecount += 1;
  }

  document.getElementById("m-statecount").innerHTML = `${mayaStatecount}`;
  document.getElementById("a-statecount").innerHTML = `${aztecStatecount}`;
}

function setTechLevel(faction, level) {
  if (referendumRunning) return;
  if (level >= 0 && level <= maxTechtreeLevel) {
    if (faction === "maya") mayaTechtreeLevel = level;
    if (faction === "aztec") aztecTechtreeLevel = level;
  }
  updateTechtreeUI();
}

function loadTechtreeHtml() {
  ["m", "a"].forEach((factionId) => {
    let html = `<div class="origin techtree__active" id="techtree__${factionId}-0" onclick="setTechLevel('${
      factionId === "m" ? "maya" : "aztec"
    }', 0);"></div>`;
    for (const level in polTechtree) {
      if (level !== "0") {
        html += `<div class="line"></div>`;
        html += `<div class="techtree__level" id="techtree__${factionId}-${level}" onclick="setTechLevel('${
          factionId === "m" ? "maya" : "aztec"
        }', ${level});">${polTechtree[level].text}</div>`;
      }
    }
    document.getElementById(`techtree-${factionId}`).innerHTML = html;
  });
}

function removeActiveTechtreeUI() {
  let level = 0;
  while (level <= maxTechtreeLevel) {
    document
      .getElementById(`techtree__m-${level}`)
      .classList.remove("techtree__active");
    document
      .getElementById(`techtree__a-${level}`)
      .classList.remove("techtree__active");
    level += 1;
  }
}

function updateTechtreeUI() {
  removeActiveTechtreeUI();

  let level = 0;
  while (level <= mayaTechtreeLevel) {
    document
      .getElementById(`techtree__m-${level}`)
      .classList.add("techtree__active");
    level += 1;
  }
  level = 0;
  while (level <= aztecTechtreeLevel) {
    document
      .getElementById(`techtree__a-${level}`)
      .classList.add("techtree__active");
    level += 1;
  }
}

async function startReferendum() {
  if (referendumRunning) return;
  let name = document.getElementById("map-info__title").innerHTML;
  if (name === "Selecteer een staat") return;
  const stateId = name.replaceAll(" ", "-").toLowerCase();
  if (currentMapState[stateId].faction === "none") return;

  referendumRunning = true;
  clearReferendumModule();

  let mayaPerc;
  let aztecPerc;
  const perc = getReferendumPercentages(stateId);
  if (currentMapState[stateId].faction === "maya's") {
    mayaPerc = 100 - perc;
    aztecPerc = perc;
  } else if (currentMapState[stateId].faction === "azteken") {
    mayaPerc = perc;
    aztecPerc = 100 - perc;
  }

  document.getElementById("referendum__meter-m").style = `width: ${mayaPerc}%;`;
  document.getElementById(
    "referendum__meter-a"
  ).style = `width: ${aztecPerc}%;`;
  await sleep(5000);
  document.getElementById("referendum__meter-m").innerHTML = `${mayaPerc}%`;
  document.getElementById("referendum__meter-a").innerHTML = `${aztecPerc}%`;

  if (mayaPerc > aztecPerc) {
    document.getElementById(
      "referendum__winner-text"
    ).innerHTML = `De winnaar is: <span style="color: #498c01; font-weight: 600">Maya's</span>`;
    setFaction(stateId, "maya's");
  } else {
    document.getElementById(
      "referendum__winner-text"
    ).innerHTML = `De winnaar is: <span style="color: #d66209; font-weight: 600">Azteken</span>`;
    setFaction(stateId, "azteken");
  }
  clearMapInfoModule();
  updateMapInfoModule(stateId);

  referendumRunning = false;
}

function getReferendumPercentages(stateId) {
  let takeOverSuccesChance = 0;
  if (currentMapState[stateId].faction === "maya's") {
    takeOverSuccesChance =
      polTechtree[aztecTechtreeLevel].friendlyReferendumChance;
    takeOverSuccesChance -=
      polTechtree[mayaTechtreeLevel].enemyReferendumModifier;
    takeOverSuccesChance = Math.max(0, takeOverSuccesChance);
  } else if (currentMapState[stateId].faction === "azteken") {
    takeOverSuccesChance =
      polTechtree[mayaTechtreeLevel].friendlyReferendumChance;
    takeOverSuccesChance -=
      polTechtree[aztecTechtreeLevel].enemyReferendumModifier;
    takeOverSuccesChance = Math.max(0, takeOverSuccesChance);
  }

  if (Math.random() < takeOverSuccesChance) {
    //win
    return Math.floor((Math.random() / 3 + 0.55) * 100);
  } else {
    //loss
    return Math.floor((Math.random() / 3 + 0.1) * 100);
  }
}

function clearReferendumModule() {
  document.getElementById("referendum__meter-m").style = "";
  document.getElementById("referendum__meter-a").style = "";
  document.getElementById("referendum__meter-m").innerHTML = "";
  document.getElementById("referendum__meter-a").innerHTML = "";
  document.getElementById("referendum__winner-text").innerHTML = "";
}

function updateWholeMap() {
  for (const stateId in currentMapState) {
    updateMap(stateId, currentMapState[stateId].faction);
  }
}

function init() {
  updateWholeMap();
  reloadStatecounters();
  loadTechtreeHtml();
}

init();
