const body = document.getElementById('body');
// sunday first because js is very dumb
const weekdayColors = ['#ab4377', '#890000', '#ab6433', '#4551bd', '#777777', '#880080', '#45bbfd'].map(t => chroma(t))
const yearColors = chroma.scale(['ddddff', '89de55', '55de33', 'eddc22', 'b8621c', '7d481d', '#523d2d', 'a7c7bf', 'ddddff']).domain([0, 2, 4, 6, 8, 9, 10, 11, 11.99])

let start = chroma('000000');
let end = chroma('000000');
let rot = 90;

function makeCssGradientString(start, end, rot, resolution = 100) {
    let colors = chroma.scale([start, end]).mode('oklab').colors(resolution)
    let str = `linear-gradient(${rot}deg, ${colors.join(',')})`
    return str
}

function daysIntoYear(date){
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

function leapYear(year) {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function nightDarken(x) {
    return 3*Math.pow((Math.sin(2*Math.PI*(x+0.25))+1)/2, 1.4);
}



setInterval(() => {body.style.backgroundImage = makeCssGradientString(start, end, rot);}, 100)

setInterval(() => {
    let now = new Date();
    let dayProgress = (now.getHours()*3600+now.getMinutes()*60+now.getSeconds()+now.getMilliseconds()/1000)/86400;
    let yearProgress = (daysIntoYear(now) - 1 + dayProgress) / (leapYear(now.getFullYear())? 365 : 366);
    rot = 360*dayProgress;

    let weekday = now.getDay();
    start = weekdayColors[weekday];
    end = yearColors(yearProgress*12);

    let darkenFactor = nightDarken(dayProgress);
    start = start.darken(darkenFactor);
    end = end.darken(darkenFactor);
}, 20)