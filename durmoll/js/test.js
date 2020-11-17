function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function arrMerge(arr1, arr2) {
    let res = [];
    for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
        res.push([arr1[i], arr2[i]])
    }
    return res
}

function indexToAudio(base, index) {
    let res = []
    index.forEach((i) => res.push(allAudio[base + i]))
    return res
}

function randomProperty(obj) {
    return obj[Object.getOwnPropertyNames(obj)[getRandomInt(0, Object.getOwnPropertyNames(obj).length)]]
}


function playNew() {
    if(pickMode) return;
    randomChord = randomProperty(currentlyAllowedListenables)
    let base = getRandomInt(0, allAudio.length - Math.max(...randomChord.sounds));
    allAudio.forEach(function (a) {
        a.pause()
    });

    arrMerge(indexToAudio(base, randomChord.sounds), currentTiming.times).forEach(function (a) {
        setTimeout(function (aa) {
            //aa.fastSeek(0);
            aa.currentTime=0;
            aa.play();
        }, a[1], a[0])
    });
    pickMode=true;
    document.getElementById("playnew").disabled=true
    document.getElementById("skip").disabled=false
}



function guess(guess) {
    if(!pickMode) return;
    if(!Object.values(currentlyAllowedListenables).includes(guess)) return;
    if(!(guess===null) && guess===randomChord){
        status.innerHTML="Dobrze!"
        correct+=1
        document.getElementById("wynik").animate(updatekeyframes, 500)
    }else{
        status.innerHTML=`źle... właściwe: ${randomChord.name}`
        wrong+=1
        document.getElementById("wynik").animate(errorkeyframes, 500)
    }
    pickMode=false;
    document.getElementById("playnew").disabled=false
    document.getElementById("skip").disabled=true
    updateScore()
}

function generateButtons(){
    const chorddiv=document.getElementById("chords")
    const intdiv=document.getElementById("intervals")
    for(const int in INTERVALS){
        let btn=document.createElement("button")
        btn.id=`guessbtn${INTERVALS[int].name}`
        btn.onclick=()=>guess(INTERVALS[int])
        btn.innerHTML=INTERVALS[int].name
        intdiv.appendChild(btn);
    }
    for(const ch in CHORDS){
        let btn=document.createElement("button")
        btn.id=`guessbtn${CHORDS[ch].name}`
        btn.onclick=()=>guess(CHORDS[ch])
        btn.innerHTML=CHORDS[ch].name
        chorddiv.appendChild(btn);
    }
}

function generateTimingSelect(){
    const sel=document.getElementById("timingselect")
    for (const t in TIMINGS){
        let optn=document.createElement("option")
        optn.innerHTML=TIMINGS[t].name;
        optn.value=t
        sel.appendChild(optn)
    }
}

function checkboxHandler(a, listenables) {
    if(a.checked) {
        Object.assign(currentlyAllowedListenables, listenables);
    }else{
        for (const l in listenables){
            delete(currentlyAllowedListenables[l])
        }
    }
}

function timingSelectHandler(a) {
    currentTiming=TIMINGS[a.value]
}

function getRightPercent(){
    return isNaN(Math.round(correct/(correct+wrong)*100)) ? 0 : Math.round(correct/(correct+wrong)*100);
}

function updateScore() {
    easter="";
    // if(url.searchParams.get("pani")==="datta" && getRightPercent()<75){
    //     easter=" <span id='easter'>(pani Datta cię zabije)</span>"
    // }
    document.getElementById("wynik").innerHTML=`${correct}/${correct+wrong} <span id="prc">${getRightPercent()}%${easter}</span>`
}

let updatekeyframes=[
    {backgroundColor:"#aaffaa"},
    {backgroundColor:"initial"}
];

let errorkeyframes=[
    {backgroundColor:"#ff6666"},
    {backgroundColor:"initial"}
];

let randomChord;
let pickMode=false;
let correct=0;
let wrong=0;
let currentlyAllowedListenables=CHORDSANDINTERVALS;
let currentTiming=TIMINGS.ATONCE;
const allAudio = document.querySelectorAll('audio')
const status=document.getElementById("status")
generateButtons();
generateTimingSelect();
checkboxHandler(document.getElementById("togglechords"), CHORDS)
checkboxHandler(document.getElementById("toggleints"), INTERVALS)
let url=new URL(location.toString())