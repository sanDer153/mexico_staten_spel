function checkInitialMapState() {
  let stateCount = 0;
  for (const stateId in initialMapState) {
    stateCount++;
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
  if (stateCount != 32) {
    console.log(
      `ERROR: initialMapState has ${stateCount} states instead of 32.`
    );
    return;
  }
}

function checkPolTechtree() {
  const maxTechtreeLevel =
    Object.keys(polTechtree)[Object.keys(polTechtree).length - 1];
  for (let i = 0; i <= maxTechtreeLevel; i++) {
    if (typeof polTechtree[i] === "undefined") {
      console.log(`ERROR: level ${i} doesn't exist.`);
      return;
    }
    if (
      polTechtree[i].friendlyReferendumChance < 0 ||
      polTechtree[i].friendlyReferendumChance > 1 ||
      polTechtree[i].enemyReferendumModifier < 0 ||
      polTechtree[i].enemyReferendumModifier > 1
    ) {
      console.log(`ERROR: chances have to be between 0 and 1.`);
      return;
    }
  }
}

function runChecks() {
  checkInitialMapState();
  checkPolTechtree();
}

runChecks();
