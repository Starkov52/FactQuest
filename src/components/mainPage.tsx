import React from 'react';
import test from '../images/19197306.jpg'
import { Router as BrowserRouter,Link,useNavigate  } from 'react-router-dom';
import { MdOutlineAddBox } from "react-icons/md";
import TaskSection from '../components/usersTests'
const MainSection = () => {
    return (

            <div className='main'>
                <div className="main__information">
                <div className="main__form">
                <h1 className="main__title">Создай опрос на любую интересующую тему за пару минут!</h1>
                <ul className="main__info">
                    <li className="main__item">Создавать опросы за несколько минут — выбирайте готовые шаблоны или создавайте с нуля.</li>
                    <li className="main__item">Делать ваши опросы привлекательными — изменяйте дизайн и создавайте уникальный стиль.</li>
                    <li className="main__item">Анализировать результаты — мы автоматически собираем данные и показываем статистику в понятной форме.</li>
                </ul>
                <h1 className="main__title">Целевая аудитория,для кого подойдет?</h1>
                <ul className="main__info">
                    <li className="main__item">Для преподавателей и студентов, которым нужны опросы для обучения.</li>
                    <li className="main__item">Для организаторов мероприятий, чтобы собирать обратную связь.</li>
                    <li className="main__item">Для личных проектов — например, чтобы узнать мнение друзей.</li>
                </ul>
                </div>
            
                <img src={test} className="main__titleImage"></img>
                <Link to='/createTest' className='main__addQuizz'>
                 <MdOutlineAddBox size={40} color="blueviolet"/>
                 <p className="header__text">Создать тест</p>
                 </Link>
 
                </div>

                <div className='main__userTests'>
     <h1 className="main__testTitle">Проходи тесты других пользователей</h1>
     <div className="main__tests">
        <TaskSection></TaskSection>
        <TaskSection></TaskSection>
        <TaskSection></TaskSection>
        <TaskSection></TaskSection>
        <TaskSection></TaskSection>
       
     </div>
                 
             </div> 
            </div>
       

    )
}
export default MainSection;