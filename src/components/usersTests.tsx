import React from 'react';

import { FaStar } from "react-icons/fa";
import profile from "../images/person_11681696.png"
const TestsSection = () => {
    return (

     
     <div className="main__test">
        <p className="main__testsTitle">Заголовок теста</p>
        <p className="main__testDescription">Lorem ipsum, doae excepturi praesentium explicabo numquam, quaerat sunt sapiente eligendi voluptates, voluptate provident?</p>
        <div className="main__testAuthor">
            <img src={profile} className="main__testAuthorImage"></img>
            <p className="main__testAuthorName">Имя</p>
        </div>
        <ul className="main__testHard">
            <li className="main__testHardItem">
                <FaStar color='yellow' size={25}></FaStar>
                
            </li>
        </ul>
     </div>
            
       

    )
}
export default TestsSection;