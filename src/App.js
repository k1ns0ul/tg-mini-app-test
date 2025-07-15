import { useTelegram } from '../hooks/useTelegram';
import './App.css';
import React, { useEffect } from 'react';

const tg = window.Telegram.WebApp;
function App() {
  const {onToggleButton , tg} = useTelegram();

  useEffect( () => {
    tg.ready() //приложение полностью инициализировалось, его можно прорисовывать
  })

  
  return (
    <div className="App">
      <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
