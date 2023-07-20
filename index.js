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

// toggles the timer
// the timer counts down and when it hits 0, it fires the turn() function and restarts
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

// Fires when a state is clicked: set blue highlight and load map info module
function mapStateClickHandler(stateId) {
  if (referendumRunning) return;
  removeSelectedState();
  document.getElementById(stateId).classList.add("selected");
  loadMapInfoModule(stateId);
  clearReferendumModule();
}

// fires when the background of the map is clicked
function mapBGClickHandler() {
  if (referendumRunning) return;
  removeSelectedState();
  clearRightModule();
}

// Set the faction of a certain state and load static UI lake map and statecounters
function setFaction(stateId, faction) {
  // Faction === "maya's" or "azteken"
  if (faction !== "maya's" && faction !== "azteken") return;
  currentMapState[stateId].faction = faction;
  updateMapState(stateId, faction);
  reloadStatecounters();
}

// Fires when option in faction selector is clicked: update faction of that state
function factionSelectorClicked(faction) {
  if (referendumRunning) return;
  let name = document.getElementById("map-info__title").innerHTML;
  if (name === "Selecteer een staat") return;
  const stateId = name.replaceAll(" ", "-").toLowerCase();

  setFaction(stateId, faction);
  reloadRightModule(stateId);
}

// fires when a referendum is started
function startReferendum() {
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

  loadReferendumModule(stateId, mayaPerc, aztecPerc);
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

// fires when a level in the techtree is clicked
function techLevelClickHandler(faction, level) {
  if (referendumRunning) return;
  if (level >= 0 && level <= maxTechtreeLevel) {
    if (faction === "maya") mayaTechtreeLevel = level;
    if (faction === "aztec") aztecTechtreeLevel = level;
  }
  reloadTechtree();
}

// give resource to a faction for every state they posses
function distributeResources() {
  for (const stateId in currentMapState) {
    const faction = currentMapState[stateId].faction;
    const resource = currentMapState[stateId].resource;

    if (faction !== "none") bank[faction][resource] += 1;
  }
  reloadResourceBank();
}

// fires every turn
function turn() {
  distributeResources();
}

// fires when the file is loaded
function init() {
  updateWholeMap();
  reloadStatecounters();
  loadTechtreeHtml();
}

init();
