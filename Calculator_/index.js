const display = document.getElementById("display");

function appendToDisplay(input) {
    if (display.value === "Error") {
        display.value = "";
    }
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    const expression = display.value.trim();

    if (expression === "") {
        return;
    }

    // Only allow calculator numbers, operators, decimals, and parentheses.
    if (!/^[0-9+*/().\s-]+$/.test(expression)) {
        display.value = "Error";
        return;
    }

    try {
        const result = Function('"use strict"; return (' + expression + ')')();

        if (typeof result !== "number" || !Number.isFinite(result)) {
            display.value = "Error";
            return;
        }

        display.value = String(Number(result.toPrecision(12)));
    } catch (error) {
        display.value = "Error";
    }
}
