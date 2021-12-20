import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [api, setApi ] = useState(null);
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    const balance = await api.get_balance().then(balance => {
      setBalance(balance)
    })
  }

  useEffect(() => {
    window.cardano.yoroi.enable({ requestIdentification: false, onlySilent: false }).then(
      api => {
        console.log('successful silent reconnection')
        setApi(api)
      },
      err => {
        if (String(err).includes('onlySilent:fail')) {
          console.log('no silent re-connection available');
        } else {
          console.error('Silent reconnection failed for unknown reason!', err);
        }
      }
    );
  })
  
  return (
    <div>
      <div>Balance: {balance} </div>
      <button onClick={getBalance} disabled={!api}>
        Get balance
      </button>
      <div>2</div>
    </div>
  );
}

export default App;


