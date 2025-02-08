import React, {ChangeEvent, useEffect, useRef,useState, useContext} from 'react'
import AddQuestion, { AnswerForm } from './addQuestion'
import { Text } from './addQuestion'
import { SetFunction } from './addQuestion'
import FormatedLetters from './formatedTextComponent'
import ChangeLetters from './formatedTextComponent';
import { FormatedText } from './addQuestion'
import {UserData} from '../App'
import { UserType } from '../models/userClass'
import { Action } from '../App'
import {ImportTypeContext} from '../App'
import { BrowserRouter as Router,Link,Route,Routes, useNavigate} from 'react-router-dom'
import {TextItem} from '../components/addQuestion'
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { readyTest } from '../App'
import { MdOutlinePalette } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BDFirebase } from '../App'
import ChoiseTheme from './choiseTheme'
import { GradientItem } from './shopSection'
export type Format = 'title' | 'description';
export type ConfrimProps = { formTextH:Text, choiseFormat?:string, state:ImportTypeContext['state']} & SetFunction
const CreateTest = ({formTextH, setFormText, choiseFormat, }:ConfrimProps ) => {
    const [countQuestion, setCountQuestion] = useState<readyTest>([
        [], // tests 
        0,  // grade
        0,  // passages
        [], // header
        {
            'header': '',
            'question': '',
            'button': '',
        },
        Math.random().toString(36).substring(2,9),
        new Date(),
      ]);
const [headersValue, setHeadersValue] = useState<Pick<Text,'header'>>({
    header: {title:{value:'Заголовок теста', formated: 'none'}, description:{value:'Описание теста...', formated: 'none'}}
    
})
const [isThemeActive, setIsThemeActive] = useState<boolean>(false)
const inputValueT = useRef<HTMLInputElement >(null)
const inputValueR = useRef<HTMLInputElement >(null)
const headerElement = useRef<HTMLDivElement >(null)
const questionElement = useRef<HTMLDivElement >(null)
const buttonElement = useRef<HTMLButtonElement >(null)
const handleChangeInputHeader = (event:ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setHeadersValue((prevState) => ({

        header: {
            ...prevState.header,
           [name as keyof typeof prevState.header]: {
            ...prevState.header[name as keyof typeof prevState.header],
            value: value,
            
           }
        }
    }))
}
const context = useContext<ImportTypeContext | null>(UserData)
const handleAddTest = () => {
    if(context) {
        class SendTest extends BDFirebase {
            constructor(path: string, tests: string) {
                super(path,tests); 
                    this.path = path;
                    this.tests = tests;
                
            }
        }
        const sendConstruction = new SendTest('https://telegrambotfishcombat-default-rtdb.firebaseio.com/','usersTests.json')
        sendConstruction.sendData(`${sendConstruction.path}${sendConstruction.tests}`,'POST',countQuestion)
        const { state,dispatch } = context;
        dispatch({ type: 'addTest', payload: countQuestion});
    console.log(state.tests)
    setCountQuestion([ [], // tests 
        0,  // grade
        0,  // passages
        [], // header
        {
            'header': '',
            'question': '',
            'button': '',
        },

        Math.random().toString(36).substring(2,9),
        new Date()])
   
        }
        setHeadersValue({header: {title:{value:'Заголовок теста', formated: 'none'}, description:{value:'Описание теста...', formated: 'none'}}})
    }
useEffect(() => {
    
console.log(context?.state.tests)
},[context])

  

const handleClickFormatedTitle = (format: Format, target: FormatedText) => {
    setHeadersValue((prevState) => {
        const updatedHeaders = {
            header: {
                ...prevState.header,
                [format]: {
                    ...prevState.header[format],
                    formated: target,
                }
            }
        };


        setFormText({
            ...formTextH,
            header: updatedHeaders.header,
        });

        return updatedHeaders;
    });


};
const handleRandomId = () => {
    return Math.random().toString(36).substring(2,9)
}

useEffect(() => {
    if(inputValueT.current) {
    formTextH.header.title.formated === FormatedText.italic ? 
    (inputValueT.current.style.fontStyle = 'italic') : inputValueT.current.style.fontStyle = 'normal';
    formTextH.header.title.formated=== FormatedText.fat ?
     (inputValueT.current.style.fontWeight = 'bold') : (inputValueT.current.style.fontWeight = 'normal') ;
     formTextH.header.title.formated === FormatedText.underlined ? 
     (inputValueT.current.style.textDecoration = 'underline') : (inputValueT.current.style.textDecoration = 'none');
    }
    
},[formTextH.header.title.formated])
useEffect(() => {
    if(inputValueR.current) {
        formTextH.header.description.formated === FormatedText.italic ? 
    (inputValueR.current.style.fontStyle = 'italic') : inputValueR.current.style.fontStyle = 'normal';
    formTextH.header.description.formated === FormatedText.fat ?
     (inputValueR.current.style.fontWeight = 'bold') : (inputValueR.current.style.fontWeight = 'normal') ;
     formTextH.header.description.formated === FormatedText.underlined ? 
     (inputValueR.current.style.textDecoration = 'underline') : (inputValueR.current.style.textDecoration = 'none');
    }
    
},[formTextH.header.description.formated])

useEffect(() => {
    if(buttonElement.current && questionElement.current && headerElement.current) {
        if(countQuestion[4].button !== '') {buttonElement.current.style.background = countQuestion[4].button}
      
        if(countQuestion[4].header !== '') {headerElement.current.style.background = `url(${countQuestion[4].header}) center / cover`}
     
    }
},[countQuestion[4], countQuestion[0]])

/*
useEffect(() => {setCountQuestion([
    {
    value: 'Введите значение',
    formText: null,
    questionForm: AnswerForm.text,
    necessarily: 'disabled',
    question: ["Добавить вариант"],
    isActive:false
    }
])
setInterval(() => {console.log(countQuestion)},3000)
},[])
*/


const handleAddQuestion = () => {
    console.log('Before adding:', countQuestion);
    const newQuestion:TextItem = {
         index: 0,
        value: 'Введите значение',
        formText: FormatedText.delete,
        questionForm: AnswerForm.text,
        necessarily: 'disabled',
        question: ["Добавить вариант"],
        isActive: false,

       id: handleRandomId(),
       answer: '',
       trueAnswer: ['3'],

    };
    setCountQuestion(prev => {
        const updated = [...prev[0], newQuestion];
        console.log('After adding:', updated);
        return [updated, prev[1], prev[2], prev[3],prev[4],prev[5],prev[6]];
    });
};
useEffect(() => {
    console.log(countQuestion, 'ААААААААААААААААААААААААА')
},[countQuestion])
const Delete = () => {
    setCountQuestion((prev) => {
        const newQuestions:any = prev[0].slice(0,-1)
       
        return [newQuestions ,prev[1], prev[2],prev[3],prev[4], prev[5],prev[6]];
    })
}
useEffect(() => {
const newHeader:Text = {
    header: {
        title: {
          value: headersValue.header.title.value, 
          formated: headersValue.header.title.formated,
        } ,
        description:{
          value: headersValue.header.description.value,
          formated: headersValue.header.description.formated
        } ,
      },
      value: 'Введите значение',
      formText: null,
      questionForm: AnswerForm.text,
      necessarily: 'disabled',
      question: ["Добавить вариант"],
      isActive:false,
      key: 0,
      index:0,
      id: handleRandomId(),
      answer: '',
      
}

    setCountQuestion(prev => {
        const updated = [ newHeader];
        console.log('After adding:', updated);
        return [prev[0], prev[1], prev[2], updated, prev[4],prev[5],prev[6]];
    })
},[headersValue])

    return (
        <div   datatype="main" className="create">
            <div ref={headerElement} className="create__headerElement">
                <p className="create__headerTextT">{`${headersValue.header.title.value}`}</p>
                <input ref={inputValueT} name='title' onChange={handleChangeInputHeader} className="create__headerTitle" value={headersValue.header.title.value}></input>
                <FormatedLetters format='title' handleClickFormated={handleClickFormatedTitle}></FormatedLetters>
                <p className="create__headerText">{`${headersValue.header.description.value.toLowerCase()}`}</p>
                <input ref={inputValueR}name='description' onChange={handleChangeInputHeader} className="create__headerDescription"  value={headersValue.header.description.value}></input>
                <FormatedLetters format='description' handleClickFormated={handleClickFormatedTitle}></FormatedLetters>
            </div>
            <div className='content'>
          
            {countQuestion[0].map((question, index) => {
                
          return  <AddQuestion color={countQuestion[4].question} ref={questionElement} arrayQuestion={countQuestion} index={index} key={question.id} countQuestion={question} setCountQuestion={setCountQuestion} id={question.id}></AddQuestion>
        })
}
</div>
<div className='create__nav'>
<FaRegTrashAlt className="create__deleteQuestionBtn" onClick={Delete} size={40} color='white' ></FaRegTrashAlt>
<IoMdAddCircleOutline className="create__addQuestionBtn" onClick={handleAddQuestion} size={40} color='white'></IoMdAddCircleOutline>
<MdOutlinePalette  onClick={() => setIsThemeActive(true)} size={40} color='white'></MdOutlinePalette>
</div>
            <button ref={buttonElement} className="create__readyFormBtn" onClick={handleAddTest}>Добавить тест</button>
            { isThemeActive ? (
            <ChoiseTheme countQuestion={countQuestion} setCountQuestion={setCountQuestion}  setIsThemeActive={setIsThemeActive} choiseForma={choiseFormat} ></ChoiseTheme>
            ): null
}
        </div>  
    )
}
export default CreateTest