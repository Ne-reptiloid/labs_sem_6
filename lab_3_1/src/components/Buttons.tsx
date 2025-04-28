import React, { useState } from 'react';

interface ButtonsProps {
  count?: number;
}

const Buttons: React.FC<ButtonsProps> = ({ count = 3 }) => {
  const [counters, setCounters] = useState<number[]>(Array(count).fill(0));
  const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    const newCounters = [...counters];
    newCounters[index] += 1;
    setCounters(newCounters);
    setLastClickedIndex(index);
  };

  return (
    <div>
      {counters.map((counter, index) => (
        <button
          key={index}
          className={`btn m-1 ${lastClickedIndex === index ? 'btn-success' : 'btn-primary'}`}
          onClick={() => handleClick(index)}
        >
          {counter}
        </button>
      ))}
    </div>
  );
};

export default Buttons;  // Изменили на Buttons