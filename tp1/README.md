# JavaScript Exercises Collection

This repository contains a collection of JavaScript exercises demonstrating various programming concepts.

## Exercise List

### 1. Temperature Converter

- Function: `degreC(tempF)`
- Converts temperature from Fahrenheit to Celsius
- Displays result with one decimal place

### 2. Time Duration Converter

- Function: `hjms(seconds)`
- Converts seconds into days, hours, minutes, and seconds
- Handles plural forms correctly
- Example: `hjms(3621)` outputs duration in readable format

### 3. Number Sorting

- Functions: `sort()`
- Takes 3 numbers as input via prompt
- Sorts them in ascending order
- Uses selection sort algorithm

### 4. Pattern Printing

- Two pattern printing exercises:
  1. Triangle pattern with asterisks
  2. Pyramid pattern with spaces and asterisks
- Takes size input from user

### 5. Prime Number Checker

- Function: `premier(number)`
- Checks if a given number is prime
- Returns boolean value

### 6. Fibonacci Series

Two implementations:

1. `fibo1(number)`
   - Returns the nth term of Fibonacci sequence
2. `fibo2(number)`
   - Finds first Fibonacci number greater than input
   - Returns both the number and its position

### 7. Square Root Approximation

- Function: `Raca1(A)`
- Implements numerical method to approximate square root
- Uses recursive formula: uₙ₊₁ = ½(uₙ + A/uₙ)
- Works for numbers between 1 and 100
- Achieves precision of 10⁻⁵

## Usage

Each exercise can be tested by running the main.js file. Some exercises require user input through prompts.

## Input Requirements

- Temperature: Any numeric value in Fahrenheit
- Time: Positive integer representing seconds
- Numbers for sorting: Any three numbers
- Pattern size: Positive integer
- Prime check: Any positive number
- Fibonacci: Positive integer
- Square root: Number between 1 and 100

## Output Examples

```javascript
// Temperature conversion
degreC(60.0); // "cette température équivaut a 15.6 degrés Celsius"

// Time conversion
hjms(3621); // "cette durée équivaut à 1 hour, 0 minute, 21 seconds"

// Square root approximation
Raca1(19.23); // ≈ 4.385202389856321
```
