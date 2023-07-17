function checkInitialMapState() {
  for (const state in initialMapState) {
    if (!resources.includes(initialMapState[state].resource)) {
      console.log(
        `ERROR: ${state} has an unknown resource '${initialMapState[state].resource}' assigned.`
      );
      return;
    }
    if (!factions.includes(initialMapState[state].faction)) {
      console.log(
        `ERROR: ${state} has an unknown faction '${initialMapState[state].faction}' assigned.`
      );
      return;
    }
  }
}

function runChecks() {
  checkInitialMapState();
}

runChecks();
