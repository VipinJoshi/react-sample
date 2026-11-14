
import { useEffect, useState } from 'react'
import './App.css'

const Card = ({ title }) => {
  const [count, setCount] = useState(0);
  const [hasLiked,setHasLiked] = useState(false);
  useEffect (()=>{
    console.log(`${title} has been ${hasLiked ? "liked": "unliked"}`)
  },[hasLiked])
  const handleLikeButtonClick =()=>{
    setHasLiked(!hasLiked);
  }
  const handleCardClick = () =>{
    setCount((prevValue)=> prevValue+1);
  }
  return <div className="card" onClick={handleCardClick}>
    <h2>{title} <br/> {count}</h2>
    <button onClick={handleLikeButtonClick} >{hasLiked? "❤️": "🤍"}</button>
  </div>
}
const  App =() => {

  return (<div className="card-container" >
  <Card title="Star Wars"/>
  <Card title="Dhurandar" />
  <Card title="DDLJ" />
  <Card title="Spider Man" />
  </div>

  )
}

export default App
