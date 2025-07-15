import { useTelegram } from './hooks/useTelegram';
import './App.css';
import React, { useEffect } from 'react';
import Header from './components/Header/Header'

const tg = window.Telegram.WebApp;
function App() {
  const {onToggleButton , tg} = useTelegram();

  useEffect( () => {
    tg.ready() //приложение полностью инициализировалось, его можно прорисовывать
  })

  
  return (

    <div className="App">
      <Header />
      <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
