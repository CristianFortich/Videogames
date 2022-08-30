import React from 'react'
import aboutStyle from '../About/About.module.css'
import linkedin from '../../pics/linkedin.jpg'

function About() {
  return (
    <>
        <div className={aboutStyle.mainBox}>
            <div className={aboutStyle.aboutPage}>
                <p><h2>About this page</h2></p>
                <p>This is an app made for learning purposes. It was build from the ground up. Database (db) with postgres, Api with Node JS and connection with the db with Sequelize. The app was created with React and JS. Since the purpose was learning, css was handled manually</p>
                <p aling='left'>This web page request information about videogames to an external api and it also allows you to "create/input" information about a game to then be saved on a db. you can search for games by name, sort them by score or name, filter the games of the internal db and the ones from the outside source.</p>
            </div>
            <div className={aboutStyle.aboutMe}>
                <p><h2>About Me</h2></p>
                <p>Full stack developer with experience in NodeJS, React, Redux, Postgres and technologies surounding web development.</p>
                <p>Name: Cristian Yezid Fortich Almanza</p>
                <p>Linkedin: <a target="_blank" className={aboutStyle.a} href='https://www.linkedin.com/in/cristian-fortich'>www.linkedin.com/in/cristian-fortich</a>
                </p>
                <p>GitHub: <a target="_blank" className={aboutStyle.a} href='https://github.com/CristianFortich'>CristianFortich</a>
                </p>
                <p>Gmail: <a target="_blank" className={aboutStyle.a} href = "mailto: yezidfortich@gmail.com">yezidfortich@gmail.com</a>
                </p>
            </div>
        </div>
    </>
  )
}

export default About