import './App.css'
import { FB_AUTH_URL } from './config/config'

function App() {

  
  return (
    <>
      <button onClick={()=> window.open(FB_AUTH_URL)}>Login</button>
    </>
  )
}

export default App
