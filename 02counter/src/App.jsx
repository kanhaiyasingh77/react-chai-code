import { useState } from 'react'

import './App.css'

function App() {

  let [Counter, setCounter] = useState(10)

  //let Counter = 5;

  const addValue = () => {
    
    //Counter = Counter +1
    //console.log("value added", Counter);
    if(Counter <20 ) {
      setCounter(Counter + 1);
    }
    
  }

  const removeValue = () => {
    if (Counter > 0 ){
    setCounter(Counter - 1)
  }
  }

  return (
    <>
   <h1>chai aur react</h1>
   <h2>Counter value: {Counter}</h2>

   <button
   onClick={addValue}>Add value</button><br></br>
   <button
   onClick={removeValue}>Remove value</button>
    </>
  )
}

export default App
