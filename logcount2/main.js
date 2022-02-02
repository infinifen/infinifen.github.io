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

const menu = document.querySelector("#menu");
const closeOpen = document.querySelector("#menu-closeopen");
const targetDatePicker = document.querySelector("#target-date");

closeOpen.addEventListener("click", function () {
    console.log("click!!");
    if (this.classList.contains("menu-open")) {
        this.classList.remove("menu-open");
    } else {
        this.classList.add("menu-open");
    }
}.bind(menu))

let countdown = new Date(targetDatePicker.value); // !! js date is really fucking weird so this is actually august !!

targetDatePicker.addEventListener("input", function () {
    console.log("target date changed")
    countdown = new Date(this.value)
}.bind(targetDatePicker))

setInterval(() => {
    let count = score(getSecondsUntil(countdown)).toFixed(10);
    if (!isNaN(count)) {
        let [countMain, countFrac] = [count.substring(0, count.length - 7), count.substring(count.length - 7)];
        document.getElementById("count").innerHTML = `${countMain}<span id="count-small">${countFrac}</span>`;
    } else {
        document.getElementById("count").innerHTML = "the time has passed. nothing is eternal.";
    }
}, 16);