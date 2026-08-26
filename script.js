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
    new Date(2026,11,24)
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

document.title = "Heute ist der " +tag+"."+monat +"."+jahr;
document.getElementById("mainHeadline").innerHTML = "Kalenderblatt vom "+tag+"."+monat +"."+jahr;
document.getElementById("datumAusgeschrieben").innerHTML = tag+ " "+monatAusgeschrieben+" "+jahr;
document.getElementById("wochentag").innerHTML = tagAusgeschrieben;
document.getElementById("wieviele").innerHTML = Math.floor((tag -1)/7)+1+".";
document.getElementById("wochentagAusgeschrieben").innerHTML = tagAusgeschrieben;
document.getElementById("monatsname").innerHTML = monatAusgeschrieben;
document.getElementById("jahreszahl").innerHTML = jahr;
document.getElementById("xTag").innerHTML = (Math.floor((_objectDatum-_objectXtag)/ (1000*60*60*24))+1);
document.getElementById("xJahresende").innerHTML=(Math.round((_objectXjahr-_objectDatum)/(1000*60*60*24)));
document.getElementById("monatsname2").innerHTML = monatAusgeschrieben;
document.getElementById("monatstage").innerHTML=(new Date(jahr,monat,0).getDate());
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
        //sonntag = 0, montag = 1, dienstag = 2, mittwoch = 3, donnerstag = 4, freitag = 5, samstag = 6
        //montag soll 0 werden, also muss 1 abgezogen werden, wenn der Wert 0 ist, soll er 6 sein
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
                currentCell.style.backgroundColor = "yellow"; // Markiere den aktuellen Tag, kann auch als klasse in css ausgelagert werden, später
            }
            // Feiertage markieren
            const currentDate = new Date(year, month, day);
            const isHoliday = feiertage.some(datumFeiertag => datumFeiertag.getTime() === currentDate.getTime());
            if (isHoliday) {
                currentCell.style.backgroundColor = "red"; // Markiere Feiertage wird in css ausgelagert später
            }
        }
        // leere Zellen für die Tage nach dem letzten Tag hinzufügen
        while (currentRow.cells.length < 7) {
            currentCell = currentRow.insertCell();
            currentCell.innerHTML = "";
        }
    }

    // Rufe die Funktion auf, um den Kalender zu erstellen
    createCalendar();
