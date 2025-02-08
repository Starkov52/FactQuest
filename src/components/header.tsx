import React,{forwardRef} from 'react';
import { MdOutlineAddBox } from "react-icons/md";
import { MdOutlineAccountBox } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { BsFillQuestionDiamondFill } from "react-icons/bs";
import { FaGithub } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { TbMapQuestion } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { FaSun } from "react-icons/fa6";
import {BrowserRouter as Router,Link,Route,Routes} from 'react-router-dom';
import { FaRegRectangleList } from "react-icons/fa6";
import UserTests from './userTests';
import {UserData} from '../App'
import { ImportTypeContext } from '../App';
import { FaMoon } from "react-icons/fa6";
const Header = forwardRef<HTMLDivElement,{}>((props,ref) => {
      
         const context = React.useContext(UserData)
         if(!context) {
            throw new Error('КОНТЕКСТ НЕ НАЙДЕН')
         }
         const {state, dispatch} = context
      const handleToggleTheme = () => {
   dispatch({type: 'changeTheme', payload: !state.headerTheme} )
   console.log(state)
      }
    return (
            <div className='container'>
        <div ref={ref}className='header'>
            <nav className="header__nav">
             
               <Link to="/createTest" className='header__addQuizze'>
 <MdOutlineAddBox size={40} color="blueviolet"/>
 <p className="header__text">Создать тест</p>

 </Link>
 <Link to='/profile' className="header__profile">
    <MdOutlineAccountBox size={40} color='blueviolet'></MdOutlineAccountBox>
    <p className="header__profileName">Аккаунт</p>
 </Link>
 <Link  to='/shopSection' className="header__shopTheme">
    <BsShop size={40} color='gray'></BsShop>
    <p className="header__shopTitle">Магазин</p>
 </Link>
 <Link to="/userTests" className="header__shopTheme">
    <FaRegRectangleList size={40} color='gray'></FaRegRectangleList>
    <p className="header__shopTitle">Мои тесты</p>
 </Link>
 </nav>
 <Link to="" className="header__productLogo">
    <BsFillQuestionDiamondFill size={40} color='purple'></BsFillQuestionDiamondFill>
    <h1 className="header__logoTitle">FactQuest</h1>
 </Link>
 <nav className="header__navAlso">
 <a href="https://github.com/Starkov52" className="header__gitHubLink">
 <FaGithub className="header__gitHubLink" size={40} color='black'></FaGithub>
 </a>
 <Link to="testsAlready" className="header__quests">
    <TbMapQuestion  size={40} color='white'></TbMapQuestion>
    <p className="header__questsText">Тесты</p>
 </Link>
 {state.headerTheme ? (
 <FaSun onClick={handleToggleTheme} size={40} color="yellow"></FaSun>) : <FaMoon onClick={handleToggleTheme} size={40} color="yellow"></FaMoon>
}
 </nav>
        </div>
        </div>
    )
})
export default Header