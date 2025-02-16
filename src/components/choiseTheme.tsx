import React,{SetStateAction, useContext, useEffect, useState} from 'react'
import { BrowserRouter as Router,Link,Route,Routes, useNavigate} from 'react-router-dom'
import { ImportTypeContext, readyTest } from '../App'
import { UserData } from '../App'
import { IoClose } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { GradientItem } from './shopSection';
import theme from '../themes';
type ConfrimThemes = {
   
    choiseForma?: string
    setIsThemeActive: (t:boolean) => void
    setCountQuestion: React.Dispatch<SetStateAction<readyTest>>
    countQuestion: readyTest
}
function ChoiseTheme({ choiseForma, setIsThemeActive, setCountQuestion,countQuestion}:ConfrimThemes)  {
    const context = useContext<ImportTypeContext | null>(UserData)
    const state = context

    const navigate = useNavigate()
const handleChangeChoiseThemeWindow = () => {
    setIsThemeActive(false)
 
}
const [choiseFormat,setChoiseFormat] = useState('header')
const HandleChangeTheme = (format:string, theme:string) => {
const newTheme:any = {
...countQuestion[4],
[format]: theme
}
setCountQuestion([
countQuestion[0],
countQuestion[1],
countQuestion[2],
countQuestion[3],
newTheme,
countQuestion[5],
countQuestion[6],
countQuestion[7],
countQuestion[8]
])
}

/*
useEffect(() => {
navigate('/createTest/titleTheme')
},[])
*/

return (
    <div className="choiseTheme">
        <header className='choiseTheme__header'>
            <div className='choiseTheme__nav'>
            <p onClick={() => setChoiseFormat('header')} className='choiseTheme__navItem'>Заголовок</p>
            <p onClick={() => setChoiseFormat('question')}className='choiseTheme__navItem'>Вопросы</p>
            <p onClick={() => setChoiseFormat('button')}className='choiseTheme__navItem'>Кнопка</p>
            </div>
<IoClose onClick={handleChangeChoiseThemeWindow} size={40} color='black'></IoClose>
        </header>
        <div className="choiseTheme__content"><h1 className="choiseTheme__title">Выберите тему для {choiseFormat}</h1>
<div className='choiseTheme__row'>
{
     choiseFormat === "header" ? (state?.state.themes.header.map((item,index) => {
       if(item.color === countQuestion[4].header) {
        return <div  onClick={() => HandleChangeTheme(choiseFormat, item.color)} key={index} style={{background: `url(${item.color}) center / cover`}} className='choiseTheme__item'><IoMdCheckmarkCircleOutline size={30} color='green'></IoMdCheckmarkCircleOutline></div>
       } else {
        return <div  onClick={() => HandleChangeTheme(choiseFormat, item.color)} key={index} style={{background: `url(${item.color}) center / cover`}} className='choiseTheme__item'></div>
       }
    })):  
    choiseFormat === "question" ? (state?.state.themes.question.map((item,index) => {
        if(item.color === countQuestion[4].question) { 
            return <div  onClick={() => HandleChangeTheme(choiseFormat, item.color)}key={index} style={{background: item.color}} className='choiseTheme__item'><IoMdCheckmarkCircleOutline size={30} color='green'></IoMdCheckmarkCircleOutline></div>
        } else {
        return <div  onClick={() => HandleChangeTheme(choiseFormat, item.color)}key={index} style={{background: item.color}} className='choiseTheme__item'></div>
        }
    })) : choiseFormat === "button" ? (state?.state.themes.button.map((item,index) => {
        if(item.color === countQuestion[4].button) {
            return <div  onClick={() => HandleChangeTheme(choiseFormat, item.color)} key={index} style={{background: item.color}} className='choiseTheme__item'><IoMdCheckmarkCircleOutline size={30} color='green'></IoMdCheckmarkCircleOutline></div>
        } else {
        return <div  onClick={() => HandleChangeTheme(choiseFormat, item.color)} key={index} style={{background: item.color}} className='choiseTheme__item'></div>
        }
    })): null
    
    }

</div>
</div>
    </div>
)
}
export default ChoiseTheme