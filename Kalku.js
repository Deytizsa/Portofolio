let resultField = document.getElementById("result");

// Append value to the display
function appendValue(value) {
    resultField.value += value;
}

// Clear the display
function clearResult() {
    resultField.value = "";
}

// Delete the last character
function deleteLast() {
    resultField.value = resultField.value.slice(0, -1);
}

// Calculate the result
function calculate() {
    try {
        resultField.value = eval(resultField.value);
    } catch {
        alert("Invalid input!");
        clearResult();
    }
}

// Add keyboard functionality
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
