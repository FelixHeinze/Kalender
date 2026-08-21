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
    new Date(2026,11,26)
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


