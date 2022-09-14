/* Arrayerna som ska jämföras preciseras i varje enskild htmlfil, koden i denna fil är "allmän" kod som är samma för varje sida

    Arrayen med rätt ordning heter: rattOrdning

    Arrayen med random ordning heter: slumpOrdning

    Arrayen som skrivs ut när man fått alla rätt och visar extra fakta heter: fakta

*/
       
let gissadOrdning = []; // tom array som ska innehålla användarens gissningar och jämföras med rattOrdning-arrayen

slumpOrdning.sort(function(){  // den här gör att slumpOrdning-arrayen hamnar i random ordning
    return 0.5 - Math.random() // math.random ger värde mellan 0-1. 0.5 är mellanvärdet, så math.random ger oss nu ett värde mellan -0.5 och 0.5 (sorterar "framåt" eller "bakåt")
    });

let lista = document.getElementById("lista"); // diven där elementen (arrayen slumpOrdning) ska hamna 

let klickadOrdning = 0; // återkommer i funktionen nedan

function visaRandomLista() {  // funktion som lägger till elementen i arrayen slumpOrdning som egna element
    for (let i = 0; i<slumpOrdning.length; i++) {
        let htmlElement = document.createElement("div");
        htmlElement.innerHTML = slumpOrdning[i]; // skriver ut ett element (i)
        lista.appendChild(htmlElement); // nya elementen hamnar i div:en som heter lista
        htmlElement.setAttribute("class", "divelement"); // varje ny div får class divelement
        htmlElement.setAttribute("id", slumpOrdning[i]); // varje div får ett nytt id som är dens position i slumpOrdning-arrayen
        htmlElement.addEventListener("click", function laggTill() {
            gissadOrdning.push(slumpOrdning[i]); // gissadOrdning arrayen fylls med elementen i den ordning som man klickade på dem
            klickadOrdning++; // ökar med 1
            this.innerHTML += " " +klickadOrdning; // skriver ut ordningen man klickat på elementen
            this.style.backgroundColor="#bcd7d1"; // klickat element blir ljusturkost
            this.removeEventListener("click",laggTill); // gör att man bara kan klicka en gång per element
        });
    } 
}

function check() { // funktion som körs när man klickar på gissa-knappen, kollar om gissadOrdning är lika lång som rattOrdning
    if (gissadOrdning.length == rattOrdning.length) { 
        sammaLangd(); 
    } else {
        alert("Markera alla 10 alternativ innan du gissar!"); // om gissadOrdning är kortare än rattOrdning visas detta 
    }
} 

function sammaLangd () { // när vi vet att gissadOrdning och rattOrdning är lika långa så ska vi börja kolla vilka som blev fel (med en loop)
    for (let i = 0; i < rattOrdning.length; i++) {
        if (gissadOrdning[i] != rattOrdning[i])  { // om de >inte< stämmer
            document.getElementById(gissadOrdning[i]).style.backgroundColor="#e14b51"; // de som är fel blir röda
            document.getElementById(gissadOrdning[i]).style.borderColor="#e14b51";
        }  else { // de som är rätt blir gröna
            document.getElementById(gissadOrdning[i]).style.backgroundColor="#43b26e"; 
            document.getElementById(gissadOrdning[i]).style.borderColor="#43b26e";
        } 
        }

        if (jamfor()){ // om functionen jamfor nedan är true så körs vinst-funktionen
            vinst();
        } else { // om den är false:
            alert("Tyvärr, inte alla rätt! Försök igen!");
        }

        function jamfor(){ // jämför om arrayerna är i samma ordning
            a = gissadOrdning.toString(); // gör om arrayerna till strängar
            b = rattOrdning.toString();
            return a===b; // returnar true om de stämmer, returnar false om de inte stämmer
        }
}

function vinst(){
    alert("Grattis! Alla rätt!");
    for (let i = 0; i<fakta.length; i++) { // loopar igenom arrayen fakta (individuell för varje sida) och skriver ut det i en lista i en div med id faktaruta
        let facit = document.createElement("div");
        facit.innerHTML = fakta[i];
        faktaruta.appendChild(facit);
        facit.setAttribute("class", "facitelement"); // varje nytt element får class facitelement
    }
}