console.log("Script loaded.");

function windowLocation(link) {
    window.location.href = link;
}

function getInput(id) {
    return document.getElementById(id).value;
}

function deleteClonedObjekt(tempid) {
    let id = 0;

    if (tempid == "letcloneCount") {
        if (cloneCount == 0) {
            return;
        }
        id = "ingredient" + cloneCount;
    } else {
        id = tempid;
    }

    console.log(id);
    document.getElementById(id).remove();

    if (cloneCount > 1) {
        cloneCount--;
    }
}

function getRandomNumber(output) {
    let min = parseInt(document.getElementById("min").value);
    let max = parseInt(document.getElementById("max").value);

    if (min > max) {
        const temp = min;
        min = max;
        max = temp;
    }

    const number = random(min, max);

    if (!isNaN(number)) {
        document.getElementById(output).textContent = number;
    } else {
        document.getElementById(output).textContent = "Bitte gib gültige Zahlen ein.";
    }
}

function random(min, max) {
    const number = Math.floor(Math.random() * (max - min + 1) + min)
    return number
}

function tell(say, output) {
    document.getElementById(output).textContent = say[random(0, say.length - 1)];
}

function addText(add, id) {
    const element = document.getElementById(id);

    if (element.tagName == "P" || element.tagName == "H1" || element.tagName == "H2" || element.tagName == "H3" || element.tagName == "H4" || element.tagName == "H5" || element.tagName == "H6" || element.tagName == "H7" || element.tagName == "H8") {
        element.textContent += add;
    }else if (element.tagName == "INPUT") {
        element.value += add;
    }
}

function calculate(input, output) {
    let temp = document.getElementById(input).value;
    
    if (temp.includes("(")) {
        let tempFormula = temp.match(/\((.*?)\)/g).map(item => item.slice(1, -1));

        let resultes = [];

        console.log("#####################################################: " + tempFormula[0]);

        for (let i = 0; i < tempFormula.length; i++) {
            resultes.push(calculatePart(tempFormula[i]));
        }
        
        for (let i = 0; i < resultes.length; i++) {
            temp = temp.replace("(" + tempFormula[i]  + ")", resultes[i]);
        }
    }

    let result = calculatePart(temp);

    document.getElementById(output).textContent = result;

    console.log(result);
}

function calculatePart(temp) {
    let result = 0;
    const formula = (temp.replace(/ /g, "")).replace(/,/g, ".");
    let formulaNumbers = formula.split(/[\+\-\*\/]/);
    let formulaActions = formula.split(/[0-9.]/).filter(action => action.trim() !== "");

    for (let i = 0; i < formulaNumbers.length; i++) {
        formulaNumbers[i] = parseFloat(formulaNumbers[i]);
    }

    console.log(formula);
    console.log("Nummer Komponenten: " + formulaNumbers.toString());
    console.log("Rechenzeichen Komponenten: " + formulaActions.toString());

    if (formulaNumbers[0] == "") {
        formulaNumbers.splice(0, 1);
    }

    let tempFormulaActionsLength = formulaActions.length - 1;
    let tempFormulaActions = formulaActions;
    tempFormulaActions.reverse();
    let tempFormulaNumbers = formulaNumbers;
    tempFormulaNumbers.reverse();

    for (let i = tempFormulaActionsLength; i >= 0; i--) {
        console.log(tempFormulaActions[i]);

        if (["*", "/"].includes(formulaActions[i])) {
            let number1 = tempFormulaNumbers[i + 1];
            let number2 = tempFormulaNumbers[i];

            console.log("Nummer 1: " + number1);
            console.log("Nummer 2: " + number2);

            tempFormulaNumbers.splice(i, 1);
            tempFormulaNumbers.splice(i, 1);

            if (tempFormulaActions[i] == "*") {
                result = number1 * number2;
                console.log("Multiplikation: " + result);
            } else if (tempFormulaActions[i] == "/") {
                result = number1 / number2;
                console.log("Division: " + result);
            }

            tempFormulaActions.splice(i, 1);
            tempFormulaNumbers.splice(i, 0, result);

            console.log("Nummer Komponenten: " + tempFormulaNumbers.toString());
            console.log("Rechenzeichen Komponenten: " + tempFormulaActions.toString());
        }
    }

    tempFormulaActions.reverse();
    formulaActions = tempFormulaActions;
    tempFormulaNumbers.reverse();
    formulaNumbers = tempFormulaNumbers;

    while (formulaNumbers.length > 1) {
        let number1 = formulaNumbers[0];
        let number2 = formulaNumbers[1];

        
        formulaNumbers.splice(1, 1);
        formulaNumbers.splice(0, 1);

        if (formulaActions[0] == "+") {
            result = number1 + number2;
            console.log("Addition: " + result);
        } else if (formulaActions[0] == "-") {
            result = number1 - number2;
            console.log("Subtraktion: " + result);
        } else {
            result = "Ein Fehler ist aufgetreten.";
            console.log(result);
        }

        formulaNumbers.splice(0, 0, result);
        formulaActions.splice(0, 1);
        
        console.log("Nummer Komponenten: " + formulaNumbers.toString());
        console.log("Rechenzeichen Komponenten: " + formulaActions.toString());
    }

    result = formulaNumbers[0];

    if (result == "Ein Fehler ist aufgetreten."){
    }else if (isNaN(result)) {
        result = "Bitte gib eine gültige Formel ein.";
    }

    return result;
}