import { useState, createContext} from 'react'
import './App.css'
import { useContext } from 'react';


const BulbContext = createContext();

function BulbProvider({ children }) {
  const [bulbState, setBulbState] = useState(true);

  return (
    <BulbContext.Provider value={{ bulbState: bulbState, setBulbState: setBulbState }}>
      {children}
    </BulbContext.Provider>
  )
}

function App() {

  return (

    <div>
      <BulbProvider>
        <LightBulb />
      </BulbProvider>
    </div>
  )
}

function LightBulb() {

  return (
    <div>
      <BulbState/>
      <ToggleBulbState/>
    </div>
  )
}

function BulbState() {
  const {bulbState} = useContext(BulbContext);

  return (
    <div>
      {bulbState ? <span style={{ color: 'green' }}>"Bulb is on" </span> : <span style={{ color: 'red' }}>"Bulb is off"</span>}
    </div>
  )

}

function ToggleBulbState() {
  const {setBulbState} = useContext(BulbContext);

  return (
    <div>
      <button onClick={() => setBulbState((prevState) => !prevState)}>Toogle the bulb</button>
    </div>
  )

}

export default App
