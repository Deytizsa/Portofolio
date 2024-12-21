let resultField = document.getElementById("result");

function appendValue(value) {
    resultField.value += value;
}

function clearResult() {
    resultField.value = "";
}

function deleteLast() {
    resultField.value = resultField.value.slice(0, -1);
}

function calculate() {
    try {
        resultField.value = eval(resultField.value);
    } catch {
        alert("Invalid input!");
        clearResult();
    }
}

document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!isNaN(key) || "+-*/.".includes(key)) {
        appendValue(key);
    } else if (key === "Enter") {
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearResult();
    }
});
