import React, { useEffect, useState } from "react";
import "./Calculator.css";

// FIXME: set autoscale width to new state, and scale it by means of the state, not querySelector
// FIXME: instead of HTML and CSS class tags, use mapping method to render each element

function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [scale, setScale] = useState(1);
  
  const operations = {
    "/": (previousValue, nextValue) => previousValue / nextValue,
    "*": (previousValue, nextValue) => previousValue * nextValue,
    "+": (previousValue, nextValue) => previousValue + nextValue,
    "-": (previousValue, nextValue) => previousValue - nextValue,
    "=": (previousValue, nextValue) => nextValue
  };

  function inputDigit(digit) {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
    displayValue === "0" ? setDisplayValue(String(digit)) : setDisplayValue(displayValue + String(digit));
    }
  };

  function inputDecimal() {
    if (waitingForOperand) {
      setDisplayValue("0.");
      setWaitingForOperand(false);
    } else if (displayValue.indexOf(".") === -1) {
      setDisplayValue(displayValue + ".");
      setWaitingForOperand(false);
    }
  };

  function clearDisplay() {
    setDisplayValue("0");
    setWaitingForOperand(false);
    setOperator(null);
    setPreviousValue(null);
  };

  function toggleSign() {
    const newValue = parseFloat(displayValue) * -1;
    setDisplayValue(String(newValue));
  };

  function inputPercentage() {
    const currentValue = parseFloat(displayValue);
    if (currentValue === 0) return;
    setDisplayValue(String(currentValue / 100));
  };

  function performOperation(operatorType) {
    const input = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(input);
    }

    else if (operator) {
      const currentValue = previousValue || 0;
      const newValue = operations[operator](currentValue, input);
      
      setPreviousValue(newValue);
      setDisplayValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(operatorType);
  };

  function autoScaleDisplay() {
    const actualWidth = document.querySelector(".display").offsetWidth;
    const availableWidth = document.querySelector(".calculator").offsetWidth;
    const actualScale = availableWidth / actualWidth;
    
    if (scale === actualScale) return;
    if (actualScale < 1) {
      setScale(actualScale);
    }
    else if (scale < 1) {
      setScale(1);
    }
  };

  useEffect(() => {
    autoScaleDisplay();
  }, [displayValue]);

  return (
    <div className="calculator">
      <div
        className="display"
        style={{ transform: `scale(${scale}, ${scale})` }}
      >
        { displayValue }
      </div>
      <div className="keypad">
        <button className="btn function" onClick={() => clearDisplay()}>AC</button>
        <button className="btn function" onClick={() => toggleSign()}>+/-</button>
        <button className="btn function" onClick={() => inputPercentage()}>%</button>
        <button className="btn operator" onClick={() => performOperation("/")}>÷</button>
        <button className="btn digit" onClick={() => inputDigit(7)}>7</button>
        <button className="btn digit" onClick={() => inputDigit(8)}>8</button>
        <button className="btn digit" onClick={() => inputDigit(9)}>9</button>
        <button className="btn operator" onClick={() => performOperation("*")}>x</button>
        <button className="btn digit" onClick={() => inputDigit(4)}>4</button>
        <button className="btn digit" onClick={() => inputDigit(5)}>5</button>
        <button className="btn digit" onClick={() => inputDigit(6)}>6</button>
        <button className="btn operator" onClick={() => performOperation("-")}>−</button>
        <button className="btn digit" onClick={() => inputDigit(1)}>1</button>
        <button className="btn digit" onClick={() => inputDigit(2)}>2</button>
        <button className="btn digit" onClick={() => inputDigit(3)}>3</button>
        <button className="btn operator" onClick={() => performOperation("+")}>+</button>
        <button className="btn digit key-0" onClick={() => inputDigit(0)}>0</button>
        <button className="btn digit" onClick={() => inputDecimal()}>.</button>
        <button className="btn operator" onClick={() => performOperation("=")}>=</button>
      </div>
    </div>
  );
};

export default Calculator;