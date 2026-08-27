const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
];
const days = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"
];
const feiertage = [
    new Date(2026,0,1),
    new Date(2026,3,31),
    new Date(2026,4,1),
    new Date(2026,4,14),
    new Date(2026,4,25),
    new Date(2026,9,31 ),  
    new Date(2026,10,18),
    new Date(2026,11,25),
    new Date(2026,11,24),
    new Date(2026,7,6)//testfeiertag für august 
]
const _objectDatum = new Date();
const _objectXtag = new Date(_objectDatum.getFullYear(),0,1);
const _objectXjahr = new Date(_objectDatum.getFullYear(),11,31);
let monatAusgeschrieben = months[_objectDatum.getMonth()];
let tag = _objectDatum.getDate();
let jahr = _objectDatum.getFullYear();
let tagAusgeschrieben = days[_objectDatum.getDay()];
let monat = _objectDatum.getMonth();
monat = monat+1;

writeToHtml();

//funktion um automatisch die dynamischen inhalte in die html datei zu schreiben, die in der index.html datei mit id versehen sind



// Feiertage in array gespeichert , neues datum wird erstellt, um nur das Datum zu vergleichen, ohne Uhrzeit. Dann wird überprüft, 
// ob das heutige Datum in den 
// Feiertagen enthalten ist.
//  Wenn ja, wird "ein" angezeigt, sonst "kein".

const heute = new Date();
const heuteNorm = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate());
const istFeiertag = feiertage.some(datumFeiertag => datumFeiertag.getTime() === heuteNorm.getTime());
if (!istFeiertag) {
    document.getElementById("feiertag").innerHTML = "kein"; }
    else {
        document.getElementById("feiertag").innerHTML = "ein"; 
    }     
        
function writeToHtml() {
    document.title = "Heute ist der " + tag + "." + monat + "." + jahr;
    document.getElementById("mainHeadline").innerHTML = "Kalenderblatt vom " + tag + "." + monat + "." + jahr;
    document.getElementById("datumAusgeschrieben").innerHTML = tag + " " + monatAusgeschrieben + " " + jahr;
    document.getElementById("wochentag").innerHTML = tagAusgeschrieben;
    document.getElementById("wieviele").innerHTML = Math.floor((tag - 1) / 7) + 1 + ".";
    document.getElementById("wochentagAusgeschrieben").innerHTML = tagAusgeschrieben;
    const monatsnamen = document.getElementsByClassName("monatsname"); //vereinfachung in schleife wenn mehrere elemente mit der gleichen klasse vorhanden sind
    for (let i = 0; i < monatsnamen.length; i++) {
        monatsnamen[i].innerHTML = monatAusgeschrieben;
    }
    document.getElementById("jahreszahl").innerHTML = jahr;
    document.getElementById("xTag").innerHTML = (Math.floor((_objectDatum - _objectXtag) / (1000 * 60 * 60 * 24)) + 1);
    document.getElementById("xJahresende").innerHTML = (Math.round((_objectXjahr - _objectDatum) / (1000 * 60 * 60 * 24)));
    document.getElementById("monatstage").innerHTML = (new Date(jahr, monat, 0).getDate());
    // dynamische inhalte für html elemente mit id, die in der index.html datei vorhanden sind, werden hier geschrieben
    document.getElementById("ereignisseDatum").innerHTML = tag + "." + monat + "." + jahr;



}

    //funktion um die Tabelle zu erstellen
    function createCalendar() {
        const table = document.getElementById("kalenderDynamisch");
        const year = _objectDatum.getFullYear();
        const month = _objectDatum.getMonth();

        // Lösche bestehende Zeilen (außer der Header)
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        // Erstelle neue Zeilen für den Kalender
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
/*         sonntag = 0, montag = 1, dienstag = 2, mittwoch = 3, donnerstag = 4, freitag = 5, samstag = 6
        montag soll 0 werden, also muss 1 abgezogen werden, wenn der Wert 0 ist, soll er 6 sein --> bswp sonntag=0 +6 %7 = 6
         montag=1 +6 %7 =0 ...  */
        const adjustedStartingDayOfWeek = (startingDayOfWeek + 6) % 7;

        let currentRow = table.insertRow();
        let currentCell;

        // Füge leere Zellen für die Tage vor dem ersten Tag hinzu
        for (let i = 0; i < adjustedStartingDayOfWeek; i++) {
            currentCell = currentRow.insertCell();
            currentCell.innerHTML = "";
        }

        // Füge die Tage des Monats hinzu
        for (let day = 1; day <= daysInMonth; day++) {
            if (currentRow.cells.length === 7) {
                currentRow = table.insertRow();
            }
            currentCell = currentRow.insertCell();
            currentCell.innerHTML = day;
            if (day === _objectDatum.getDate()) {
                currentCell.style.backgroundColor = "yellow"; // markiere den aktuellen tag, kann auch als klasse in css ausgelagert werden, später
            }
            // Feiertage markieren
            const currentDate = new Date(year, month, day);
            const isHoliday = feiertage.some(datumFeiertag => datumFeiertag.getTime() === currentDate.getTime());
            if (isHoliday) {
                currentCell.style.backgroundColor = "red"; // markiere feiertage wird in css ausgelagert später
            }
        }
        // leere Zellen für die tage nach dem letzten tag hinzufügen
        while (currentRow.cells.length < 7) {
            currentCell = currentRow.insertCell();
            currentCell.innerHTML = "";
        }
    }

   
    createCalendar();

    //api anfrage für historische ereignisse am heutigen tag auf deutsch von wikipedia
    //api dokumentation bswp : https://de.wikipedia.org/api/rest_v1/#/Feed/onthisday/events/08/26
    fetch("https://de.wikipedia.org/api/rest_v1/feed/onthisday/events/" + (_objectDatum.getMonth() + 1) + "/" + _objectDatum.getDate())
        .then(response => response.json())
        .then(data => {
            const ereignisse = document.getElementById("ereignisse");
            if (!ereignisse) return;

            ereignisse.innerHTML = data.events //json daten hholen
                .map(event => `<li>${event.year}: ${event.text}</li>`)
                .join("");
        })
        .catch(error => console.error("Fehler beim Laden der historischen Ereignisse:", error)); //fehlerausgabe wenn api anfrage fehl schlägt bswp 400er für client fehler 
    
/*     //ausgabe von vier historischen ereignissen am heutigen tag, die in der api anfrage geladen wurden in der konsole
    fetch("https://de.wikipedia.org/api/rest_v1/feed/onthisday/events/" + (_objectDatum.getMonth() + 1) + "/" + _objectDatum.getDate())
        .then(response => response.json())
        .then(data => { 
            console.log("Historische Ereignisse:", data.events.slice(0, 4)); // ausgabe von vier ereignissen, slice schneidet die ersten vier heraus
        })
        .catch(error => console.error("Fehler beim Laden der historischen Ereignisse:", error)); */

        //ausgabe von vier historischen ereignissen am heutigen tag, die in der api anfrage geladen wurden in der liste 
        fetch("https://de.wikipedia.org/api/rest_v1/feed/onthisday/events/" + (_objectDatum.getMonth() + 1) + "/" + _objectDatum.getDate())
        .then(response => response.json())
        .then(data => {
            const ereignisseListe = document.getElementById("historischeEreignisse");
            if (!ereignisseListe) return;
            ereignisseListe.innerHTML = data.events.slice(0, 4)
                .map(event => `<li>${event.year}: ${event.text}</li>`) 
                .join("");
        })
        .catch(error => console.error("Fehler beim Laden der historischen Ereignisse:", error));
        //funktionalität für die buttons um den monat zu wechseln, die in der index.html datei vorhanden sind
        function vorherigerMonat() {
            _objectDatum.setMonth(_objectDatum.getMonth() - 1);  // monat aktualisieren und kalender neu laden
            createCalendar();
        }

        function naechsterMonat() {
            _objectDatum.setMonth(_objectDatum.getMonth() + 1); //monat aktualisieren und kalender neu laden 
            createCalendar();
        }

        //überlegung für klick auf eine zelle in der tabelle --> onclick auf jede zelle , oder eventlistener auf die tabelle,
        //  dann wird überprüft ob die zelle angeklickt wurde, wenn ja, wird das datum in der zelle ausgelesen 
        // und in der variable _objectDatum gespeichert, dann wird die funktion writeToHtml() 
        // aufgerufen um die dynamischen inhalte zu aktualisieren (historische ereignisse, datum,etc)
        document.addEventListener("DOMContentLoaded", function() {
            const table = document.getElementById("kalenderDynamisch");
            table.addEventListener("click", function(event) {
                const clickedCell = event.target;
                if (clickedCell.tagName === "TD" && clickedCell.innerHTML !== "") {
                    const clickedDay = parseInt(clickedCell.innerHTML);
                    _objectDatum.setDate(clickedDay);
                    writeToHtml(); // es werden nur einige elemente geändert, dies muss noch für alle geändert werden
                    createCalendar(); 
                }
            });
        });  
