function windowlocation(link) {
    window.location.href = link;
}

function getInput() {
    const min = parseInt(document.getElementById("min").value);
    const max = parseInt(document.getElementById("max").value);

    if (min > max) {
        const temp = min;
        min = max;
        max = temp;
    }

    const number = random(min, max);

    if (!isNaN(number)) {
        document.getElementById("output").textContent = number;
    } else {
        document.getElementById("output").textContent = "Bitte gib gültige Zahlen ein.";
    }
}

function random(min, max) {
    const number = Math.floor(Math.random() * (max - min + 1) + min)
    return number
}

function tell(say) {
    document.getElementById("output").textContent = say[random(0, say.length - 1)];
}