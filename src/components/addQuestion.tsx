
import React, {ChangeEvent, useState,useRef,useEffect, forwardRef} from 'react'
import { MdOutlineFormatItalic } from "react-icons/md";
import { MdOutlineFormatUnderlined } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoMdRadioButtonOn } from "react-icons/io";
import { MdCheckBox } from "react-icons/md";
import { CiTextAlignLeft } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import RadioAnswer from './radioAnswer';
import TextAnswer from './textAnswer';
import CheckBoxAnswer from './checkboxAnswer';
import { ConfrimProps } from './createTest';
import  FormatedLetters from './formatedTextComponent'
import {Format} from '../components/createTest'
import { IoMdAddCircleOutline } from "react-icons/io";
import { readyTest } from '../App';
export enum AnswerForm {
    radio = "RADIO",
    checkBox = "CHECKBOX",
    text = "TEXT",
}
 export enum FormatedText {
     italic = "ITALIC",
    underlined = "UNDERLINED",
    delete = "DELETE",
    fat = "FAT",
}
 export type Text = {
    header: {
      title:{
      value:string,
      formated: string,
      },

      description:{
        value:string,
        formated: string,
        }
    }
    value: string;
    formText:  FormatedText | null;
    questionForm: AnswerForm;
    necessarily: string;
    question: string[];
    isActive: boolean;
    key?: number
    index: number,
    id:string,
    answer: string | string[]
} 
export type TextItem = {
  value: string;
  formText:  FormatedText | null;
  questionForm: AnswerForm;
  necessarily: string;
  question: string[];
  isActive: boolean;
  key?: number,
  index: number,
  id:string,
  answer:string | string[],
  trueAnswer: string[],
isTrue?: number
}
type ConfrimPropsItem = {
  countQuestion: TextItem,
  setCountQuestion: React.Dispatch<React.SetStateAction<readyTest>>,
ref: React.LegacyRef<HTMLDivElement>,
  arrayQuestion: readyTest,
index: number,
id:string
color: string
}
 export type SetFunction = {
     setFormText: (object:Text) => any
    }
    type DeleteFunction = {
   
}

const AddQuestion = forwardRef<HTMLDivElement,ConfrimPropsItem>(({arrayQuestion,countQuestion, setCountQuestion, index,id,color},ref) => {
    const inputValueRef = useRef<HTMLInputElement|null>(null)
    const [isActive, setIsActive] = useState(false); 
    const [formText, setFormText] = useState<TextItem >({
      value: countQuestion!.value,
      formText: countQuestion!.formText,
      questionForm: countQuestion!.questionForm,
      necessarily: countQuestion!.necessarily,
      question: countQuestion!.question,
      isActive:countQuestion!.isActive,
      index: index,
   id: countQuestion.id,
   answer: [],
   trueAnswer: countQuestion.trueAnswer,
   isTrue: countQuestion.isTrue
  });
  const [trueFlag,setTrueFlag] = useState<boolean>(false)
    const handleChangeInput = (event:React.ChangeEvent<HTMLInputElement>): any => {
        setFormText({
            ...formText,
            value: event.target.value,
        })
    }
    const handleChangeTrueValue = (event: React.ChangeEvent<HTMLInputElement>) => {

      setFormText({
        ...formText,
        trueAnswer: [event.target.value.toLowerCase()]
      })
    }
    const handleDeleteQuestionTest = (id:string) => {
      setCountQuestion((prev) => {
        const updatedQuestions = prev[0].filter((question,indexf) => indexf !== index) satisfies TextItem[];
        console.log(updatedQuestions)
        return [updatedQuestions, prev[1], prev[2], prev[3], prev[4], prev[5],prev[6],prev[7],prev[8]];
      });
    
    };

  const handleClickFormated = (format:Format,target:FormatedText): any => {
    console.log(format)
    
        setFormText({
            ...formText,
           formText: target
        })
    }
    const handleDeleteQuestion = (textInner: number | string):any  => {
      if(typeof textInner == 'number') {
const updateQuestionArray = formText.question.filter((item,index) => { return index !== textInner} )
const updateTrueAnswersArray = formText.trueAnswer.filter((item,index) => {return index !== textInner})
setFormText({
    ...formText,
    question: updateQuestionArray,
    trueAnswer: updateTrueAnswersArray,
})
      } else {
        console.log(textInner.toUpperCase())
      }
    }

  
const handleClickFormatedQuestion = (target:AnswerForm): any => {

    setFormText({
        ...formText,
      questionForm: target
    })
}
const handleChangeRadioBtn = ():void => {
    setFormText({
        ...formText,
      necessarily: "checked"
    })
  }
  const handleChangeActive = (event:React.MouseEvent):any => {
    const element = event.target as HTMLElement
    const isInside =
    element.closest(".createTest__inputSection") ||
    element.closest(".createTest__choiseAnswer") ||
    element.closest(".createTest__footerOptions") ||
    element.closest(".radioAnswer__addRowText");
setIsActive(Boolean(isInside))

 
  }  
  useEffect(() => {
   if(countQuestion.trueAnswer.length === 0) {
    console.log("придурок введи правильный ответ")

    setFormText(
      {...formText,isActive:isActive}
    )
    console.log("state changed")
   } else  {
    setFormText(
      {...formText,isActive:isActive}
    )
    setTrueFlag(true)
    console.log("state changed")
  }
  },[isActive])   

    useEffect(() => {
        if(inputValueRef.current) {
        formText.formText === FormatedText.italic ? 
        (inputValueRef.current.style.fontStyle = 'italic') : inputValueRef.current.style.fontStyle = 'normal';
         formText.formText === FormatedText.fat ?
         (inputValueRef.current.style.fontWeight = 'bold') : (inputValueRef.current.style.fontWeight = 'normal') ;
         formText.formText === FormatedText.underlined ? 
         (inputValueRef.current.style.textDecoration = 'underline') : (inputValueRef.current.style.textDecoration = 'none');
        }
        
    },[formText.formText, formText.necessarily])
    const handleChangeQuestion = (index: number, newQuestion: TextItem) => {
      let updatedQuestions = [...arrayQuestion[0]];
      updatedQuestions[index] = newQuestion;
      setCountQuestion([
       updatedQuestions, arrayQuestion[1], arrayQuestion[2], arrayQuestion[3], arrayQuestion[4], arrayQuestion[5], arrayQuestion[6],arrayQuestion[7],arrayQuestion[8]]
      );
  };
    useEffect(() => {
    handleChangeQuestion(index, formText)

    }, [formText as TextItem]);
function isForm(form:AnswerForm, type:AnswerForm): form is AnswerForm {
  return form === type
}
function isActivee(form:TextItem): form is TextItem {
  return form.isActive === true
}
function returnText(message:string) {
  
  return countQuestion.trueAnswer.length === 0 ? message : 'Красавчик'
  }


    return (
        <div onClick={handleChangeActive} className="createTest">
<div style={{
  display: isActive ? 'grid' : 'flex',
  borderLeft:  isActive ? '4px solid blue' : '4px solid black',
  background: color
}}className="createTest__inner" ref={ref}>
          <div className="createTest__inputSection">
            {formText.necessarily != "disabled" ? (<p style={{color: 'red'}}>*</p>) : null}
            <input className="createTest__inputText" ref={inputValueRef} onChange={handleChangeInput} value={formText.value} ></input>
    {formText.isActive ? (
            <FormatedLetters format='title' handleClickFormated={handleClickFormated}></FormatedLetters>
          ):null}
          </div>
          {isActivee(formText) ? (
          <ul className="createTest__choiseAnswer">
<li className="createTest__choiseItem"  onClick={() =>  handleClickFormatedQuestion(AnswerForm.radio)}><IoMdRadioButtonOn size={30} color='black'></IoMdRadioButtonOn></li>
<li className="createTest__choiseItem"  onClick={() => handleClickFormatedQuestion(AnswerForm.checkBox)} ><MdCheckBox size={30} color='black'></MdCheckBox></li>
<li className="createTest__choiseItem"  onClick={() => handleClickFormatedQuestion(AnswerForm.text)} ><CiTextAlignLeft size={30} color='black'></CiTextAlignLeft></li>
</ul>
): null}
<div className="createText__presentationSection">

  {isForm(formText.questionForm,AnswerForm.radio) ? (
    <RadioAnswer
      deleteFunction={handleDeleteQuestion}
      formText={formText}
      setFormText={setFormText}
    />
  ) : isForm(formText.questionForm,AnswerForm.checkBox) ? (
    <CheckBoxAnswer
    deleteFunction={handleDeleteQuestion}
      formText={formText}
      setFormText={setFormText}
    />
  ) : isForm(formText.questionForm,AnswerForm.text) ? (
    <TextAnswer />
  ) : null}
</div>


{formText.isActive ? (
  
<div className="createTest__footerOptions">
  {formText.questionForm === AnswerForm.text ? (
    <div style={{marginRight: '2px'}} className='createTest__footerOptionsText'>
<p >{returnText('Напишите правильный ответ')}</p>
<input  value={countQuestion.trueAnswer} onChange={(event) => handleChangeTrueValue(event)} style={{width: '94%',height: '19px',border: countQuestion.trueAnswer.length === 0 ? '4px solid red': '4px solid green'}}></input>
</div>
):  (
  <p style={{marginRight: '10px'}}>{ returnText('Для выбора правильного поля кликните на него 2 раза')}</p>
)}
<FaRegTrashAlt className="create__deleteQuestionBtn" onClick={() =>handleDeleteQuestionTest(id)} size={30} color='blueviolet' ></FaRegTrashAlt>
    <label >
    <input className='createTest__d' value="disabled" onChange={handleChangeRadioBtn} type="radio"></input>
  Сделать вопрос обязательным
    </label>
</div>
): null}

        
        </div>
        </div>
    )
}
)

export default AddQuestion
