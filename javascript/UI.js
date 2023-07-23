//functions that access the UI

//reload the UI for the statecounters
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

// reload the UI for the resourcebank
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

// Remove the blue highlight from the selected state
function removeSelectedState() {
  Array.from(document.getElementsByClassName("map-state")).forEach(
    (element) => {
      element.classList.remove("selected");
    }
  );
}

// Update the mapcolor of a certain state
function updateMapState(stateId, faction) {
  document.getElementById(stateId).classList.remove("maya");
  document.getElementById(stateId).classList.remove("aztec");
  if (faction === "maya's") {
    document.getElementById(stateId).classList.add("maya");
  } else if (faction === "azteken") {
    document.getElementById(stateId).classList.add("aztec");
  }
}

// update the statecolors of the whole map
function updateWholeMap() {
  for (const stateId in currentMapState) {
    updateMapState(stateId, currentMapState[stateId].faction);
  }
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

// clear the referendum module
function clearReferendumModule() {
  document.getElementById("referendum__meter-m").style = "";
  document.getElementById("referendum__meter-a").style = "";
  document.getElementById("referendum__meter-m").innerHTML = "";
  document.getElementById("referendum__meter-a").innerHTML = "";
  document.getElementById("referendum__winner-text").innerHTML = "";
}

function clearRightModule() {
  clearMapInfoModule();
  clearReferendumModule();
}

// Update de info in the map info module
function loadMapInfoModule(stateId) {
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

// load the UI for the referendum using a 5sec delay for the animation
async function loadReferendumModule(stateId, mayaPerc, aztecPerc) {
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
  loadMapInfoModule(stateId);

  referendumRunning = false;
}

// refresh the right module
function reloadRightModule(stateId) {
  clearRightModule();
  loadMapInfoModule(stateId);
}

// dynamically generate html for the technology tree
function loadTechtreeHtml() {
  ["m", "a"].forEach((factionId) => {
    let html = `<div class="origin techtree__active" id="techtree__${factionId}-0" onclick="techLevelClickHandler('${
      factionId === "m" ? "maya" : "aztec"
    }', 0);"></div>`;
    for (const level in polTechtree) {
      if (level !== "0") {
        html += `<div class="line"></div>`;
        html += `<div class="techtree__level" id="techtree__${factionId}-${level}" onclick="techLevelClickHandler('${
          factionId === "m" ? "maya" : "aztec"
        }', ${level});">${polTechtree[level].text}</div>`;
      }
    }
    document.getElementById(`techtree-${factionId}`).innerHTML = html;
  });
}

// remove the active classes from the techtree
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

// load classes in techtree
function loadTechtreeUI() {
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

function reloadTechtree() {
  removeActiveTechtreeUI();
  loadTechtreeUI();
}
