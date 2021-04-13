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

function sevenbag(){
    document.getElementById("bag").innerHTML=shuffleArray("itszljo".split("")).join("");
}