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
        document.getElementById("random").textContent = number;
    } else {
        document.getElementById("random").textContent = "Bitte gib gültige Zahlen ein.";
    }
}

function random(min, max) {
    const number = Math.floor(Math.random() * (max - min + 1) + min)
    return number
}