import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const resetCounter = () => {
    setCount(0);
  };

  const currentLanguage = i18n.language;

  const getClickText = () => {
    if (currentLanguage === 'ru') {
      const lastDigit = count % 10;
      const lastTwoDigits = count % 100;
      
      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return `${count} кликов`;
      }
      
      if (lastDigit === 1) {
        return `${count} клик`;
      }
      
      if (lastDigit >= 2 && lastDigit <= 4) {
        return `${count} клика`;
      }
      
      return `${count} кликов`;
    } else {
      return count === 1 ? `${count} click` : `${count} clicks`;
    }
  };

  return (
    <div className="root">
      <div className="btn-group" role="group">
        <button 
          type="button" 
          className={`btn mb-3 ${currentLanguage === 'en' ? 'btn-primary' : 'btn-outline-primary'}`} 
          data-testid="en"
          onClick={() => changeLanguage('en')}
        >
          English
        </button>
        <button 
          type="button" 
          className={`btn mb-3 ${currentLanguage === 'ru' ? 'btn-primary' : 'btn-outline-primary'}`} 
          data-testid="ru"
          onClick={() => changeLanguage('ru')}
        >
          Русский
        </button>
      </div>
      <button 
        type="button" 
        className="btn btn-info mb-3 align-self-center" 
        data-testid="counter"
        onClick={() => setCount(count + 1)}
      >
        {getClickText()}
      </button>
      <button 
        type="button" 
        className="btn btn-warning" 
        data-testid="reset"
        onClick={resetCounter}
      >
        {currentLanguage === 'ru' ? 'Сбросить' : 'Reset'}
      </button>
    </div>
  );
}

export default App;