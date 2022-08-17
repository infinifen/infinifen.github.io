function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRightPercent(){
    return isNaN(Math.round(questionsRight/questionsAnswered*100)) ? 0 : Math.round(questionsRight/questionsAnswered*100);
}

function koniecCzasu() {
    console.log("koniec!");

    //ukryć wpisywanie
    document.getElementById("tabliczka").style.display = "none";
    //wyniki
    document.getElementById("punkty").innerHTML = `${calculatePoints()} pkt.`
    document.getElementById("ilenaile").innerHTML = `${questionsRight}/${questionsAnswered} (${getRightPercent()}%)`;
    secperq=isFinite((tgiven/questionsAnswered).toFixed(2)) ? (tgiven/questionsAnswered).toFixed(2) : 0;
    switch (calculatePoints) {
        case accScoring:
            pmax=isNaN(Math.round(calculatePoints()/(questionsAnswered*100)*100)) ? 0 : Math.round(calculatePoints()/(questionsAnswered*100)*100);
            resztatxt = `${secperq} sek./pytanie, maxPkt=${questionsAnswered*100}, %maxPkt=${pmax}%`;
            break;
        case speedScoring:
            resztatxt = `${secperq} sek./pytanie`;
        default:
            break;
    }

    document.getElementById("reszta").innerHTML = resztatxt;
    document.getElementById("wyniki").style.display = "initial";


    clearInterval(counterTickID);
    clearInterval(statUpdateID);

}

function timeCounterTick() {
    if (Date.now() > endTime) {
        koniecCzasu();
    } else {
        document.getElementById("pozczas").innerHTML = ((endTime - Date.now()) / 1000).toFixed(0);
    }
}

function generateQuestion() {
    let liczba1 = getRandomIntInclusive(od1, do1);
    let liczba2 = getRandomIntInclusive(od2, do2);
    window.correctAnswer = liczba1 * liczba2;
    document.getElementById("pytanie").innerHTML = `${liczba1} * ${liczba2} = `
}

function start() {
    document.getElementById("odp").value="";
    //zmienne
    window.questionsAnswered = 0;
    window.questionsRight = 0;
    //parametry
    window.od1 = document.getElementById("od1").value;
    window.do1 = document.getElementById("do1").value;
    window.od2 = document.getElementById("od2").value;
    window.do2 = document.getElementById("do2").value;
    window.tgiven = document.getElementById("czas").value;
    //punktowanie
    sc = document.querySelector("input[name=scoring]:checked");
    switch (sc.value) {
        case "acc":
            calculatePoints = accScoring;
            break;
        case "spd":
            calculatePoints = speedScoring;
            break;
        default:
            console.log('bru');
            return;
    }
    if (!(od1 && od2 && do1 && do2 && tgiven)) {
        return;
    }
    window.endTime = Date.now() + tgiven * 1000;
    window.counterTickID = setInterval(timeCounterTick, 50);
    //tabliczka widzialna parametry nie
    document.getElementById("tabliczka").style.display = "initial";
    document.getElementById("parametry").style.display = "none";
    document.getElementById("wyniki").style.display = "none";
    //pierwsze pytanie
    generateQuestion();
    document.getElementById("odp").focus();
    window.statUpdateID = setInterval(updateStats, 30);
}

function lqiRed() {
    document.getElementById("lastqinfo").style.color = "red";
}

function lqiGreen() {
    document.getElementById("lastqinfo").style.color = "green";
}

function accScoring() {
    h=(questionsAnswered * (Math.pow(questionsRight / questionsAnswered, 2.1)) * 100).toFixed(0);
    return isNaN(h) ? 0 : h;
}

function speedScoring() {
    let acc = questionsRight / questionsAnswered;
    let invAcc = 1 - acc
    return (10000 / ((((tgiven * 1000 - (endTime - Date.now())) / 1000) / questionsAnswered)) / (1 + (questionsAnswered - questionsRight) * invAcc)).toFixed(0);
}

function sprawdz() {
    let odpel = document.getElementById("odp");
    let odp = odpel.value;
    let lqi = document.getElementById("lastqinfo");
    questionsAnswered++;
    if (odp == correctAnswer) {
        questionsRight++;
        lqiGreen();
        lqi.innerHTML = "Dobrze!";
    } else {
        lqiRed();
        lqi.innerHTML = `Źle... powinno być ${correctAnswer}`;
    }
    odpel.value = "";
    document.getElementById("odp").focus();
    generateQuestion();
}

function updateStats() {
    st = document.getElementById("stats");
    statStr = `${questionsRight}/${questionsAnswered} (${getRightPercent()}%), ${calculatePoints()} pkt.`
    st.innerHTML = statStr;
}

function reset(){
    document.getElementById("tabliczka").style.display = "none";
    document.getElementById("parametry").style.display = "initial";
    document.getElementById("wyniki").style.display = "none";
}

document.getElementById("odp").addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        document.getElementById("sprawdz").click();
    }
});