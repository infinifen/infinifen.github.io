//initialize program
var money = 0;
var money_perclick = 1;
var money_lvl = 1;
var moneyupg_cost = 1;
var money_thisuniverse = 0;
var money_total = 0;

function gameupdate() {
    document.getElementById("money").innerHTML = "$" + money;
    document.getElementById("moneyadd").innerHTML = "$$$ (+" + money_perclick + ")"

    moneyupg_cost = Math.ceil(Math.pow(money_lvl, 4.5));
    document.getElementById("moneyupg").innerHTML = "Upgrade money per click (x2, cost: " + moneyupg_cost + ")";
}
setInterval(gameupdate, 200);
//add event listeners
document.getElementById("moneyadd").addEventListener("click", moneyaddonclick);
document.getElementById("moneyupg").addEventListener("click", moneyupgonclick);


//button behavior
function moneyaddonclick() {
    money += money_perclick;
}

function moneyupgonclick() {
    if (money >= moneyupg_cost) {
        money_lvl += 1;
        money_perclick = 2 * money_perclick;
        money -= moneyupg_cost;
        gameupdate();
    }
}
