import { useTelegram } from './hooks/useTelegram';
import './App.css';
import React, { useEffect } from 'react';
import Header from './components/Header/Header'
import { Route, Routes} from 'react-router-dom'
import Form from './components/Form/Form';
import ProductList from './components/ProductList/ProductList';

function App() {
  const {onToggleButton , tg} = useTelegram();

  useEffect( () => {
    tg.ready() //приложение полностью инициализировалось, его можно прорисовывать
  })

  
  return (

    <div className="App">
      <Header />
      <Routes>
        <Route index element = {<ProductList />}/>
        <Route path={`form`} element = {<Form/>}/>
      </Routes> 
    </div>
  );
}

export default App;
