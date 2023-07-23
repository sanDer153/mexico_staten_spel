function checkInitialMapState() {
  for (const stateId in initialMapState) {
    if (!resources.includes(initialMapState[stateId].resource)) {
      console.log(
        `ERROR: ${stateId} has an unknown resource '${initialMapState[stateId].resource}' assigned.`
      );
      return;
    }
    if (!factions.includes(initialMapState[stateId].faction)) {
      console.log(
        `ERROR: ${stateId} has an unknown faction '${initialMapState[stateId].faction}' assigned.`
      );
      return;
    }
  }
}

function runChecks() {
  checkInitialMapState();
}

runChecks();
