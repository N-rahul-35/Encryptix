var buttons = document.getElementsByClassName("button");
var display = document.getElementById("display");

var operand1 = null;
var operand2 = null;
var operator = null;
var awaitingSecondOperand = false;

function isOperator(value) {
    return ["+", "-", "*", "/"].includes(value);
}

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {

        var value = this.getAttribute('data-value');
        var text = display.textContent.trim();

        if (isOperator(value)) {
            // Only set operator if there's already an operand1 selected
            if (operand1!== null) {
                operator = value;
                awaitingSecondOperand = true;
            }
            // Do not change the display for operator clicks
            return;
        } else if (value == "ac") {
            display.textContent = "";
            operand1 = null;
            operand2 = null;
            operator = null;
            awaitingSecondOperand = false;
        } else if (value == "=") {
            // Perform calculation only if both operands and an operator are present
            if (operator!== null && operand1!== null && operand2!== null) {
                var result = eval(operand1 + ' ' + operator + ' ' + operand2);
                display.textContent = result.toString(); // Ensure the result is treated as a string
                operand1 = parseFloat(result); // Update operand1 with the result for chaining operations
                operand2 = null;
                operator = null;
                awaitingSecondOperand = false;
            }
        } else {
            // Handle number input
            var currentOperandText = awaitingSecondOperand? operand2 : operand1;
            if (currentOperandText === null || currentOperandText === 0) { // Initialize or reset the operand if it hasn't been set yet or is zero
                display.textContent = value; // Directly set the display to the clicked digit
                currentOperandText = parseFloat(value);
            } else {
                display.textContent += value; // Append the clicked digit
                currentOperandText = parseFloat(display.textContent); // Update the operand value based on the display
            }

            // Store the current operand's value
            if (awaitingSecondOperand) {
                operand2 = currentOperandText;
            } else {
                operand1 = currentOperandText;
            }
        }
    });
}
