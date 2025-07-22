import './App.css'
import { useState } from 'react'

function App() {
  const [color, setColor] = useState("black")
  const name = "Omar"
  const colors = ["black", "white"]
  const [index, setIndex] = useState(0)
  const handleClick = () => {
    const nextIndex = (index + 1) % colors.length
    setIndex(nextIndex)
    setColor(colors[nextIndex])
  }

  return (
    <>
      <div style={{ backgroundColor: 'gray', minHeight: '100vh' }}>
        <header style={{ backgroundColor: 'green' }}>
          <div style={{ textAlign: 'center' }}>
            <img src={'/tech-hub-logo-01.png'} alt="Tech Hub Logo" width="360" height="300" />
          </div>
        </header>

        <div style={{ paddingTop: 50, paddingBottom: 100 }}>
          <p style={{ textAlign: 'center', fontFamily: 'Times New Roman', fontSize: 'xx-large' }}>
            My name is <span style={{ color }}>{name}</span>
          </p>
          <p style={{ paddingRight: 100, paddingLeft: 100, textAlign: 'center', fontFamily: 'Times New Roman', fontSize: 'xx-large' }}>
            I have programming hobbies
          </p>
          <div style={{ textAlign: 'center' }}>
            <button onClick={handleClick}>Change Name Color</button>
          </div>
        </div>

        <footer style={{ backgroundColor: 'black', paddingTop: 100 }}>
          <div>
            <p style={{ color: 'blanchedalmond' }}>2025 tech hub</p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
