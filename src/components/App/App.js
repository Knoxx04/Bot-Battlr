import BotCollection from '../Bots/BotCollection';
import './App.css';
import { useState, useEffect } from 'react';
import YourBotArmy from '../Bots/YourBotArmy';

const BOT_URL = "https://api.npoint.io/ab642728b2a35d41ad78"

function App() {

  const [allbots, setAllBots] = useState([])
  const [yourBot, setYourBot] = useState([])

  useEffect(() => {
      fetch(BOT_URL)
      .then((response) => response.json())
      .then((data) => {
          setAllBots(data.bots)
      })
  }, [])

  function addBot(bot) {
  
    if(!yourBot.find(bots => bots.id === bot.id)) {
    setYourBot([...yourBot, bot])
    }
  }

  function retireBot(bot) {
    const newBot = yourBot.filter(delbot => delbot.id !== bot.id)
    setYourBot(newBot)
    
  }

  function handleClick(bot) {
    fetch(`BOT_URL${bot.id}`, {
      method: 'DELETE',
    }).then(() => {
      setAllBots((allbots) => allbots.filter((bt) => bt.id !== bot.id))
      setYourBot((yourBot) => yourBot.filter((x) => x.id !== bot.id))
    })
  }

  return (
    <div className="App">
      <div className='top'>
        <YourBotArmy props={yourBot} retireBot={retireBot} handleClick={handleClick}/>
      </div>
      <div className='bottom'>
        <BotCollection props={allbots} addBot={addBot} handleClick={handleClick}/>
      </div>
    </div>
  );
}

export default App;
