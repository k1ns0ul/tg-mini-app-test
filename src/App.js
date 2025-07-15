import './App.css';
import React, { useEffect } from 'react';

const tg = window.Telegram.WebApp;
function App() {
  useEffect( () => {
    tg.ready() //приложение полностью инициализировалось, его можно прорисовывать
  })

  const onClose = () => {
    tg.close()
  }
  return (
    <div className="App">
      work
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
