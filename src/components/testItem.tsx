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
          const newSet = new Set(prev); 
          const title = test?.[3]?.[0]?.header?.title.value
          if (title) {
            newSet.add(title); 
          }
          return newSet; 
        });
      };
    const location = `/userTests/walkthrough/${test?.[5]}`
    
    function returnCountStars() {
        const count:number = test?.[1] as number
        const stars = []
        for(let i = 0; i < count; i++) {
stars.push(<TiStarFullOutline color='yellow' size={25}></TiStarFullOutline>)
        }
        return stars
    }
    return (
        <div   className="alreadyTests__test">
            <div style={{ display: 'flex', flexDirection:'column', gap: '7px'}}>
        <img  src={image} className="alreadyTests__testIcon"></img>
        <p>{test?.[8]}</p>
        </div>
        <div className='alreadyTests__testInfo'>
            <h1 className="alreadyTests__testTitle">{test?.[3]?.[0]?.header.title.value}</h1>
            <p className="alreadyTests__testTheme">{test?.[3]?.[0]?.header.description.value}</p>
            <p className="alreadyTests__testAccesCount">кол-во пройденных: <span>{test?.[2]}</span></p>
        </div>
        <div className='alreadyTests__testAccesStars'>
            {
returnCountStars()
            }
            <span className="alreadyTest__testAccesCount">{Math.round(test?.[1] as number)} \ 5</span>
        </div>
        <Link onClick={handleClickTest} to ={location} className="alreadyTests__testBtnStart">
            <VscDebugStart size='30' color="blue"></VscDebugStart>
            <span className='alreadyTests__testBtnStartText'>Пройти тест</span>
        </Link >
     
    </div>
    )
}
export default TestItem