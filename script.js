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
 

let _objectDatum = new Date();
let _objectXtag = new Date(_objectDatum.getFullYear(),0,1);
let _objectXjahr = new Date(_objectDatum.getFullYear(),11,31);
let monatAusgeschrieben = months[_objectDatum.getMonth()];
let tag = _objectDatum.getDate();
let jahr = _objectDatum.getFullYear();
let tagAusgeschrieben = days[_objectDatum.getDay()];
let monat = _objectDatum.getMonth();
monat = monat+1;
let heute = new Date();
let heuteNorm = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate());
//variablen für kalenderklick 
let tagKalender = new Date(_objectDatum.getDate());
let monatKalender = new Date(_objectDatum.getMonth());
let jahrKalender = new Date(_objectDatum.getFullYear());

       writeToHtml();
    createCalendar();
    historischeEreignise(); 

//dynamische inhalte zu aktuellen datum 
    function writeToHtml() {
        console.log("writeToHtml: " + tag + "." + monat + "." + jahr);
        console.log("Test");
        document.title = "Heute ist der " + tag + "." + monat + "." + jahr;
        document.getElementById("mainHeadline").innerHTML = "Kalenderblatt vom " + tag + "." + monat + "." + jahr;
        document.getElementById("infoZuDatum").innerHTML = `Der ${tag}.${monat}.${jahr} ist ein ${tagAusgeschrieben} und zwar 
        der ${Math.floor((tag - 1) / 7) + 1}. ${tagAusgeschrieben} im Monat ${monatAusgeschrieben} des Jahres ${jahr}. Es handelt sich um 
        den ${Math.floor((_objectDatum - _objectXtag) / (1000 * 60 * 60 * 24)) + 1}. Tag des Jahres, was bedeutet, dass es
        noch ${Math.round((_objectXjahr - _objectDatum) / (1000 * 60 * 60 * 24))} Tage bis zum Jahresende sind. Der Monat ${monatAusgeschrieben} hat 
        insgesamt ${new Date(jahr, monat, 0).getDate()} Tage. Heute ist `;
        const isHoliday = feiertage.some(datumFeiertag => datumFeiertag.getTime() === _objectDatum.getTime());  
        if (!isHoliday) {
            document.getElementById("infoZuDatum").innerHTML = document.getElementById("infoZuDatum").innerHTML + "kein gesetzlicher Feiertag in Deutschland.";
        } else {
            document.getElementById("infoZuDatum").innerHTML = document.getElementById("infoZuDatum").innerHTML + "ein gesetzlicher Feiertag in Deutschland.";
        }
        historischeEreignise();
    }

        function writeToHtml2(tag,monat,jahr) {
        console.log("writeToHtm2l: " + tag + "." + monat + "." + jahr);
        console.log("Test2");
        document.title = "Heute ist der " + tag + "." + monat + "." + jahr;
        document.getElementById("mainHeadline").innerHTML = "Kalenderblatt vom " + tag + "." + monat + "." + jahr;
        document.getElementById("infoZuDatum").innerHTML = `Der ${tag}.${monat}.${jahr} ist ein ${tagAusgeschrieben} und zwar 
        der ${Math.floor((tag - 1) / 7) + 1}. ${tagAusgeschrieben} im Monat ${monatAusgeschrieben} des Jahres ${jahr}. Es handelt sich um 
        den ${Math.floor((_objectDatum - _objectXtag) / (1000 * 60 * 60 * 24)) + 1}. Tag des Jahres, was bedeutet, dass es
        noch ${Math.round((_objectXjahr - _objectDatum) / (1000 * 60 * 60 * 24))} Tage bis zum Jahresende sind. Der Monat ${monatAusgeschrieben} hat 
        insgesamt ${new Date(jahr, monat, 0).getDate()} Tage. Heute ist `;
        const isHoliday = feiertage.some(datumFeiertag => datumFeiertag.getTime() === _objectDatum.getTime());  
        if (!isHoliday) {
            document.getElementById("infoZuDatum").innerHTML = document.getElementById("infoZuDatum").innerHTML + "kein gesetzlicher Feiertag in Deutschland.";
        } else {
            document.getElementById("infoZuDatum").innerHTML = document.getElementById("infoZuDatum").innerHTML + "ein gesetzlicher Feiertag in Deutschland.";
        }
        historischeEreignise();
    }

/*     function writeToHtml2(tagKalender, monatKalender, jahrKalender) {
        console.log("writeToHtml2: " + tagKalender.getDate() + "." + (monatKalender.getMonth() + 1) + "." + jahrKalender.getFullYear());
        document.title = "Heute ist der " + tagKalender.getDate() + "." + (monatKalender.getMonth() + 1) + "." + jahrKalender.getFullYear();
        document.getElementById("mainHeadline").innerHTML = "Kalenderblatt vom " + tagKalender.getDate() + "." + (monatKalender.getMonth() + 1) + "." + jahrKalender.getFullYear();
        document.getElementById("infoZuDatum").innerHTML = `Der ${tagKalender.getDate()}.${monatKalender.getMonth() + 1}.${jahrKalender.getFullYear()} ist 
        ein ${days[new Date(jahrKalender.getFullYear(), monatKalender.getMonth(), tagKalender.getDate()).getDay()]} und zwar 
        der ${Math.floor((tagKalender.getDate() - 1) / 7) + 1}. ${days[new Date(jahrKalender.getFullYear(), monatKalender.getMonth(), tagKalender.getDate()).getDay()]} im 
        Monat ${months[monatKalender.getMonth()]} des Jahres ${jahrKalender.getFullYear()}. Es handelt sich um 
        den ${Math.floor((new Date(jahrKalender.getFullYear(), monatKalender.getMonth(), tagKalender.getDate()) - new Date(jahrKalender.getFullYear(), 0, 1)) / (1000 *    60 * 60 * 24)) + 1}. Tag des Jahres,
         was bedeutet, dass es noch ${Math.round((new Date(jahrKalender.getFullYear(), 11, 31) - new Date(jahrKalender.getFullYear(), monatKalender.getMonth(), tagKalender.getDate())) / (1000 * 60 * 60 * 24))} Tage bis zum 
         Jahresende sind. Der Monat ${months[monatKalender.getMonth()]} hat insgesamt ${new Date(jahrKalender.getFullYear(), monatKalender.getMonth() + 1, 0).getDate()} Tage. Heute ist `;
        const isHoliday = feiertage.some(datumFeiertag => datumFeiertag.getTime() === new Date(jahrKalender.getFullYear(), monatKalender.getMonth(), tagKalender.getDate()).getTime());  
        if (!isHoliday) {
            document.getElementById("infoZuDatum").innerHTML = document.getElementById("infoZuDatum").innerHTML + "kein gesetzlicher Feiertag in Deutschland.";
        } else {
            document.getElementById("infoZuDatum").innerHTML = document.getElementById("infoZuDatum").innerHTML + "ein gesetzlicher Feiertag in Deutschland.";
        }       
    }       */



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

   
   

    function historischeEreignise()
{
    console.log(monatKalender.getMonth()+"/"+tagKalender.getDate())
            fetch("https://de.wikipedia.org/api/rest_v1/feed/onthisday/events/" + (monatKalender.getMonth() + 1) + "/" + tagKalender.getDate())
        .then(response => response.json())
        .then(data => {
            let ereignisseListe = document.getElementById("historischeEreignisse");
            if (!ereignisseListe) return;
            ereignisseListe.innerHTML = data.events.slice(0, 4)
                .map(event => `<li>${event.year}: ${event.text}</li>`) 
                .join("");
        })
        .catch(error => console.error("Fehler beim Laden der historischen Ereignisse:", error));
    //api anfrage für historische ereignisse am heutigen tag auf deutsch von wikipedia
    //api dokumentation bswp : https://de.wikipedia.org/api/rest_v1//Feed/onthisday/events/08/28


    fetch("https://de.wikipedia.org/api/rest_v1/feed/onthisday/events/" + (monatKalender.getMonth() + 1) + "/" + tagKalender.getDate())
        .then(response => response.json())
        .then(data => {
            let ereignisse = document.getElementById("ereignisse");
            if (!ereignisse) return;

            ereignisse.innerHTML = data.events //json daten hholen
                .map(event => `<li>${event.year}: ${event.text}</li>`)
                .join("");
        })
        .catch(error => console.error("Fehler beim Laden der historischen Ereignisse:", error)); //fehlerausgabe wenn api anfrage fehl schlägt bswp 400er für client fehler 
    


}


        //ausgabe von vier historischen ereignissen am heutigen tag, die in der api anfrage geladen wurden in der liste 

        //funktionalität für die buttons um den monat zu wechseln, die in der index.html datei vorhanden sind
        function vorherigerMonat() {
            _objectDatum.setMonth(_objectDatum.getMonth() - 1);  // monat aktualisieren und kalender neu laden
            createCalendar();
            if (_objectDatum.getMonth() < 0) { // jahr anpassen
                _objectDatum.setFullYear(_objectDatum.getFullYear() - 1);
                _objectDatum.setMonth(11); // Dezember
            }   
            writeToHtml2(_objectDatum.getDate(),_objectDatum.getMonth(), _objectDatum.getFullYear()); // neuschreiben der daten mit aktualisiertem datum
        }

        function naechsterMonat() {
            _objectDatum.setMonth(_objectDatum.getMonth() + 1); //monat aktualisieren und kalender neu laden 
            if (_objectDatum.getMonth() >= 12) {// jahr anpassen
                _objectDatum.setFullYear(_objectDatum.getFullYear() + 1);
                _objectDatum.setMonth(0); // Januar
            }
            createCalendar();
            writeToHtml2(_objectDatum.getDate(),_objectDatum.getMonth(), _objectDatum.getFullYear()); // neuschreiben der daten mit aktualisiertem datum
        }

        //überlegung für klick auf eine zelle in der tabelle --> onclick auf jede zelle , oder eventlistener auf die tabelle,
        //  dann wird überprüft ob die zelle angeklickt wurde, wenn ja, wird das datum in der zelle ausgelesen 
        // und in der variable _objectDatum gespeichert, dann wird die funktion writeToHtml() 
        // aufgerufen um die dynamischen inhalte zu aktualisieren (historische ereignisse, datum,etc)
        document.addEventListener("DOMContentLoaded", 
            function() {
                const table = document.getElementById("kalenderDynamisch");
                 table.addEventListener("click", function(event)
                  {
                const clickedCell = event.target;
                if (clickedCell.tagName === "TD" && clickedCell.innerHTML !== "") 
                    {
                    const clickedDay = parseInt(clickedCell.innerHTML);


                    _objectDatum.setDate(clickedDay);
                    console.log("Clicked day: " + _objectDatum.getDate());
                    tagKalender.setDate(clickedDay);
                    console.log("Clicked day: " + tagKalender.getDate());
                    monatKalender = _objectDatum.getMonth();
                    console.log("Clicked month: " + monatKalender);
                    jahrKalender = _objectDatum.getFullYear();
                    console.log("Clicked year: " + jahrKalender);
                    //herausfinden welches datum im kalender gerade ist

                    writeToHtml2(tagKalender.getDate(),monatKalender.getMonth(),jahrKalender.getFullYear()); 
                    // neuschreiben der daten mit aktualisiertem datum 
                    createCalendar(); 
                    }
                        });
                    });




