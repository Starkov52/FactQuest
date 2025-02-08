import React,{FC, useContext} from 'react'
import { FaBasketShopping } from "react-icons/fa6";
import { MdCurrencyBitcoin } from "react-icons/md";
import {UserData} from '../App'
import { ImportTypeContext } from '../App';
import { Theme } from './shop';
import theme from '../themes';

export type ShopItemProps = {
    onClick?: () => void; 
    format: string
    color: string
    price: number
    description: string
    themeObj: Theme
    card: string
  };

const ShopItem = ({onClick,format,color,price, description, themeObj,card}:ShopItemProps) => {
    const context = useContext<ImportTypeContext | null>(UserData)
    const handleAddTheme = () => {
    if(context) {
    if(context.state.money >= price) {

        const {state,dispatch} = context
        const leftMoney:number = context.state.money - price 
const theme = themeObj[format as keyof typeof state.themes].filter((item) => {
    return item.description === description
})

const themeObject = {
    color: theme[0].color,
    price: theme[0].price,
    description: theme[0].description
}
const newThemes:Theme = {
    ...state.themes,
    [format as keyof typeof state.themes]: [...state.themes[format as keyof typeof state.themes], themeObject],
}
dispatch({type:'addTheme', payload: newThemes})
dispatch({type:'updateMoney', payload: leftMoney})
console.log(theme + "   " + description)
    }
}
}
    React.useEffect(() => {
        console.log(price)
    },[])
    return (
        format === 'header' && card === 'shop' ? (<div   className="shop__item">
            <div style={{background:`url(${color}) center / cover`}} className="shop__presentation"></div>
            <div className="shop__info">
                <div className="shop__priceTheme">
                    <p>{price}</p>
                    <MdCurrencyBitcoin></MdCurrencyBitcoin>
                </div>
         <p className="shop__infoTheme">{description}</p>
         <button className="shop__byTheme" onClick={handleAddTheme}><FaBasketShopping></FaBasketShopping><span>Купить</span></button>
            </div>
           </div>)  : format === 'question' && card === 'shop' || format === 'button' && card === 'shop' ? ( <div className="shop__item">
            <div style={{background: color}} className="shop__presentation"></div>
            <div className="shop__info">
                <div className="shop__priceTheme">
                    <p>{price}</p>
                    <MdCurrencyBitcoin></MdCurrencyBitcoin>
                </div>
         <p className="shop__infoTheme">{description}</p>
         <button className="shop__byTheme" onClick={handleAddTheme} ><FaBasketShopping></FaBasketShopping><span>Купить</span></button>
            </div>
            
           </div>) : format === 'header' && card === 'prewiu' ? (<div className="shop__item">
            <div style={{background:`url(${color}) center / cover`}} className="shop__presentation"></div>
            <div className="shop__info">
                <div className="shop__priceTheme">
                    <p>{price}</p>
                    <MdCurrencyBitcoin></MdCurrencyBitcoin>
                </div>
         <p className="shop__infoTheme">{description}</p>
         
            </div>
            
           </div>) : card === 'prewiu' ? (<div className="shop__item">
            <div style={{background: color}} className="shop__presentation"></div>
            <div className="shop__info">
                <div className="shop__priceTheme">
                    <p>{price}</p>
                    <MdCurrencyBitcoin></MdCurrencyBitcoin>
                </div>
         <p className="shop__infoTheme">{description}</p>
         
            </div>
            
           </div>) : null
  
    )
}
export default ShopItem