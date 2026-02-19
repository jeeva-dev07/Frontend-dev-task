/* ==========================================================
   TASK 1: CALCULATOR APPLICATION
   - Readonly display
   - Buttons 0-9, 00, .
   - Operators +, -, *, /, %
   - Clear (C)
   - Delete (DEL)
   - Evaluate (=)
========================================================== */

// Display input
const display = document.getElementById("display");

// All calculator buttons
const buttons = document.querySelectorAll(".btn");

// Handle click for each button
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("data-value");

    // Clear all values
    if (value === "C") {
      display.value = "";
      return;
    }

    // Delete last character
    if (value === "DEL") {
      display.value = display.value.slice(0, -1);
      return;
    }

    // Evaluate expression
    if (value === "=") {
      try {
        if (display.value.trim() === "") return;

        // Evaluate the expression
        display.value = eval(display.value);
      } catch (error) {
        // Show error if invalid expression
        display.value = "Error";
      }
      return;
    }

    // Prevent multiple operators in a row
    const operators = ["+", "-", "*", "/", "%"];
    const lastChar = display.value.slice(-1);

    if (operators.includes(value) && operators.includes(lastChar)) {
      // Replace last operator with new one
      display.value = display.value.slice(0, -1) + value;
      return;
    }

    // Prevent multiple decimals in same number part
    if (value === ".") {
      const parts = display.value.split(/[\+\-\*\/\%]/);
      const lastPart = parts[parts.length - 1];

      if (lastPart.includes(".")) return;
    }

    // Append clicked value to display
    display.value += value;
  });
});
