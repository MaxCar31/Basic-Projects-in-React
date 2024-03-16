import './App.css';
import Button from './components/Button.js';
import Input from './components/Input.js';
import ButtonClear from './components/ButtonClear.js';
import { useState, useEffect, useCallback } from 'react';
import * as math from 'mathjs';

function App() {
 
  const [input, setInput] = useState('');

  const handleInput = useCallback((value) => {
    setInput(input + value);
  }, [input]);

  const handleInvert = () => {
    setInput((parseFloat(input) * -1).toString());
  };

  const handlePercentage = () => {
    setInput((parseFloat(input) / 100).toString());
  };

  const handleCalculate = useCallback(() => {
    try {
      setInput(math.evaluate(input).toString());
    } catch {
      setInput("Syntax Error");
    }
  }, [input]);

  const handleSquareRoot = () => {
    try {
      setInput(math.sqrt(parseFloat(input)).toString());
    } catch {
      setInput("Syntax Error");
    }
  };

  const handlePower = (value) => {
    setInput(input + "^" + value);
  };

  const formatNumber = (numberString) => {
    let parts = numberString.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  useEffect(() => {
  const handleKeyDown = (event) => {
    switch (event.key) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
      case '+':
      case '-':
      case '*':
      case '/':
      case '.':
      case '%':  
      case '^':  
        handleInput(event.key);
        break;
      case 'Enter':
        handleCalculate();
        break;
      case 'Escape':
        setInput('');
        break;
      case 'Backspace':
        setInput(input.slice(0, -1)); // Esto eliminará el último carácter de la entrada
        break;
      default:
        break;
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  // Limpiar el evento al desmontar el componente
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [input, handleCalculate, handleInput]); // Asegúrate de incluir 'input' en las dependencias

  return (
    <div className="App">
      <div className='title'>
      <h1>Calculator</h1>
      </div>
      <div className='contenedor-calculadora'>
      <Input input = {formatNumber(input)}/>
        <div className='fila'>
          <Button manejarClic={() => handleInput('1')}>1</Button>
          <Button manejarClic={() => handleInput('2')}>2</Button>
          <Button manejarClic={() => handleInput('3')}>3</Button>
          <Button manejarClic={() => handleInput('+')}>+</Button>
        </div>
        <div className='fila'>
          <Button manejarClic={() => handleInput('4')}>4</Button>
          <Button manejarClic={() => handleInput('5')}>5</Button>
          <Button manejarClic={() => handleInput('6')}>6</Button>
          <Button manejarClic={() => handleInput('-')}>-</Button>
        </div>
        <div className='fila'>
          <Button manejarClic={() => handleInput('7')}>7</Button>
          <Button manejarClic={() => handleInput('8')}>8</Button>
          <Button manejarClic={() => handleInput('9')}>9</Button>
          <Button manejarClic={() => handleInput('*')}>*</Button>
        </div>
        <div className='fila'>
          <ButtonClear manejarClear={() => setInput('')}>C</ButtonClear>
          <Button manejarClic={() => handleInput('0')}>0</Button>
          <Button manejarClic={() => handleInput('.')}>.</Button>
          <Button manejarClic={() => handleInput('/')}>/</Button>
        </div>
        <div className='fila'>
          <Button manejarClic={handleInvert}>+/-</Button>
          <Button manejarClic={handlePercentage}>%</Button>
          <Button manejarClic={() => handlePower('')}>^</Button>
          <Button manejarClic={handleSquareRoot}>√</Button>
          <Button manejarClic={handleCalculate}>=</Button>
        </div>
        <div className='fila'>
          
          
        </div>
      </div>
    </div>
  );
}

export default App;