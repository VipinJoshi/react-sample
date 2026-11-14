
import { useState } from 'react'
import './App.css'

const Card = ({title}) =>{
  const [hasLiked,setHasLiked] = useState(false);
  const handleLikeButtonClick =()=>{
    setHasLiked(!hasLiked);
  }
  return <div className="card">
    <h2>{title}</h2>
    <button onClick={handleLikeButtonClick} >{hasLiked? "❤️": "🤍"}</button>
  </div>
}
const  App =() => {

  return (<div className="card-container">
  <Card title="Star Wars"/>
  <Card title="Dhurandar" />
  <Card title="DDLJ" />
  <Card title="Spider Man" />
  </div>

  )
}

export default App
