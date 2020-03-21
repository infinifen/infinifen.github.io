var money = 0;
var money_perclick = 1;
var money_lvl = 1;
var moneyupg_cost = 1;
var moneypt_lvl = 1;
var moneyptupg_cost = 1;
var money_thisuniverse = 0;
var money_total = 0;
var universe = 1;
var feature = 0; //0=game start 1=auto production
var featurethresholds = [12000, 90000, Infinity];
var featuredesc = ["Auto Production", "Upgrade Cheapener", "Congratulations! You broke the game!"];
var money_pertick = 0;
var transdollars = 0;

$(function () {
    setInterval(gameupdate, 200);
    $("#moneyadd").click(moneyaddonclick);
    $("#moneyupg").click(moneyupgonclick);
    $("#moneyptupg").click(moneyptupgonclick);
    $("#universereset").click(universeresetonclick);
});

function gameupdate(addidle = true) {
    $("#money").html("$" + parseFloat(money.toPrecision(6)));
    $("#moneyadd").html("$$$ (+" + money_perclick + ")");
    moneyupg_cost = Math.ceil(Math.pow(money_lvl, 4.5));
    moneyptupg_cost = Math.ceil(moneypt_lvl*Math.pow(1.45,moneypt_lvl))
    $("#moneyupg").html("Upgrade money per click (x2, cost: " + moneyupg_cost + ")");
    $("#universereset").html("Reset the universe! Next feature: " + featuredesc[feature] + " at $" + featurethresholds[feature] + " Progress: " + parseFloat(money_thisuniverse.toPrecision(6)) + "/" + featurethresholds[feature]);
    $("#moneypersecond").html("per second: $" + money_pertick * 5);
    if (money >= moneyupg_cost) {
        $("#moneyupg").removeClass('disabled');
    } else {
        $("#moneyupg").addClass('disabled');
    }
    if (addidle) {
        if (feature > 0) {
            money_pertick = parseFloat((money_perclick * moneypt_lvl / 10 / 5 /* /5 bc 5 ticks per second*/ ).toPrecision(6));
            money += money_pertick;
            money_thisuniverse += money_pertick;
            money_total += money_pertick;
        }
    }
}

//button behavior
function moneyaddonclick() {
    money += money_perclick;
    money_thisuniverse += money_perclick;
    money_total += money_perclick;
}

function moneyupgonclick() {
    if (money >= moneyupg_cost) {
        money_lvl += 1;
        money_perclick = 2 * money_perclick;
        money -= moneyupg_cost;
        gameupdate(false);
    }
}

function moneyptupgonclick() {
    if (money >= moneyptupg_cost) {
        moneypt_lvl += 1;
        money -= moneyptupg_cost;
        gameupdate(false);
    }
}

function universeresetonclick() {
    var pr = prompt("Are you really sure you want to reset? Type yes to continue...")
    if (pr == "yes") {
        if (money_total >= featurethresholds[feature]) {
            feature += 1;
        }
        universe += 1;
        money = 0;
        money_perclick = 1;
        money_lvl = 1;
        moneyupg_cost = 1;
        money_thisuniverse = 0;
        moneypt_lvl = 1;
        moneyptupg_cost = 1;
        money_pertick = 0;
        if (feature == 1) {
            $("#moneyptupg").show();
        }

    } else {
        //cheat codes
        if (pr == "iabdo") {
            money_perclick = 1e69;
        }
    }
}