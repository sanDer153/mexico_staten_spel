const resources = ["hout", "graan", "steen", "kippen", "goud"];
const factions = ["none", "maya's", "azteken"];

// time in millis --> 5min = 300000
const timeBetweenTurns = 10000;

// Config voor politieke technologie boom
// 0 : Standaard niveau bij het begin al geactiveerd
// text: tekst zichtbaar in de boom
// friendlyReferendumChance: de kans op referendum succes
// enemyReferendumModifier: wordt afgetrokken van de succeskans van het andere team
const polTechtree = {
  0: {
    text: "",
    friendlyReferendumChance: 0.1,
    enemyReferendumModifier: 0,
  },
  1: {
    text: "Niveau 1",
    friendlyReferendumChance: 0.15,
    enemyReferendumModifier: 0.025,
  },
  2: {
    text: "Niveau 2",
    friendlyReferendumChance: 0.25,
    enemyReferendumModifier: 0.05,
  },
  3: {
    text: "Niveau 3",
    friendlyReferendumChance: 0.35,
    enemyReferendumModifier: 0.1,
  },
  3: {
    text: "Niveau 3",
    friendlyReferendumChance: 0.4,
    enemyReferendumModifier: 0.15,
  },
  4: {
    text: "Niveau 4",
    friendlyReferendumChance: 0.45,
    enemyReferendumModifier: 0.2,
  },
  5: {
    text: "Niveau 5",
    friendlyReferendumChance: 0.5,
    enemyReferendumModifier: 0.25,
  },
};

const initialMapState = {
  "baja-california": {
    name: "Baja California",
    faction: "none",
    resource: "hout",
  },
  "baja-california-sur": {
    name: "Baja California Sur",
    faction: "none",
    resource: "graan",
  },
  coahuila: {
    name: "Coahuila",
    faction: "none",
    resource: "steen",
  },
  chihuahua: {
    name: "Chihuahua",
    faction: "none",
    resource: "kippen",
  },
  durango: {
    name: "Durango",
    faction: "none",
    resource: "goud",
  },
  sinaloa: {
    name: "Sinaloa",
    faction: "none",
    resource: "hout",
  },
  sonora: {
    name: "Sonora",
    faction: "none",
    resource: "graan",
  },
  zacatecas: {
    name: "Zacatecas",
    faction: "none",
    resource: "steen",
  },
  "nuevo-león": {
    name: "Nuevo León",
    faction: "none",
    resource: "kippen",
  },
  "san-luis-potosí": {
    name: "San Luis Potosí",
    faction: "none",
    resource: "goud",
  },
  tamaulipas: {
    name: "Tamaulipas",
    faction: "none",
    resource: "hout",
  },
  aguascalientes: {
    name: "Aguascalientes",
    faction: "none",
    resource: "graan",
  },
  colima: {
    name: "Colima",
    faction: "none",
    resource: "steen",
  },
  jalisco: {
    name: "Jalisco",
    faction: "none",
    resource: "kippen",
  },
  michoacán: {
    name: "Michoacán",
    faction: "none",
    resource: "goud",
  },
  nayarit: {
    name: "Nayarit",
    faction: "none",
    resource: "hout",
  },
  campeche: {
    name: "Campeche",
    faction: "none",
    resource: "graan",
  },
  oaxaca: {
    name: "Oaxaca",
    faction: "none",
    resource: "steen",
  },
  puebla: {
    name: "Puebla",
    faction: "none",
    resource: "kippen",
  },
  tabasco: {
    name: "Tabasco",
    faction: "none",
    resource: "goud",
  },
  tlaxcala: {
    name: "Tlaxcala",
    faction: "none",
    resource: "hout",
  },
  "distrito-federal": {
    name: "Distrito Federal",
    faction: "none",
    resource: "graan",
  },
  guanajuato: {
    name: "Guanajuato",
    faction: "none",
    resource: "steen",
  },
  guerrero: {
    name: "Guerrero",
    faction: "none",
    resource: "kippen",
  },
  hidalgo: {
    name: "Hidalgo",
    faction: "none",
    resource: "goud",
  },
  méxico: {
    name: "México",
    faction: "none",
    resource: "hout",
  },
  morelos: {
    name: "Morelos",
    faction: "none",
    resource: "graan",
  },
  querétaro: {
    name: "Querétaro",
    faction: "none",
    resource: "steen",
  },
  veracruz: {
    name: "Veracruz",
    faction: "none",
    resource: "kippen",
  },
  chiapas: {
    name: "Chiapas",
    faction: "none",
    resource: "goud",
  },
  "quintana-roo": {
    name: "Quintana Roo",
    faction: "none",
    resource: "hout",
  },
  yucatán: {
    name: "Yucatán",
    faction: "none",
    resource: "graan",
  },
};
