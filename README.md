# Mexico Staten Spel

Een lokaal gehoste website die gemaakt is ter ondersteuning van een spel van Chiro Herenthout.

## Gebruik

Download de code in een ZIP-map via de groene knop rechtsboven en open het `index.html` bestand met Chrome.

In de module links in beeld bevinden zich de grondstoffenbank en de timer. De **grondstoffenbank** geeft weer hoeveel grondstoffen elke team heeft. Met de +/- knoppen kunnen de hoeveelheden aangepast worden. De teller voor de grondstoffen kan niet negatief worden. De **timer** start / stopt wanneer er op de blauwe knop eronder gedrukt wordt. In de config-file kan de tijd voor één ronde ingesteld worden. De timer telt dan telkens af tot 0 en begint terug opnieuw. Elke ronde worden grondstoffen verdeeld over de teams afhankelijk van de staten die ze in hun handen hebben. De twee grijze knoppen onderaan hebben te maken met het back-up systeem, hierover later meer.

De centrale module bevat een **interactieve kaart** van Mexico. Ze geeft met kleuren aan welke staten bezet zijn door welke factie. Door op een staat te klikken op de kaart, kan deze geselecteerd worden. Geselecteerde staten krijgen een blauwe kleur op de kaart en hun informatie wordt zichtbaar in de rechtse module. Door op de achtergrond van de kaart te klikken, wordt de selectie verwijderd.

rechtsboven in het scherm staat een teller die het **totaal aantal staten per factie** weergeeft. Deze wordt bij wijzigingen automatisch geupdate.

De rechtse module bevat de informatie over de geselecteerde staat en geeft ook de mogelijkheid om een referendum te starten in de geselecteerde staat. Bovenaan staat de **informatie over de geselecteerde staat**, namelijk: de naam van de staat, de factie waartoe de staat behoort en de grondstoffen die worden geproduceerd door deze staat. Daaronder staat een knop waarmee manueel de eigenaar van de staat aangepast kan worden. Met de blauwe knop kan een **referendum** in de geselecteerde staat georganiseerd worden voor overname van de andere factie. De succeskansen van het referendum hangen af van hoever beide facties in de politieke techtree staan. Na afloop van het referendum zal de staat automatisch van eigenaar wisselen indien nodig.

De module onderaan geeft de **politieke techtree** weer voor beide teams. Door op de vakjes te klikken kan een bepaald niveau in de techtree geactiveerd worden. Door links op het bolletje te drukken kan het niveau van de techtree weer op 0 worden gezet. De bonus die elk niveau met zich meebrengt in het referendum kan ingesteld worden in de config-file.

## Config-file

De config-file bevindt zich op het pad `./javascript/config.js`. In dit bestand kunnen een aantal instellingen van de applicatie aangepast worden. Aan `resources` en `factions` moet normaal niets aangepast worden. Ze geven enkel de geldige waarden van een grondstof of factie.

`timeBetweenTurns` geeft de tijd voor één ronde weer in milliseconden. De standaardwaarde is `300000` of 5 minuten.

`polTechtree` is de instelling voor de politieke techtree. Er kunnen extra niveau's toegevoegd worden door hetzelfde patroon voort te zetten. `text` kan vrij gekozen worden en dit wordt de tekst in het vakje. `friendlyReferendumChance` geeft de kans die de factie heeft op succes bij het overnemen van een staat die in handen is van de andere factie. `enemyReferendumModifier` geeft hoeveel er van de succeskans van de andere factie moet worden afgetrokken. Het werkt dus als een soort verdediging.

`initialMapState` geeft de start opstelling van de map. Per staat kan de `faction` en `resource` ingesteld worden. De factie is doorheen het spel nog aanpasbaar. De grondstof blijft voor het hele spel dezelfde.

## Back-up systeem

Er is een back-up systeem ingebouwd voor het geval het tabblad of de browser wordt afgesloten. Aangezien lokale websites enkel in RAM hun gegevens opslaan gaan deze dus normaal ook verloren bij het afsluiten van de site.
Elke ronde en elke keer de site op normale manier afgesloten wordt (dus niet door een crash), wordt de status van het spel weggeschreven naar de browseropslag. Door de 'Load back-up' knop in te drukken, wordt de laatst opgeslagen back-up ingeladen en kan het spel dus vanaf dan verder. 'Clear back-up' maakt de opslag terug leeg.
