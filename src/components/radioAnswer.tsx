import React from 'react'
import { IoMdRadioButtonOn } from "react-icons/io";
import { AnswerForm } from './addQuestion';
import { FormatedText } from './addQuestion';
import { SetFunction } from './addQuestion';
import {Text} from './addQuestion'
import { FaRegTrashAlt } from "react-icons/fa";
import {TextItem} from './addQuestion'
import InputAnswer from './inputAnswer';
import { IoIosClose } from "react-icons/io";
interface FormText  {
   
    formText:  TextItem,
    deleteFunction: (i:number) => any;
    setFormText: React.Dispatch<TextItem>
}

const RadioAnswer = ({formText, setFormText, deleteFunction}:FormText) => {
    const [inputState, setInputState] = React.useState<string>('')
   
    const handleClickAddAnswer = (event: React.MouseEvent<HTMLDivElement>) => {
       
        setFormText({
            ...formText,
            question: [...formText.question, '']
        })
      console.log(formText)
    }
    const handleSelectTrueAnswer = (event:React.MouseEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value
        setFormText({
            ...formText,
            trueAnswer: [value]
        })
        
    }
    const handleUpdateQuestions = (value: string, key:number) => {
        const updatedQuestions = [...formText.question]
        updatedQuestions[key] = value
        setFormText({
            ...formText,
            question: updatedQuestions
        })
    }
    return (
        <div className="radioAnswer">
{formText.question.map((item, index) => {
    return <div  style={{backgroundColor: item === formText.trueAnswer[0] ? '#b1e087' : 'transparent', borderRadius:'10px'}} key={index} className="radioAnswer__row">
    <IoMdRadioButtonOn></IoMdRadioButtonOn>
 <InputAnswer  handleSelectTrueAnswer={ handleSelectTrueAnswer} value={item} onChange={(value) => handleUpdateQuestions(value,index)}></InputAnswer>
 <IoIosClose onClick={() => deleteFunction(index)} size={30} color='black'></IoIosClose>
</div>
})}
<div onClick={handleClickAddAnswer} className="radioAnswer__addRow">
<IoMdRadioButtonOn></IoMdRadioButtonOn>
<p className="radioAnswer__addRowText">Добавить вариант</p>
</div>
        </div>
    )
}
export default RadioAnswer