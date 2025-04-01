function windowLocation(link) {
    window.location.href = link;
}

function getRandomNumber() {
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

function calculate(input, output) {
    let result = 0;

    let formula = document.getElementById(input).value;
    formula = formula.replace(" ", "");
    let formulaNumbers = formula.split(/[\+\-\*\/]/);
    let formulaActions = formula.split(/[0-9]/).filter(action => action.trim() !== "");

    for (let i = 0; i < formulaNumbers.length; i++) {
        formulaNumbers[i] = parseFloat(formulaNumbers[i]);
    }

    console.log(formula);
    console.log(formulaNumbers);
    console.log(formulaActions);

    if (formulaNumbers[0] == "") {
        formulaNumbers.splice(0, 1);
    }

    for (let i = 0; i < formulaActions.length; i++) {
        if (["*", "/"].includes(formulaActions[i])) {
            let number1 = formulaNumbers[i];
            let number2 = formulaNumbers[i + 1];

            formulaNumbers.splice(i, 1);
        formulaNumbers.splice(i + 1, 1);

            if (formulaActions[i] == "*") {
                result = number1 * number2;
            } else if (formulaActions[i] == "/") {
                result = number1 / number2;
            }

            formulaNumbers.splice(i, 0, result);
        }
    }

    while (formulaActions.length > 0) {
        let number1 = formulaNumbers[0];
        let number2 = formulaNumbers[1];

        formulaNumbers.splice(0, 1);
        formulaNumbers.splice(1, 1);

        if (formulaActions[0] == "+") {
            result = number1 + number2;
        } else if (formulaActions[0] == "-") {
            result = number1 - number2;
        }

        formulaNumbers.splice(0, 0, result);
        formulaActions.splice(0, 1);
    }

    result = formulaNumbers[0];

    if (isNaN(result)) {
        result = "Bitte gib eine gültige Formel ein.";
    }

    document.getElementById(output).textContent = result;

    console.log(result);
}