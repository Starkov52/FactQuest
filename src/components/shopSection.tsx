import React,{useState, useContext} from 'react'
import Shop from './shop'
import { FaBitcoin } from "react-icons/fa6";
import theme from '../themes'
import { UserData } from '../App';
import { ImportTypeContext } from '../App';
export type GradientItem = {
    color: string;
    description: string;
    price: number;
};

 export type Theme = {
    question: GradientItem[];
    button: GradientItem[];
    header: GradientItem[]
};
function ShopSection() {
    const [themeObj, setThemes] = useState<Theme>(theme)
    console.log(themeObj)
    const context = useContext<ImportTypeContext | null>(UserData)
    const [formatModal, setFormatModal] = useState<string>('none')
    React.useEffect(() => {
        if(context) {
            const state = context

        const newHeader = themeObj.header.filter((itemJ) => 
            !state.state.themes.header.some((item) => item.description === itemJ.description)
        );

        const newButton = themeObj.button.filter((itemJ) => 
            !state.state.themes.button.some((item) => item.description === itemJ.description)
        );

        const newQuestion = themeObj.question.filter((itemJ) => 
            !state.state.themes.question.some((item) => item.description === itemJ.description)
        );
        setThemes({
            header: newHeader,
            question: newQuestion,
            button:newButton
        })
    }
    },[context])

    return (
    <div className="shopSection">
        <div className='shopSection__info'>
            <div className='shopSection__WelcomeText'>
                <h1 className="shopSection__title">Магазин тем</h1>
                <p className="shopSection__description">
                    В этом разделе вы можете преукрасить визуальную часть ваших тестов и повысить интерес к прохождению именно ВАШЕГО теста
                </p>
            </div>
        <div className='profile__countCoins'>
<FaBitcoin color='yellow' size='40'></FaBitcoin>
<p className='profile__countCoinsInfo'>{context?.state.money}</p>
                </div>
        </div>
        <Shop  card='shop' formatModal={formatModal} setFormatModal={setFormatModal} themeObj={themeObj} setThemeObj={setThemes} format="Тема заголовка"></Shop>
        <Shop  card='shop' formatModal={formatModal} setFormatModal={setFormatModal} themeObj={themeObj} setThemeObj={setThemes} format="Тема вопросов"></Shop>
        <Shop  card='shop' formatModal={formatModal} setFormatModal={setFormatModal} themeObj={themeObj} setThemeObj={setThemes} format="Тема кнопки"></Shop>
    </div>
    )
}
export default ShopSection