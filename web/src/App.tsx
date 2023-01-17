import './styles/global.css'
import { Habit } from './components/Habit'

function App() {
  return (
    <div>
      <Habit completed={3}/>
      <Habit completed={10}/>
      <Habit completed={20}/>
      <Habit completed={30}/>
      <Habit completed={32}/>
      <Habit completed={34}/>
      <Habit completed={35}/>
    </div>
  )
}

export default App
