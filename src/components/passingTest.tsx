import React,{FC,useState,useEffect} from 'react'
import { readyTest } from '../App'
import { TextItem } from './addQuestion'
import white from '../images/Blank.jpg'
import { AnswerForm } from './addQuestion'
import { useParams } from 'react-router-dom'
import Grade from './gradeComponents'
import PassingTestContainer from './passingTestContainer'
import { UserType } from '../models/userClass'
import Button from './button'
import { BDFirebase } from '../App'
type ImportType = {
    test:readyTest | undefined;
    handleClearAnswers: () => void
}

type ComponentType = Partial<React.ComponentProps<typeof PassingTestContainer>>
type ReadyComponentProps<T> = T extends {state?:UserType | undefined} ?  { test:  Pick<UserType,'tests'>; handleClearAnswers: () => void }: { test: null; handleClearAnswers?: () => void };
type f = ReadyComponentProps<ComponentType>
const OpenTest:FC<ImportType> = ({test, handleClearAnswers}) => {
const testId = useParams()
const [answer, setAnswer] = useState<TextItem | undefined>({
    value: 'wwdwdqwdwdqw',
    formText: null,
    questionForm: AnswerForm.text,
    necessarily: 'disabled',
    question: ["Добавить вариант"],
    isActive:false,
    key: 0,
    index:0,
    id: '',
    answer: [],
    trueAnswer: [],
})
const [display,setDisplay] = useState<string>('none')
const handleChangeTextAnswer = (event: React.ChangeEvent<HTMLInputElement>,format:string) => {
const data = event.currentTarget
const name = data.dataset.name

const targetIndex: any = test?.[0].findIndex((item) => item.id === name)



let targetObject:any = test?.[0]?.[targetIndex]

const answerValue = data.value


console.log(targetObject)
if(format === 'text') {
targetObject.answer = answerValue
let updateObject:any = test?.[0]
updateObject[targetIndex] = targetObject
console.log(updateObject)
setAnswer(updateObject)
} else if(format === 'checkbox') {
if(data.checked) {
   
    targetObject.answer.push(answerValue)

    let updateObject:any = test?.[0]
    updateObject[targetIndex] = targetObject
    console.log(updateObject)
    setAnswer(updateObject)
} else {
    const updateAnswerArray = targetObject.answer.filter((item:string) => {
return item !== answerValue
    })
    let updateObject:any = test?.[0]
    targetObject.answer = updateAnswerArray
    updateObject[targetIndex] = targetObject
    setAnswer(updateObject)
}
} else {

targetObject.answer = answerValue
let updateObject:any = test?.[0]
updateObject[targetIndex] = targetObject
console.log(updateObject)
setAnswer(updateObject)
}
}
const handleClickSend = () => {
    setDisplay('flex')
}

useEffect(() => {
if(!test) {

}
},[])

    return (
        <div className='passingTest'>

             <div style={{
                background: `url( ${test?.[4]?.header !== '' ? test?.[4]?.header : white}) center / cover`
             }} className="passingTest__headerElement">
                <p style={{

                  fontStyle: test?.[3]?.[0]?.header.title.formated === 'ITALIC' ? 'italic' : 'none',
                  fontWeight: test?.[3]?.[0]?.header.title.formated === 'FAT' ? '600' : 'none',
                  textDecoration: test?.[3]?.[0]?.header.title.formated === 'UNDERLINED' ? 'underline' : 'none',
                }}className="passingTest__headerTextT">{test?.[3]?.[0]?.header.title.value}</p>
                <p style={{
                     fontStyle: test?.[3]?.[0]?.header.description.formated === 'ITALIC' ? 'italic' : 'none',
                     fontWeight: test?.[3]?.[0]?.header.description.formated === 'FAT' ? '600' : 'none',
                     textDecoration: test?.[3]?.[0]?.header.description.formated === 'UNDERLINED' ? 'underline' : 'none',
                }}className="passingTest__headerText">{test?.[3]?.[0]?.header.description.value}</p>
            </div>
            
            <div className='passingTest__content'>
            {test?.[0]?.map((item,index) => {
                if(item.questionForm === 'TEXT') {
                return (
                    <div  style={{
                        background:  test?.[4]?.question !== '' ? test?.[4]?.question : ''
                     }}key={index} className='passingTest__itemInner'>
                        <div className='passingTest__itemTitle'>
                    <h1 style={{

fontStyle: item.formText === 'ITALIC' ? 'italic' : 'none',
fontWeight: item.formText === 'FAT' ? '600' : 'none',
textDecoration: item.formText === 'UNDERLINED' ? 'underline' : 'none',
}} 
>{item.value}</h1>
{item.necessarily === 'disabled' ? null : <p style={{color: 'red'}}>*</p>}
</div>
                    <input  data-name={item.id} onChange={(event) => handleChangeTextAnswer(event,'text')} className='passingTest__itemInput' placeholder='Мой ответ'></input>
                </div>
                )
                } else if(item.questionForm === 'RADIO') {
                    return (
                        <div data-name={item.id} style={{
                            background:  test?.[4]?.question !== '' ? test?.[4]?.question : ''
                         }} key={index} className='passingTest__itemInner'>
                            <div className='passingTest__itemTitle'>
                    <h1 style={{

fontStyle: item.formText === 'ITALIC' ? 'italic' : 'none',
fontWeight: item.formText === 'FAT' ? '600' : 'none',
textDecoration: item.formText === 'UNDERLINED' ? 'underline' : 'none',
}}>{item.value}</h1>
{item.necessarily === 'disabled' ? null : <p style={{color: 'red'}}>*</p>}
</div>
                    <div className='passingtTest__itemRadioContainer'>
                  
                   
                        { item.question.map((itemg,indexg) => {
                           
                       return ( 
                        <div data-name={item.id} key={indexg}className="passingTest__itemRadioItem"> 
                        <input value={itemg} data-name={item.id} onChange={(event) => handleChangeTextAnswer(event,'any')}className="passingTest__itemRadio" type='radio' name={index.toString()}></input>
                        <p 
className="passingTest__itemText">{itemg}</p>
                        </div>
                       )
                    })
                }
                     
                    </div>
                </div>
                    )
                } else {
                    return (
                        <div 
                        style={{
                            background:  test?.[4]?.question !== '' ? test?.[4]?.question : ''
                         }}key={index} className='passingTest__itemInner'>
                            <div className='passingTest__itemTitle'>
                        <h1 style={{

fontStyle: item.formText === 'ITALIC' ? 'italic' : 'none',
fontWeight: item.formText === 'FAT' ? '600' : 'none',
textDecoration: item.formText === 'UNDERLINED' ? 'underline' : 'none',
}}>{item.value}</h1>
                        {item.necessarily === 'disabled' ? null : <p style={{color: 'red'}}>*</p>}
                        </div>
                        <div className='passingtTest__itemRadioContainer'>
                    
                        { item.question.map((itemg,indexg) => {
                           
                           return ( 
                            <div key={indexg}className="passingTest__itemRadioItem"> 
                            <input value={itemg} data-name={item.id} onChange={(event) => handleChangeTextAnswer(event,'checkbox')} className="passingTest__itemCheckBox" type='checkbox' name={index.toString()}></input>
                            <p className="passingTest__itemText">{itemg}</p>
                            </div>
                           )
                        })
                    }
                            
                        </div>
                    </div>
                    )
                }
               })}
               <Grade display={display} setDisplay={setDisplay}></Grade>
            </div>
                <div className='passingTest__footer'>
           <button onClick={handleClickSend}style={{
                background:  test?.[4]?.button !== '' ? test?.[4]?.button : ''
             }} className='passingTest__sendBtn'>Отправить</button>
           <p onClick={handleClearAnswers} className='passingTest__clearTest'>Очистить форму</p>
           </div>
           
   </div>
    )
}
export default OpenTest