# TP4 - JavaScript DOM Manipulation & Calculator Implementation

This practical work consists of 4 exercises demonstrating various JavaScript concepts and DOM manipulation techniques.

## Exercise 1: Value Swapping

A simple implementation of swapping values between two input fields.

### Key Features:

- Uses destructuring assignment for clean value swapping
- Single button click handler
- No temporary variables needed

```javascript
function handleSubmit() {
  [inp1.value, inp2.value] = [inp2.value, inp1.value];
}
```

## Exercise 2: Basic Calculator

A basic calculator implementation supporting the four fundamental arithmetic operations.

### Key Features:

- Supports addition, subtraction, multiplication, and division
- Uses switch statement for operation selection
- Input validation with unary plus operator (+)
- Disabled output field for results

```javascript
function calc(operator = "+") {
  let result = "";
  switch (operator) {
    case "+":
      result = +inp1.value + +inp2.value;
      break;
    case "-":
      result = +inp1.value - +inp2.value;
      break;
    case "*":
      result = +inp1.value * +inp2.value;
      break;
    case "/":
      result = +inp1.value / +inp2.value;
      break;
  }
  output.value = result;
}
```

## Exercise 3: BMI Calculator

Body Mass Index (BMI) calculator with interpretation of results.

### Key Features:

- Calculates BMI using weight and height
- Provides interpretation based on WHO standards
- Results formatted to 2 decimal places
- Clear result display with interpretation

```javascript
function calc() {
  let res = +poids.value / (+taille.value) ** 2;
  let interpretation = "";
  if (res < 18.5) {
    interpretation = "Insiffisance pondérale (mairgeur)";
  } else if (res > 18.5 && res < 25) {
    interpretation = "Corpulence normale";
  } else if (res > 25 && res < 30) {
    interpretation = "Surpoids";
  } else if (res > 30 && res < 35) {
    interpretation = "Obesite moderee";
  } else if (res > 35 && res < 40) {
    interpretation = "Obesite severe";
  } else if (res > 40) {
    interpretation = "Obesite morbide ou massive";
  }
  output.innerText = `Votre IMC est de ${res.toFixed(
    2
  )}. Vous êtes en etat ${interpretation}`;
}
```

## Exercise 4: Scientific Calculator

A comprehensive scientific calculator implementation with advanced mathematical operations.

### Key Features:

#### Basic Operations

- Addition, subtraction, multiplication, division
- Decimal point handling
- Clear entry (CE) functionality
- Keyboard support

#### Scientific Functions

- Trigonometric functions (sin, cos, tan)
- Logarithmic functions (ln, log)
- Constants (π, e)
- Power functions (x², x^n, √)
- Inverse functions
- Percentage calculations

#### Advanced Features

- History tracking
- Error handling
- Inverse mode toggle
- Exponential notation support
- Parentheses support

### Key Code Examples:

#### Number Input Handling:

```javascript
function handleNumberInput(number) {
  if (lastResult !== null && !isOperatorAdded) {
    currentInput = "";
    lastResult = null;
  }
  if (currentInput === "0" && number !== "0") {
    currentInput = number;
  } else if (currentInput === "0" && number === "0") {
    return;
  } else {
    currentInput += number;
  }
  isOperatorAdded = false;
}
```

#### Calculation Result:

```javascript
function calculateResult() {
  if (!previousInput && !currentInput) return;
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(
    currentInput || (lastResult !== null ? lastResult : "0")
  );

  switch (currentOperation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        display.textContent = "Error: Division by zero";
        resetCalculator();
        return;
      }
      result = prev / current;
      break;
    case "^":
      result = Math.pow(prev, current);
      break;
    default:
      result = currentInput ? current : prev;
  }

  lastResult = result;
  currentInput = result.toString();
  // ... result handling
}
```

### Styling Highlights:

- Grid-based layout for calculator buttons
- Responsive design
- Circular buttons with hover effects
- Clear visual hierarchy
- Distinct styling for number and operator buttons

The calculator uses CSS Grid for layout:

```css
.parent {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 12px;
  max-width: 500px;
  width: 100%;
  margin: 200px auto;
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
}
```

This implementation demonstrates advanced JavaScript concepts including:

- Event handling
- DOM manipulation
- Error handling
- State management
- Mathematical operations
- Regular expressions
- Event delegation
- Keyboard integration
