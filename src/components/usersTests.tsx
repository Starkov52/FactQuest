import React from 'react';

import { FaStar } from "react-icons/fa";
import profile from "../images/person_11681696.png"
import { readyTest } from '../App';
type props = {
    test:readyTest
} 
const TestsSection = ({test}:props) => {
    function returnCountStars() {
        const count:number = test?.[1] as number
        const stars = []
        for(let i = 0; i < count; i++) {
stars.push(<FaStar color='yellow' size={25}></FaStar>)
        }
        return stars
    }
    return (

     
     <div className="main__test">
        <p className="main__testsTitle">{test[3][0].header.title.value}</p>
        <p className="main__testDescription">{test[3][0].header.description.value}</p>
        <div className="main__testAuthor">
            <img src={profile} className="main__testAuthorImage"></img>
            <p className="main__testAuthorName">{test[8]}</p>
        </div>
        <ul className="main__testHard">
            <li className="main__testHardItem">
               { returnCountStars()}
                
            </li>
        </ul>
     </div>
            
       

    )
}
export default TestsSection;