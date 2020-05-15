function updateanimals(krolik, owca, swinia, krowa, kon, mpies, dpies) {
    let i=0;
    for (; i < 30; i++) {
        krolikitr.getElementsByTagName("td")[i].firstChild.src="img/white.png";
        krolikitr.getElementsByTagName("td")[i].firstChild.classList.add("unselectable");
    }
    for (i=0; i < 30; i++) {
        kroliki2tr.getElementsByTagName("td")[i].firstChild.src="img/white.png";
        kroliki2tr.getElementsByTagName("td")[i].firstChild.classList.add("unselectable");
    }
    for (i = 0; i < Math.min(30,krolik); i++) {
        krolikitr.getElementsByTagName("td")[i].firstChild.src="img/krolik.jpg";
        krolikitr.getElementsByTagName("td")[i].firstChild.classList.remove("unselectable");
    }
    for (; i < krolik; i++) {
        kroliki2tr.getElementsByTagName("td")[i-30].firstChild.src="img/krolik.jpg";
        kroliki2tr.getElementsByTagName("td")[i-30].firstChild.classList.remove("unselectable");
    }
    for (i=0; i < 24; i++) {
        owcetr.getElementsByTagName("td")[i].firstChild.src="img/white.png";
        owcetr.getElementsByTagName("td")[i].firstChild.classList.add("unselectable");
    }
    for (i = 0; i < owca; i++) {
        owcetr.getElementsByTagName("td")[i].firstChild.src="img/owca.jpg";
        owcetr.getElementsByTagName("td")[i].firstChild.classList.remove("unselectable");
    }
    for (i=0; i < 20; i++) {
        swinietr.getElementsByTagName("td")[i].firstChild.src="img/white.png";
        swinietr.getElementsByTagName("td")[i].firstChild.classList.add("unselectable");
    }
    for (i = 0; i < swinia; i++) {
        swinietr.getElementsByTagName("td")[i].firstChild.src="img/swinia.jpg";
        swinietr.getElementsByTagName("td")[i].firstChild.classList.remove("unselectable");
    }
    for (i=0; i < 12; i++) {
        krowytr.getElementsByTagName("td")[i].firstChild.src="img/white.png";
        krowytr.getElementsByTagName("td")[i].firstChild.classList.add("unselectable");
    }
    for (i = 0; i < krowa; i++) {
        krowytr.getElementsByTagName("td")[i].firstChild.src="img/krowa.jpg";
        krowytr.getElementsByTagName("td")[i].firstChild.classList.remove("unselectable");
    }
    for (i=0; i < 6; i++) {
        konietr.getElementsByTagName("td")[i].firstChild.src="img/white.png";
        konietr.getElementsByTagName("td")[i].firstChild.classList.add("unselectable");
    }
    for (i = 0; i < kon; i++) {
        konietr.getElementsByTagName("td")[i].firstChild.src="img/kon.jpg";
        konietr.getElementsByTagName("td")[i].firstChild.classList.remove("unselectable");
    }
    for (i=0; i < 4; i++) {
        mpsytr.getElementsByTagName("td")[i].firstChild.src="img/white.png";
        mpsytr.getElementsByTagName("td")[i].firstChild.classList.add("unselectable");
    }
    for (i = 0; i < mpies; i++) {
        mpsytr.getElementsByTagName("td")[i].firstChild.src="img/mpies.jpg";
        mpsytr.getElementsByTagName("td")[i].firstChild.classList.remove("unselectable");
    }
    for (i=0; i < 2; i++) {
        dpsytr.getElementsByTagName("td")[i].firstChild.src="img/white.png";
        dpsytr.getElementsByTagName("td")[i].firstChild.classList.add("unselectable");
    }
    for (i = 0; i < dpies; i++) {
        dpsytr.getElementsByTagName("td")[i].firstChild.src="img/dpies.jpg";
        dpsytr.getElementsByTagName("td")[i].firstChild.classList.remove("unselectable");
    }
}

let updatekeyframes=[
    {opacity: 0 , backgroundColor:"#ff0"},
    { opacity: .8 },
    { opacity: 1 ,backgroundColor: "initial"}
];
let updatekeyframesontable=[
    {position:"relative", right:"0vw", opacity: 1},
    {position:"relative",right:"200vw", opacity: 1},
    {position:"relative",right:"200vw",opacity: 0},
    {position:"initial", right:"0vw", opacity: 1}
];
let errorkeyframes=[
    {backgroundColor:"#f00"},
    {backgroundColor:"initial"}
];


class Player{
    constructor(name,k,o,s,r,n,m,d){
        this.krolik=k;
        this.owca=o;
        this.swinia=s;
        this.krowa=r;
        this.kon=n;
        this.mpies=m;
        this.dpies=d;
        this.name=name;
    }
    get value(){
        return this.krolik+this.owca*6+this.swinia*12+this.krowa*36+this.kon*72+this.mpies*6+this.dpies*36;
    }
    get win(){
        return this.krolik&&this.owca&&this.swinia&&this.krowa&&this.kon;
    }
    display(){
        selected=[];
        for (let i = 0; i < allanimals.length; i++) {
            allanimals[i].firstChild.classList.remove("selected");
        }
        document.getElementById("totalvalue").innerHTML="Wartość farmy :"+(this.value+parseInt(document.getElementById("wwymianie").innerHTML))+"k";
        document.getElementById("playername").innerHTML=this.name;
        updateanimals(this.krolik, this.owca, this.swinia, this.krowa, this.kon, this.mpies, this.dpies);
    }
    displayinremaining(){
        ["krolik","owca","swinia","krowa","kon","mpies","dpies"].forEach(zw => {
            document.getElementById("poz"+zw).innerHTML="x"+this[zw];
        });
    }
    subtract(other){
        return new Player(this.name,this.krolik-other.krolik,this.owca-other.owca,this.swinia-other.swinia,this.krowa-other.krowa,this.kon-other.kon,this.mpies-other.mpies,this.dpies-other.dpies);
    }
    add(other){
        return new Player(this.name,this.krolik+other.krolik,this.owca+other.owca,this.swinia+other.swinia,this.krowa+other.krowa,this.kon+other.kon,this.mpies+other.mpies,this.dpies+other.dpies);
    }
    animalmath(){
        //roll dice, add animals
        let res1, res2;
        let d=randint(0,11);
        switch (d){
            case 0:
                res1="wilk";
                break;
            case 1:
                res1="krowa";
                break;
            case 2:
                res1="swinia";
                break;
            case 3:
            case 4:
            case 5:
                res1="owca";
                break;
            default:
                res1="krolik";
                break;
        }
        d=randint(0,11);
        switch (d){
            case 0:
                res2="lis";
                break;
            case 1:
                res2="kon";
                break;
            case 2:
            case 3:
                res2="swinia";
                break;
            case 4:
            case 5:
                res2="owca";
                break;
            default:
                res2="krolik";
                break;
        }
        document.getElementById("d1").src="img/"+res1+".jpg";
        document.getElementById("d2").src="img/"+res2+".jpg";
        document.getElementById("kostki").animate(updatekeyframes,{duration: 500,iterations: 1});
        if(res1=="wilk"){
            if(this.dpies){
                this.dpies-=1;
                bank.dpies+=1;
            }else{
                bank.krolik+=this.krolik;
                bank.owca+=this.owca;
                bank.swinia+=this.swinia;
                bank.krowa+=this.krowa;
                this.krolik=0;
                this.owca=0;
                this.swinia=0;
                this.krowa=0;
            }
        }
        if(res2=="lis"){
            if(this.mpies){
                this.mpies-=1;
                bank.mpies+=1;
            }else{
                bank.krolik+=this.krolik;
                this.krolik=0;
            }
        }
        if(!(res1=="wilk") && !(res2=="lis")){
            let toadd1, toadd2;
            if (res1!=res2){
                console.log(this[res1]);
                toadd1=Math.min(bank[res1], Math.floor( (this[res1]+1)/2) );
                toadd2=Math.min(bank[res2], Math.floor( (this[res2]+1)/2) );
                this[res1]+=toadd1;
                this[res2]+=toadd2;
                bank[res1]-=toadd1;
                bank[res2]-=toadd2;
            }else{
                toadd1=Math.min(bank[res1], Math.floor( (this[res1]+2)/2) );
                this[res1]+=toadd1;
                bank[res1]-=toadd1;
            }
        }
        this.display();
        bank.displayinremaining();
    }
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let animaltable=document.getElementById("animals");
let krolikitr=document.getElementById("kroliki");
let kroliki2tr=document.getElementById("kroliki2");
let owcetr=document.getElementById("owce");
let swinietr=document.getElementById("swinie");
let krowytr=document.getElementById("krowy");
let konietr=document.getElementById("konie");
let mpsytr=document.getElementById("mpsy");
let dpsytr=document.getElementById("dpsy");
let allanimals=animaltable.getElementsByClassName("animal");
let selected=[];
function selecthandler(img, force=-1){
    if(force!=1 && selected.find(function(a){return a===img})){
        selected.splice(selected.indexOf(img),1);
        img.classList.remove("selected");
    }else{
        if(force!=0 && !img.classList.contains("unselectable")){
            selected.push(img);
            img.classList.add("selected");
        }
    }
}

function exchangehandler(img){
    let value=0;
    let animal="";
    switch(img){
        case document.getElementById("wymkrolik"):
            value=1;
            animal="krolik";
            break;
        case document.getElementById("wymowca"):
            value=6;
            animal="owca";
            break;
        case document.getElementById("wymswinia"):
            value=12;
            animal="swinia";
            break;
        case document.getElementById("wymkrowa"):
            value=36;
            animal="krowa";
            break;
        case document.getElementById("wymkon"):
            value=72;
            animal="kon";
            break;
        case document.getElementById("wymmpies"):
            value=6;
            animal="mpies";
            break;
        case document.getElementById("wymdpies"):
            value=36;
            animal="dpies";
            break;
    }
    console.log(animal);
    if(document.getElementById("wwymianie").innerHTML>=value){
        if(bank[animal]){
            bank[animal]-=1;
            currentpl[animal]+=1;
            document.getElementById("wwymianie").innerHTML=parseInt(document.getElementById("wwymianie").innerHTML)-value;
            players[plindex]=currentpl;
            currentpl.display();
            bank.displayinremaining();
        }else{
            document.getElementById("wym"+animal).nextSibling.animate(errorkeyframes,{duration: 500,iterations: 1});
        }
    }else{
        document.getElementById("wwymianie").parentNode.animate(errorkeyframes,{duration: 500,iterations: 1});
        console.log("frick");
    }
}

function whatisselected() {
    let r=new Player("temp",0,0,0,0,0,0,0);
    r.krolik=selected.filter(function(a){return a.parentNode.parentNode===krolikitr || a.parentNode.parentNode===kroliki2tr}).length;
    r.owca=selected.filter(function(a){return a.parentNode.parentNode===owcetr}).length;
    r.swinia=selected.filter(function(a){return a.parentNode.parentNode===swinietr}).length;
    r.krowa=selected.filter(function(a){return a.parentNode.parentNode===krowytr}).length;
    r.kon=selected.filter(function(a){return a.parentNode.parentNode===konietr}).length;
    r.mpies=selected.filter(function(a){return a.parentNode.parentNode===mpsytr}).length;
    r.dpies=selected.filter(function(a){return a.parentNode.parentNode===dpsytr}).length;
    return r;
}
function addselection(){
    let sel=whatisselected();
    document.getElementById("wwymianie").innerHTML=parseInt(document.getElementById("wwymianie").innerHTML)+sel.value;
    currentpl=currentpl.subtract(sel);
    bank=bank.add(sel);
    currentpl.display();
    bank.displayinremaining();
}

function selectall(force=1){
    for (let i = 0; i < allanimals.length; i++) {
        const td = allanimals[i];
        selecthandler(td.firstChild,force);
    }
}



let currentpl;
let phase=0; //0-będzie rzucane 1-będzie kończone;
let plindex=0;
for (let i = 0; i < allanimals.length; i++) {
    const td = allanimals[i];
    td.firstChild.addEventListener("click",function(){selecthandler(this);});
}
for (let i = 0; i < document.getElementById("exchtable").getElementsByTagName("td").length; i++) {
    document.getElementById("exchtable").getElementsByTagName("td")[i].firstChild.addEventListener("click",function(){exchangehandler(this);});
}
document.getElementById("wymien").addEventListener("click",function(){addselection();});
document.getElementById("nextphase").addEventListener("click",function(){nextphase();});

let url=new URL(location.toString())
let bank=new Player("",60,24,20,12,6,4,2);
let noplayers=parseInt(url.searchParams.get("n"));
let players=[];
for (let i = 0; i < noplayers; i++) {
    players.push(new Player((i+1).toString(),0,0,0,0,0,0,0))
    
}
currentpl=players[0];
updateanimals(0,0,0,0,0,0,0)
document.getElementById("d1").src="img/white.png";
document.getElementById("d2").src="img/white.png";

function nextphase(){
    if(currentpl.win){
        document.getElementById("whowon").innerHTML=currentpl.name;
        players.forEach(pl => {
            newelem=document.createElement("li");
            newelem.innerHTML="Gracz "+pl.name+" - "+pl.value+"k";
            document.getElementById("resultlist").appendChild(newelem);
            document.getElementById("results").style.visibility="visible";
            document.getElementById("main").style.visibility="collapse";
        });
    }
    if(document.getElementById("wwymianie").innerHTML!=0){
        document.getElementById("wwymianie").animate(errorkeyframes,{duration: 500,iterations: 1});
        return;
    }
    if(!phase){
        currentpl.animalmath();
        document.getElementById("nextphase").innerHTML="Zakończ ruch";
    }else{
        plindex++;
        plindex%=noplayers;
        currentpl=players[plindex];
        currentpl.display();
        document.getElementById("nextphase").innerHTML="Rzuć kostkami";
        document.getElementById("animals").animate(updatekeyframesontable,{duration: 750,iterations: 1, easing:"ease-out"});
    }
    phase=!phase;
}