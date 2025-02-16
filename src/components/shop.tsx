import React,{FC, SetStateAction, useState,useRef} from 'react'
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
   const modal = useRef<HTMLDivElement>(null)

  const handleActiveModalWindow = () => {
    if (modal.current) {
      if (active) {
        modal.current.style.transform = "translateY(900px)"; 
        setTimeout(() => setActive(false), 2000); 
      } else {
       
        setActive(true);
        setFormatModal(format);
        setTimeout(() => {
          if (modal.current) modal.current.style.transform = "translateY(0)"; 
        }, 50);
      }
    }
  };
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
                <OpenModal ref={modal}card={card} format={format} themeObj={themeObj }active={active} setActive={setActive} handleChangeActiveModalWindow={handleActiveModalWindow}></OpenModal>
            </div>
            <div className="shop__questionTheme"></div>
            <div className="shop__buttonTheme"></div>
        </div>
    )
}
export default Shop