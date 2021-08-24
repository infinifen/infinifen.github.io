countdown = new Date(2022, 7, 3); // !! js date is really fucking weird so this is actually august !!

// x is the remaining time in seconds
// i made this function up earlier too because i did another log timer but the function was more unpleasant for me so i changed it
function score(x) {
    let lf = Math.log2(x + 1) + 30;
    let g = Math.sqrt(x) + 1;

    return lf * g / 5;
}

function getSecondsUntil(date) {
    return (date - Date.now()) / 1000;
}

setInterval(() => {
    let count = score(getSecondsUntil(countdown)).toFixed(10);
    let [countMain, countFrac] = [count.substring(0, count.length - 7), count.substring(count.length - 7)];
    document.getElementById("count").innerHTML = `${countMain}<span id="count-small">${countFrac}</span>`;
}, 16);