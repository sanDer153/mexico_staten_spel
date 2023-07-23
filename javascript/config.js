const resources = ["gras", "hout", "geiten", "goud"];
const factions = ["none", "maya's", "azteken"];

// time in millis --> 5min = 300000
const timeBetweenTurns = 300000;

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
    faction: "azteken",
    resource: "goud",
  },
  "baja-california-sur": {
    name: "Baja California Sur",
    faction: "maya's",
    resource: "geiten",
  },
  coahuila: {
    name: "Coahuila",
    faction: "maya's",
    resource: "gras",
  },
  chihuahua: {
    name: "Chihuahua",
    faction: "azteken",
    resource: "hout",
  },
  durango: {
    name: "Durango",
    faction: "azteken",
    resource: "gras",
  },
  sinaloa: {
    name: "Sinaloa",
    faction: "azteken",
    resource: "hout",
  },
  sonora: {
    name: "Sonora",
    faction: "maya's",
    resource: "gras",
  },
  zacatecas: {
    name: "Zacatecas",
    faction: "maya's",
    resource: "goud",
  },
  "nuevo-león": {
    name: "Nuevo León",
    faction: "maya's",
    resource: "geiten",
  },
  "san-luis-potosí": {
    name: "San Luis Potosí",
    faction: "azteken",
    resource: "geiten",
  },
  tamaulipas: {
    name: "Tamaulipas",
    faction: "maya's",
    resource: "hout",
  },
  aguascalientes: {
    name: "Aguascalientes",
    faction: "azteken",
    resource: "gras",
  },
  colima: {
    name: "Colima",
    faction: "azteken",
    resource: "gras",
  },
  jalisco: {
    name: "Jalisco",
    faction: "maya's",
    resource: "hout",
  },
  michoacán: {
    name: "Michoacán",
    faction: "maya's",
    resource: "geiten",
  },
  nayarit: {
    name: "Nayarit",
    faction: "azteken",
    resource: "geiten",
  },
  campeche: {
    name: "Campeche",
    faction: "azteken",
    resource: "geiten",
  },
  oaxaca: {
    name: "Oaxaca",
    faction: "maya's",
    resource: "gras",
  },
  puebla: {
    name: "Puebla",
    faction: "azteken",
    resource: "geiten",
  },
  tabasco: {
    name: "Tabasco",
    faction: "maya's",
    resource: "hout",
  },
  tlaxcala: {
    name: "Tlaxcala",
    faction: "maya's",
    resource: "hout",
  },
  "distrito-federal": {
    name: "Distrito Federal",
    faction: "azteken",
    resource: "hout",
  },
  guanajuato: {
    name: "Guanajuato",
    faction: "maya's",
    resource: "gras",
  },
  guerrero: {
    name: "Guerrero",
    faction: "azteken",
    resource: "gras",
  },
  hidalgo: {
    name: "Hidalgo",
    faction: "azteken",
    resource: "goud",
  },
  méxico: {
    name: "México",
    faction: "azteken",
    resource: "hout",
  },
  morelos: {
    name: "Morelos",
    faction: "maya's",
    resource: "gras",
  },
  querétaro: {
    name: "Querétaro",
    faction: "maya's",
    resource: "hout",
  },
  veracruz: {
    name: "Veracruz",
    faction: "maya's",
    resource: "geiten",
  },
  chiapas: {
    name: "Chiapas",
    faction: "azteken",
    resource: "hout",
  },
  "quintana-roo": {
    name: "Quintana Roo",
    faction: "maya's",
    resource: "goud",
  },
  yucatán: {
    name: "Yucatán",
    faction: "azteken",
    resource: "gras",
  },
};
