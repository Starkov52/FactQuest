import React from 'react';
import image from '../images/person_11681696.png'
import  {BrowserRouter as Router,Link} from 'react-router-dom';
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { TiStarFullOutline } from "react-icons/ti"
import { VscDebugStart } from "react-icons/vsc";
import {TextItem} from '../components/addQuestion'
import { readyTest } from '../App';

type ImportType = {
    test:readyTest | undefined;
    setViewTests?: React.Dispatch<React.SetStateAction<(Set<string> | Set<unknown>)>>;
}
function TestItem({test, setViewTests}:ImportType) {
    const handleClickTest = () => {
        console.log("есть контакт");
if(setViewTests)
        setViewTests((prev) => {
          const newSet = new Set(prev); // Копируем старый Set
          const title = test?.[3]?.[0]?.header?.title.value
          if (title) {
            newSet.add(title); // Добавляем новый элемент
          }
          return newSet; // Передаем новый Set (важно!)
        });
      };
    const location = `/userTests/walkthrough/${test?.[5]}`
    return (
        <div   className="alreadyTests__test">
        <img  src={image} className="alreadyTests__testIcon"></img>
        <div className='alreadyTests__testInfo'>
            <h1 className="alreadyTests__testTitle">{test?.[3]?.[0]?.header.title.value}</h1>
            <p className="alreadyTests__testTheme">{test?.[3]?.[0]?.header.description.value}</p>
            <p className="alreadyTests__testAccesCount">кол-во пройденных: <span>22</span></p>
        </div>
        <div className='alreadyTest__testAccesStars'>
            <TiStarFullOutline color="yellow"></TiStarFullOutline>
            <TiStarFullOutline color="yellow" ></TiStarFullOutline>
            <TiStarFullOutline color="yellow"></TiStarFullOutline>
            <TiStarFullOutline color="yellow"></TiStarFullOutline>
            <TiStarFullOutline></TiStarFullOutline>
            <span className="alreadyTest__testAccesCount">(4.5/10)</span>
        </div>
        <Link onClick={handleClickTest} to ={location} className="alreadyTests__testBtnStart">
            <VscDebugStart size='30' color="blue"></VscDebugStart>
            <span className='alreadyTests__testBtnStartText'>Пройти тест</span>
        </Link >
     
    </div>
    )
}
export default TestItem