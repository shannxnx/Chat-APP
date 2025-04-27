import { useState } from 'react'
import Signup from './components/signup'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div className=''>

      <Signup/>

    </div>
    
  )
}

export default App
