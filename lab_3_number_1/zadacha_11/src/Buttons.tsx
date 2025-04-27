import React, { useState } from 'react';
import cn from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css'; // Импортируем Bootstrap CSS

const renderButton = (index, count, activeIndex, handleClick) => {
  const className = cn(
    'btn m-1',
    {
      'btn-outline-primary': activeIndex !== index && !activeIndex, // Кнопка синего цвета с белым текстом
      'btn-primary': activeIndex !== index && activeIndex !== null, // Кнопка синего цвета с белым текстом при наведении
      'btn-success': activeIndex === index, // Нажатая кнопка зеленого цвета
    },
    'text-white' // Текст белого цвета на всех кнопках
  );

  return (
    <button
      key={index}
      type="button"
      className={className}
      onClick={handleClick}
    >
      {count}
    </button>
  );
};

const Buttons = ({ count = 5 }) => {
  const initButtonsState = {
    active: null,
    counts: Array(count).fill(0),
  };

  const [buttonsState, setButtonsState] = useState(initButtonsState);

  const generateHandler = (index) => () => {
    setButtonsState((prevState) => ({
      ...prevState,
      active: index,
      counts: prevState.counts.map((value, i) => (i === index ? value + 1 : value)),
    }));
  };

  const { active, counts } = buttonsState;

  return counts.map((buttonCount, index) => (
    renderButton(index, buttonCount, active, generateHandler(index))
  ));
};

export default Buttons;