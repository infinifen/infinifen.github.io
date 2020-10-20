function sbeve(){
    var txt = document.getElementById("s").value;
    var wr=/\bh+|[^\s]/g;
    var toSbeveify=txt.match(wr);
    var avgCommas=parseInt(document.getElementById("com").value);
    var commaVariance=parseInt(document.getElementById("var").value);
    var sbeveified="";
    toSbeveify.forEach(s => {
        commas=Math.floor(Math.random()*(2*commaVariance+1))-commaVariance+avgCommas;
        sbeveified+=(s+','.repeat(Math.max(0, commas))+" ");
    });
    document.getElementById("r").innerHTML=sbeveified;
}

document.getElementById("v").innerHTML=document.getElementById("var").value;
document.getElementById("c").innerHTML=document.getElementById("com").value;

document.getElementById("var").oninput=function(){document.getElementById("v").innerHTML=document.getElementById("var").value;}
document.getElementById("com").oninput=function(){document.getElementById("c").innerHTML=document.getElementById("com").value;}

