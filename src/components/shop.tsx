import React,{FC, SetStateAction, useState} from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import ShopItem from './shopItem';
import OpenModal from './openModalShop';

type GradientItem = {
    color: string;
    price: number;
    description: string;
};

export type Theme = {
    question: GradientItem[];
    button: GradientItem[];
    header: GradientItem[]
};


type ConfrimProps = {
    themeObj: Theme
    setThemeObj?: React.Dispatch<SetStateAction<Theme>>
    format: string
    formatModal?: string
    setFormatModal:  React.Dispatch<SetStateAction<string>>
    card: string
}
const Shop = ({themeObj, setThemeObj, format, formatModal, setFormatModal,card}:ConfrimProps) => {
    const [active, setActive] = useState<boolean>(false)
   
    const handleActiveModalWindow = () => {
        setActive(!active)
        setFormatModal(format)
    } 
    console.log(themeObj, 'АААААААААААААААААААААААА' )
    return (
        <div className="shop">
            <div className="shop__Theme">
                <div className='shop__header'>
                <h1 className="shop__Title">{format}</h1>
                <div className="shop__FullThemes">
                    <p onClick={handleActiveModalWindow} className="shop__FullText">
                        Показать все
                    </p>
                    <FaLongArrowAltRight></FaLongArrowAltRight>
                </div>
                </div>
                <div className="shop__themesRow">
                   {
                    format === "Тема вопросов" ? (
                        themeObj.question.map((item, index) => {
                            if(index <= 2) {
                           return <ShopItem card={card} themeObj={themeObj} key={index} price={item.price} color={item.color} description={item.description} format='question' onClick={handleActiveModalWindow}></ShopItem>
                            }
                        })
                    ) : format === "Тема кнопки" ? 
                    ( themeObj.button.map((item, index) => {
                        if(index <= 2) {
                       return <ShopItem card={card} themeObj={themeObj} key={index} price={item.price} color={item.color} description={item.description} format='button'  onClick={handleActiveModalWindow}></ShopItem>
                        }
                    })) : ( themeObj.header.map((item, index) => {
                        if(index <= 2 ) {
                       return <ShopItem card={card} themeObj={themeObj} key={index} price={item.price} color={item.color} description={item.description} format='header'  onClick={handleActiveModalWindow}></ShopItem>
                        }
                    }))
                   }

                </div>
                <OpenModal card={card} format={format} themeObj={themeObj }active={active} setActive={setActive} handleChangeActiveModalWindow={handleActiveModalWindow}></OpenModal>
            </div>
            <div className="shop__questionTheme"></div>
            <div className="shop__buttonTheme"></div>
        </div>
    )
}
export default Shop