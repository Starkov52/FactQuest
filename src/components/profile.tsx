import React,{useContext, useEffect, useState} from 'react'
import { FaBitcoin } from "react-icons/fa6";
import { SiGoogleforms } from "react-icons/si";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa6";
import { LuPaintbrush } from "react-icons/lu";
import { BrowserRouter as Router,Link } from 'react-router-dom';
import image from '../images/person_11681696.png'
import Shop from './shop';
import {UserData} from '../App'
import { ImportTypeContext } from '../App';
import { Theme } from './shop';

function Profile() {
    const context = useContext<ImportTypeContext | null>(UserData)
const [themeObj, setThemeObj] = useState<Theme>({
    question: [{color:'333', description:'333',price:5}],
    button: [{color:'333', description:'333',price:5}],
    header: [{color:'333', description:'333',price:5}]
})
useEffect(() => {
    if (context) {
        const state = context
        const themes = state.state.themes 
        setThemeObj({
         question: themes.question,
    button: themes.button,
    header: themes.header
        });
    }
}, [context]);
useEffect(() => {
    console.log("themeObj:", themeObj);
}, [themeObj]);

    const [formatModal, setFormatModal] = useState<string>('none')
    return (
        <div className='profile'>
            <div className='profile__inner'>
                <div className="profile__nameImgContainer">
                <img src={image} className='profile__image'></img>
                <h1 className='profile__login'>{context?.state.name}</h1>
                </div>
                <div className='prtofile__content'>
                  
                    <div className='profile__contentInfo'>
                        <p className='profile__text'>Информация аккаунта</p>
                        <div className="profile__contentInfoItem">
<SiGoogleforms></SiGoogleforms>
<p className='profile__contentInfoItemText'>Количество созданных <Link to='/userTests'>тестов:{ context?.state?.tests?.length !== 0 ? context?.state?.tests?.length: 0}</Link></p>
                        </div>
                        <div className="profile__contentInfoItem">
<IoCheckmarkCircleSharp></IoCheckmarkCircleSharp>
<p className='profile__contentInfoItemText'>Количество пройденных тестов</p>
                        </div>
                        <div className="profile__contentInfoItem">
<FaArrowUp></FaArrowUp>
<p className='profile__contentInfoItemText'>Общий рейтинг <Link to=''>тестов</Link><span>(5/10)</span></p>
                        </div>
                        <div className="profile__contentInfoItem">
<LuPaintbrush></LuPaintbrush>
<p className='profile__contentInfoItemText'>Количество купленных <Link to=''>{context?.state.themes.button.length && context?.state.themes.question.length && context?.state.themes.header.length >= 0 ? (context?.state.themes.button.length + context?.state.themes.question.length + context?.state.themes.header.length) - 3 : 'жопа'}</Link></p>
                        </div>
                    </div>
                </div>
                <div className='profile__countCoins'>
<FaBitcoin color='yellow' size='40'></FaBitcoin>
<p className='profile__countCoinsInfo'>{context?.state.money}</p>
                </div>
            </div>
           
            <div className='profile__themes'>
            <h1 className="profile__title">Список купленных тем</h1>
        <Shop  card='prewiu'formatModal={formatModal} setFormatModal={setFormatModal} themeObj={themeObj} format="Тема заголовка"></Shop>
        <Shop  card='prewiu' formatModal={formatModal} setFormatModal={setFormatModal} themeObj={themeObj}  format="Тема вопросов"></Shop>
        <Shop  card='prewiu'formatModal={formatModal} setFormatModal={setFormatModal} themeObj={themeObj} format="Тема кнопки"></Shop>
            </div>
           
        </div>
    )
}
export default Profile