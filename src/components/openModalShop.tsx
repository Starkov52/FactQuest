import React, { SetStateAction,forwardRef } from 'react'
import { IoIosClose } from "react-icons/io";
import ShopItem from './shopItem';
import { ShopItemProps } from './shopItem';
import { Theme } from './shop';
type Active ={
 active: boolean,
setActive:  React.Dispatch<SetStateAction<boolean>>,
handleChangeActiveModalWindow: () => any;
themeObj: Theme,
format: string,
card: string,
ref: HTMLDivElement
}
const openModal =  forwardRef<HTMLDivElement,Active>(({themeObj,active, setActive,handleChangeActiveModalWindow, format, card},ref) =>{
    
    return (
        <div ref={ref} style={{
            display: active ? 'flex' : 'none'
        }}className="openModal">
            <div className="openModal__header">
            <p className="openModal__textInfo">{format}</p>
            <IoIosClose  className="openModal__close" onClick={handleChangeActiveModalWindow} size='50'></IoIosClose>
            </div>
            <div className="openModal__row">
            {
                    format === "Тема вопросов" ? (
                        themeObj.question.map((item, index) => {
                         
                           return <ShopItem card={card} themeObj={themeObj} key={index} price={item.price} color={item.color} description={item.description} format='question' ></ShopItem>
                        
                        })
                    ) : format === "Тема кнопки" ? 
                    ( themeObj.button.map((item, index) => {
                       
                       return <ShopItem  card={card}themeObj={themeObj} key={index} price={item.price} color={item.color} description={item.description}format='button'  ></ShopItem>
                       
                    })) : ( themeObj.header.map((item, index) => {
                
                       return <ShopItem card={card}themeObj={themeObj} key={index} price={item.price} color={item.color} description={item.description}format='header'  ></ShopItem>
                    
                    }))
                   }

            </div>
        </div>
    )
})
export default openModal