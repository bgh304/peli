let vuoroL = 0;
let vuoroOO = false; //Vuoro on/off.
//let keraaV = true;


function sivulle(teksti) {
    document.getElementById("tekstit").innerHTML += teksti + "<br>";
}

function tyhjenna() {
    document.getElementById("tekstit").innerHTML = "";
}



// ------------------------------------------------------- T I L A N N E
// -------------------------------------------------------

function tilanne() {
    if ((pelaaja.itemOO == true) && ((vuoroL - pelaaja.kIvuoro) == 2)) {
        pelaaja.iKesto(pelaaja.iKaytossa);
    }
    
    if ((tietokone.hp <= 30) && (tietokone.hp > 1)) {
        tietokone.toiminto = 1;
        vuoroOO = false;
    } else {
        tietokone.toiminto = 0;
        vuoroOO = false;
    }

    if (tietokone.keraaVOO == false && ((tietokone.hp >= 90) && (tietokone.hp <= 100)) ||
        tietokone.keraaVOO == false && ((tietokone.hp >= 70) && (tietokone.hp <= 80))) {
        tietokone.toiminto = 3;
        vuoroOO = false;
    }

    if (pelaaja.hp < 1) {
        document.getElementById("pelaaja").innerHTML = "<b>PELAAJA hävisi.</b>";
        document.getElementById("tietokone").innerHTML = "<b>TIETOKONE voitti.</b>";
        document.getElementById("napit").innerHTML = "";
        vuoroOO = false;
    }

    if (tietokone.hp < 1) {
        document.getElementById("pelaaja").innerHTML = "<b>PELAAJA voitti.</b>";
        document.getElementById("tietokone").innerHTML = "<b>TIETOKONE hävisi.</b>";
        document.getElementById("napit").innerHTML = "";
        vuoroOO = false;
    }

    if ((vuoroL - tietokone.laskuriKV) == 3) {
        tietokone.keraaVOO = false;
        tietokone.attack = 7;
        sivulle("Tietokoneen voimat palasivat takaisin.");
        tietokone.statit();
    }
}



// ----------------------------------------------------------- V U O R O
// -----------------------------------------------------------

let pLaskuri = 0;
let pLaskuriOO = false;

function vuoro() {
    // Toiminnot: 0: hyÃ¶kkÃ¤Ã¤, 1: puolusta, 3: kerÃ¤Ã¤ voimia, 4: item
    vuoroL++;
    sivulle("<u>Vuoro " + vuoroL + "</u><br>");
    if (pLaskuriOO == true) {
        pLaskuri++;
    }
    
    if ((vuoroL % 3) == 0) {
        buusti(pelaaja);
    }

    if (pLaskuri == 4) {
        pelaaja.keraaV("off");
        pLaskuri = 0;
        sivulle("Pelaajan voimat palasivat takaisin.");
        pelaaja.statit();
    }

    if (vuoroOO == true && (pelaaja.toiminto == 0) && (tietokone.toiminto == 0)) {
    if (pelaaja.agility > tietokone.agility) {
    pelaaja.hyokkaa();
            tietokone.hyokkaa();
            tilanne();
    } else {
    tietokone.hyokkaa();
            pelaaja.hyokkaa();
            tilanne();
    }
    }

    if (vuoroOO == true && (pelaaja.toiminto == 1) && (tietokone.toiminto == 1)) {
    pelaaja.puolusta();
            tietokone.puolusta();
            tilanne();
    }

    if (vuoroOO == true && (pelaaja.toiminto == 1) && (tietokone.toiminto == 0)) {
    pelaaja.puolusta();
            tietokone.hyokkaa();
            tilanne();
    }

    if (vuoroOO == true && (pelaaja.toiminto == 0) && (tietokone.toiminto == 1)) {
    tietokone.puolusta();
            pelaaja.hyokkaa();
            tilanne();
    }

    //KerÃ¤Ã¤ voimia
    if (vuoroOO == true && (pelaaja.toiminto == 3) && (tietokone.toiminto == 0)) {
    tietokone.hyokkaa();
            pelaaja.keraaV("on");
            tilanne();
    }

    if (vuoroOO == true && (pelaaja.toiminto == 3) && (tietokone.toiminto == 1)) {
    pelaaja.keraaV("on");
            tietokone.puolusta();
            tilanne();
    }

    if (vuoroOO == true && (pelaaja.toiminto == 3) && (tietokone.toiminto == 3)) {
    pelaaja.keraaV("on");
            tietokone.keraaV();
            tilanne();
    }

    if (vuoroOO == true && (pelaaja.toiminto == 0) && (tietokone.toiminto == 3)) {
    pelaaja.hyokkaa();
            tietokone.keraaV();
            tilanne();
    }

    if (vuoroOO == true && (pelaaja.toiminto == 1) && (tietokone.toiminto == 3)) {
    pelaaja.puolusta();
            tietokone.keraaV();
            tilanne();
    }

    //ITEM
    if (vuoroOO == true && (pelaaja.toiminto == 4) && (tietokone.toiminto == 0)) {
        pelaaja.kItemi(pelaaja.item);
        tietokone.hyokkaa();
        tilanne();
    }

    if (vuoroOO == true && (pelaaja.toiminto == 4) && (tietokone.toiminto == 1)) {
        pelaaja.kItemi(pelaaja.item);
        tietokone.puolusta();
        tilanne();
    }

    if (vuoroOO == true && (pelaaja.toiminto == 4) && (tietokone.toiminto == 3)) {
        pelaaja.kItemi(pelaaja.item);
        tietokone.keraaV;
        tilanne();
    }
}


// ----------------------------------------------------------- O S U M A
// -----------------------------------------------------------

let attack = 0;

function osuma(hahmo) {
    if (hahmo.toiminto == 1) {
        if (((attack + satunnainenL()) - hahmo.defence) > 10) {
            hahmo.hp -= 5;
            sivulle("-5hp");
        } else {
            hahmo.hp -= ((attack + satunnainenL()) - hahmo.defence);
            sivulle("-" + ((attack + satunnainenL()) - hahmo.defence) + "hp");
        }
    } else {
        hahmo.hp -= (attack + satunnainenL());
        sivulle("-" + (attack + satunnainenL()) + "hp");
        }

document.getElementById("pelaaja").innerHTML = "PELAAJA <br>" + "Hp: " + pelaaja.hp + "<br>";
document.getElementById("pelaaja").innerHTML += "ITEM: " + pelaaja.item;
document.getElementById("tietokone").innerHTML = "TIETOKONE <br>" + "Hp: " + tietokone.hp;
}



// --------------------------------------------------------- B U U S T I
// ---------------------------------------------------------

function buusti(hahmo) {
    let noppa = (Math.random() * 100) + 1;
    noppa = noppa.toFixed(0);
    
    if (noppa < 23) {
        lisaaI("attack+", hahmo);
        sivulle(hahmo.nimi() + " sai attack+.")
    }
    if (noppa > 22 && noppa < 45) {
        lisaaI("defence+", hahmo);
        sivulle(hahmo.nimi() + " sai defence+.");
    }
    if (noppa > 44 && noppa < 67) {
        lisaaI("agility+", hahmo);
        sivulle(hahmo.nimi() + " sai agility+.");
    }
    if (noppa > 66 && noppa < 89) {
        lisaaI("HP+", hahmo);
        sivulle(hahmo.nimi() + " sai HP+.");
    }
    if (noppa > 88) {
        lisaaI("kranaatti", hahmo);
        sivulle(hahmo.nimi() + " sai kranaatin.");
    }
}



function itemK(item, hahmo) {
    if (item == "attack+") {
        hahmo.attack += 5;
        sivulle(hahmo.nimi() + " attack +5.");
        pelaaja.statit();
    }
    if (item == "defence+") {
        hahmo.defence += 5;
        sivulle(hahmo.nimi() + " defence +5.");
        pelaaja.statit();
    }
    if (item == "agility+") {
        hahmo.agility += 5;
        sivulle(hahmo.nimi() + " agility +5.");
        pelaaja.statit();
    }
    if (item == "HP+") {
        hahmo.hp += 20;
        sivulle(hahmo.nimi() + " HP +20.");
        pelaaja.statit();
        document.getElementById("pelaaja").innerHTML = "PELAAJA <br>" + "Hp: " + pelaaja.hp;
    }
    if (item == "kranaatti") {

    }
}

function lisaaI(itemi, hahmo) {
    hahmo.item = itemi;
}

// ----------------------------------------------- S A T U N N A I N E N
// -----------------------------------------------        

function satunnainenL() {
    return parseInt(((1 + (Math.random() * 2)).toFixed(0)));
}




let pelaaja = {
    hp : 120,
    attack : 7,
    defence : 5,
    agility : 8,
    toiminto : "", //1: puolustaa, 0: hyÃ¶kkÃ¤Ã¤.

    item : "-",
    kIVuoro : 0,
    itemOO : false,
    iKaytossa : "",

    hyokkaa : function() {
        sivulle("Pelaaja hyökkäsi.");
        attack = this.attack;
        osuma(tietokone);
    },

    puolusta : function() {
        sivulle("Pelaaja puolusti.");
        if (tietokone.keraaVOO == true) {
            pelaaja.hp += (6 + satunnainenL());
        }
    },

    keraaV : function(onOff) {

    if (onOff == "on") {
        pLaskuriOO = true;
        sivulle("Pelaaja keräsi voimia.");
        pelaaja.hp += (7 + satunnainenL());
        pelaaja.attack += (5 + satunnainenL());
        pelaaja.statit();
        sivulle("+ " + (7 + satunnainenL()) + "hp");
        document.getElementById("pelaaja").innerHTML = "PELAAJA <br>" + "Hp: " + pelaaja.hp;
        document.getElementById("tietokone").innerHTML = "TIETOKONE <br>" + "Hp: " + tietokone.hp;
    }

    if (onOff == "off") {
    pelaaja.attack -= 5;
            pLaskuriOO = false;
    }
    },

    kItemi : function(item) {
        sivulle("Pelaaja käytti " + this.item);
        if (this.item == "kranaatti") {
            sivulle("-20hp");
            tietokone.hp -= 20;
            document.getElementById("pelaaja").innerHTML = "PELAAJA <br>" + "Hp: " + pelaaja.hp;
            document.getElementById("tietokone").innerHTML = "TIETOKONE <br>" + "Hp: " + tietokone.hp;
        } else {
            itemK(this.item, pelaaja);
        }
        this.item = "-";
        this.itemOO = true;
        this.kIvuoro = vuoroL;
        this.iKaytossa = item;
    },
    
    iKesto : function(item) {
        if (item == "attack+") {
            pelaaja.attack -= 5;
            sivulle("Pelaajan attack palasi takaisin.");
            pelaaja.statit();
        }
        if (item == "defence+") {
            pelaaja.defence -= 5;
            sivulle("Pelaajan defence palasi takaisin.");
            pelaaja.statit();
        }
        if (item == "agility+") {
            pelaaja.agility -= 5;
            sivulle("Pelaajan agility palasi takaisin.");
            pelaaja.statit();
        }
    },
    
    nimi : function() {
        return "Pelaaja";
    },
    
    statit : function() {
        document.getElementById("pelaajaStatit").innerHTML = "Attack: " + pelaaja.attack + "<br>" +
                                                             "Defence: " + pelaaja.defence + "<br>" +
                                                             "Agility: " + pelaaja.agility + "<br>";
    }
};



let tietokone = {
hp : 150,
        attack : 7,
        defence : 5,
        agility : 10,
        toiminto : "", //1: puolustaa, 0: hyÃ¶kkÃ¤Ã¤.

        laskuri : 0,
        laskuriKV : 0,
        keraaVOO : false,

        hyokkaa : function() {
            sivulle("Tietokone hyökkäsi.");
            attack = this.attack;
            osuma(pelaaja);
        },
        
        puolusta : function() {
            sivulle("Tietokone puolusti.");
        },
        
        keraaV : function() {
            sivulle("Tietokone keräsi voimia.");
            this.keraaVOO = true;
            this.laskuriKV = vuoroL;
            tietokone.hp += (7 + satunnainenL());
            tietokone.attack += (5 + satunnainenL());
            tietokone.statit();
            sivulle("+ " + (7 + satunnainenL()) + "hp");
            document.getElementById("pelaaja").innerHTML = "PELAAJA <br>" + "Hp: " + pelaaja.hp;
            document.getElementById("tietokone").innerHTML = "TIETOKONE <br>" + "Hp: " + tietokone.hp;
        },

        nimi : function() {
            return "Tietokone";
        },
        
        statit : function() {
        document.getElementById("tietokoneStatit").innerHTML = "Attack: " + tietokone.attack + "<br>" +
                                                             "Defence: " + tietokone.defence + "<br>" +
                                                             "Agility: " + tietokone.agility + "<br>";
        }
};