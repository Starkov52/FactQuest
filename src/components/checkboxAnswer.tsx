import React from 'react'
import { IoCheckboxOutline } from "react-icons/io5";
import { AnswerForm } from './addQuestion';
import { FormatedText } from './addQuestion';
import { SetFunction } from './addQuestion';
import {Text} from './addQuestion'
import InputAnswer from './inputAnswer';
import {TextItem} from './addQuestion'
import { IoIosClose } from "react-icons/io";
interface FormText  {
   
    formText:  TextItem;
    deleteFunction: (i:number) => any;
    setFormText: React.Dispatch<TextItem>;
}
const CheckBoxAnswer = ({formText, setFormText, deleteFunction}:FormText) => {
    const [inputState, setInputState] = React.useState<string>('')
   
    const handleClickAddAnswer = (event: React.MouseEvent<HTMLDivElement>) => {
       
        setFormText({
            ...formText,
            question: [...formText.question, '']
        })
      console.log(formText)
    }
    const handleUpdateQuestions = (value: string, key:number) => {
        const updatedQuestions = [...formText.question]
        updatedQuestions[key] = value
        setFormText({
            ...formText,
            question: updatedQuestions
        })
    }
   const handleCheckBoxTrueAnswers = (event:React.MouseEvent<HTMLInputElement>) => {
const value = event.currentTarget.value
const trueAnswers = [...formText.trueAnswer]
trueAnswers.push(value)
 setFormText({
    ...formText,
    trueAnswer: trueAnswers
 })
   }
    return (
        <div className="radioAnswer">
{formText.question.map((item, index) => {
    return <div  style={{backgroundColor: formText.trueAnswer.includes(item) ? '#b1e087' : 'transparent', borderRadius:'10px'}}key={index} className="radioAnswer__row">
<IoCheckboxOutline></IoCheckboxOutline>
 <InputAnswer handleCheckBoxTrueAnswers={handleCheckBoxTrueAnswers} value={item} onChange={(value) => handleUpdateQuestions(value,index)}></InputAnswer>
 <IoIosClose onClick={() => {deleteFunction(index)}} size={30} color='black'></IoIosClose>
</div>
})}
<div onClick={handleClickAddAnswer} className="radioAnswer__addRow">
<IoCheckboxOutline></IoCheckboxOutline>
<p className="radioAnswer__addRowText">Добавить вариант</p>
</div>
        </div>
    )
}
export default CheckBoxAnswer 