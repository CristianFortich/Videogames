import React from 'react'
import { useHistory } from 'react-router-dom'
import lpStyle from './LandingPage.module.css'
import BG from '../../pics/MB.jpg'

const LandingPage = (props) => {
    const history = useHistory()
    return (
    <div style={{ backgroundImage: `url(${BG})` }} className={lpStyle.mainBox}>
      <p aling='center'>
        <button onClick={()=>history.push("/home")} className={lpStyle.enterButton}>Enter</button>
      </p>
    </div>
  )
}

export default LandingPage;