//stolen from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array with slight modifications
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function sevenbag() {
    let iters = document.getElementById("bagcount").valueAsNumber;
    if (isNaN(iters)) iters = 1;
    document.getElementById("your_bag_text").innerHTML = iters > 1 ? "your shuffled bags are:" : "your shuffled bag is:";
    document.getElementById("bags").innerHTML = "";

    for (let i = 0; i < iters; i++) {
        let elt = document.createElement("div");
        elt.classList.add("bag");
        let bag = shuffleArray("itlszjo".split(""));
        if (document.getElementById("showpieces").checked) {
            bag.forEach((piece) => {
                let img = document.createElement("img");
                img.src = `minos/${piece}.png`;
                elt.appendChild(img);
            });
        } else {
            elt.innerHTML = bag.join("");
        }
        document.getElementById("bags").appendChild(elt);
    }
}