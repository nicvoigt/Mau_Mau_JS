
// es wird anscheinend immer wieder das kartendeck der spieler neu gefüllt.
// wieso ist das so?



function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


class Karte{
    constructor(farbe, symbol) {
        this.farbe = farbe;
        this.symbol = symbol;
    }
    infos() {
        console.log("Dies ist: " + this.farbe + " " + this.symbol);
    }
}

var karte = new Karte("Pik", "7")
const farben = ["Herz", "Karo", "Pik", "Kreuz"]
const symbole = ["7", "8", "9", "10", "Bube", "Dame", "König", "Ass"]

class Nachziehstapel{
    constructor() {
        this.karten = [];
        for (let farbe = 0; farbe < 4; farbe++) {
            for (let symbol = 0; symbol < 8; symbol++) {
                this.karten.push(new Karte(farben[farbe] ,symbole[symbol])) ;
            } 
            // this.karten[farbe] = farbe ;
        } 

    }
}

class Spieler{
    constructor(no_cards_p_player) {
        this.spielerkarten = [];
        this.farben = [];
        this.symbole = [];
        this.spielerkarten_text = [];
        this.kann_legen = false;
        this.no_cards_p_player = no_cards_p_player;


    }

    spielerkarten_analysieren (karte_auf_ablagtestapel) {

        for (let karte=0; karte<this.spielerkarten.length; karte++) {
            this.farben.push(this.spielerkarten[karte].farbe);
            this.symbole.push(this.spielerkarten[karte].symbol);
        }
        if (this.farben.includes(karte_auf_ablagtestapel.farbe)) {
            this.kann_legen = true;
        } if (this.symbole.includes(karte_auf_ablagtestapel.symbol)) {
            this.kann_legen = true;
        }

    }

    get_spielerkarten_text () {
        for (let karte=0; karte<this.spielerkarten.length; karte++) {
            let text = this.spielerkarten[karte].farbe + " " + this.spielerkarten[karte].symbol;
            this.spielerkarten_text.push(text);

        }
    }

    karten_anzeigen(karte_auf_ablagtestapel) {
        console.log(" karten_legen gestartet");
        this.spielerkarten_analysieren(karte_auf_ablagtestapel);
        this.get_spielerkarten_text();
        if (this.kann_legen === true) {
            console.log("spieler kann legen");
            
            // alle Felder füllen, bis zur länge der Spielerkarten
            for (let karte=0; karte<this.spielerkarten.length; karte++){
                let outputstring = this.spielerkarten[karte].farbe + " " + this.spielerkarten[karte].symbol;
                document.getElementById("karte" + String(karte +1)).innerHTML = outputstring; 
            }
            
            // alle Felder fülllen, die eigentlich leer sein müssten
            for (let karte=0; karte<this.spielerkarten.length; karte++){
                let outputstring = this.spielerkarten[karte].farbe + " " + this.spielerkarten[karte].symbol;
                document.getElementById("karte" + String(karte +1)).innerHTML = outputstring; 
            }

            console.log(this.spielerkarten);
        }


    }
}



class Spiel{
    constructor(no_spieler, nz_stapel) {
        this.no_spieler = no_spieler;
        this.nz_stapel = nz_stapel.karten;
        this.ablagestapel = [];
        this.max_no_spieler = 4;
        this.no_cards_p_player = 5;
        this.spieler = {};
        this.spieler_am_zug = null;
        for (let spieler = 0; spieler < no_spieler; spieler++) {
            this.spieler[spieler] = new Spieler(this.no_cards_p_player);
        } 
    };
    // Hier weitermachen!!!
    anfangskarten_ziehen() {
        // für jeden spieler im game

        for (let spieler = 0; spieler < this.no_spieler; spieler++){        
        // jeweils x karten ziehen
                for (let kartennummer = 0; kartennummer < this.no_cards_p_player; kartennummer++){
                // random eine karte auswählen:
                const ran_number = Math.floor(Math.random() * this.nz_stapel.length);
                console.log(karte);
                //dieses element aus dem Nachziehstapel des spiels ziehen den karten des spielers hinzufügen
                console.log(this.nz_stapel[ran_number]);
                this.spieler[spieler].spielerkarten.push(this.nz_stapel[ran_number]);
                // löschen des Elements aus dem array
                this.nz_stapel.splice(ran_number, 1)}};
    }

    spiel_starten() {
        // Hier den Ablauf des Spiels definieren
        console.log("Eigentlich gestartet");
        this.spieler_am_zug = 0;
        
        // erste karte auf dem ablagestapel definieren:
        const ran_number = Math.floor(Math.random() * this.nz_stapel.length)

        this.ablagestapel.push(this.nz_stapel[ran_number])
        // löschen des Elements aus dem array
        this.nz_stapel.splice(ran_number, 1)
    }

    check_if_nzs_leer() {
        if (this.nz_stapel.length === 0) {

        }
    }

    ablagestapel_mischen () {
        this.nz_stapel = shuffle(this.ablagestapel);
        this.ablagestapel = [];
    }

    gesamtspiel () {
    }

    spielzug(karte_auf_ablagtestapel) {
        this.spieler[this.spieler_am_zug].karten_anzeigen(karte_auf_ablagtestapel);

    }
}

var nzs1 = new Nachziehstapel();
var spiel1 = new Spiel(3,nzs1);
spiel1.anfangskarten_ziehen();


spiel1.spiel_starten();
function myFunction() {
    document.getElementById("akt_spieler").innerHTML = String(spiel1.spieler_am_zug)
    document.getElementById("ablagestapel").innerHTML = spiel1.ablagestapel[0].farbe + " " + spiel1.ablagestapel[0].symbol;
    let karte_auf_ablagtestapel = spiel1.ablagestapel[0];
    spiel1.spielzug(karte_auf_ablagtestapel);
}

function karte_ablegen(event) {
    var target = event.target || event.srcElement;
    console.log(target);
    let karten_text = target.innerHTML;
    var idx = spiel1.spieler[spiel1.spieler_am_zug].spielerkarten_text.indexOf(karten_text);
    let gespielte_karte = spiel1.spieler[spiel1.spieler_am_zug].spielerkarten[idx]
    // karte auf den ablagestapel legen
    spiel1.ablagestapel.unshift(gespielte_karte);
    // karte aus der hand des spieler löschen
    spiel1.spieler[spiel1.spieler_am_zug].spielerkarten.splice(idx,1);
    spiel1.spieler[spiel1.spieler_am_zug].spielerkarten_text.splice(idx,1);
    spiel1.spieler[spiel1.spieler_am_zug].farben.splice(idx,1);
    spiel1.spieler[spiel1.spieler_am_zug].symbole.splice(idx,1);
    spiel1.spieler[spiel1.spieler_am_zug].kann_legen = false;

    alert("Karte gespielt!");
    spiel1.spieler_am_zug +=1;
    if (spiel1.spieler_am_zug % 3 === 0) {
        spiel1.spieler_am_zug = 0;
    }
    document.getElementById("button_start_spiel").innerHTML = "Nächster Zug";
    document.getElementById("ablagestapel").innerHTML = spiel1.ablagestapel[0].farbe + " " + spiel1.ablagestapel[0].symbol;
    console.log(spiel1.spieler[0].spielerkarten);
}


function display_spieler_karten() {
    console.log("FUnktion aufgerufen");
    let parent = document.getElementById("akt_spieler_karten");
    let table = document.createElement("table");
    parent.appendChild(table);
    table.setAttribute("id", "test2");
    
    for (karte=0; karte<spiel1.spieler[spiel1.spieler_am_zug].spielerkarten.length; karte++) {
        let td = document.createElement("td");
        td.setAttribute("id", "SKarte" + String(karte));
        let text = document.createTextNode(spiel1.spieler[spiel1.spieler_am_zug].spielerkarten_text[karte]);
        td.appendChild(text);
        console.log(td.id);
        table.appendChild(td);
        document.getElementById("SKarte" + String(karte)).addEventListener("click", karte_ablegen_loeschen)
    }

var karte_ablegen_loeschen = function() {
    
}






}