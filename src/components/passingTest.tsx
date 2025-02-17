import React,{FC,useState,useEffect, ChangeEvent} from 'react'
import { readyTest } from '../App'
import { TextItem } from './addQuestion'
import white from '../images/Blank.jpg'
import { AnswerForm } from './addQuestion'
import { Navigate, useParams } from 'react-router-dom'
import Grade from './gradeComponents'
import PassingTestContainer from './passingTestContainer'
import { UserType } from '../models/userClass'
import Button from './button'
import { BDFirebase } from '../App'
import { Text } from './addQuestion'
import CommentItem from './commentItem'
import { Comment } from '../App'
import {UserData} from '../App'
import { MdContentCopy } from "react-icons/md";
type ImportType = {
    test:readyTest ;
    handleClearAnswers: () => void,
    grade: number,
    setGrade: React.Dispatch<number>,
    flagTest:boolean,
    setFlagTest:  React.Dispatch<boolean>,
    handleClickSend: () => void;
    display: any,
    setDisplay: React.Dispatch<any>,
    handleModalSend: () => void
}


type ComponentType = Partial<React.ComponentProps<typeof PassingTestContainer>>
type ReadyComponentProps<T> = T extends {state?:UserType | undefined} ?  { test:  Pick<UserType,'tests'>; handleClearAnswers: () => void }: { test: null; handleClearAnswers?: () => void };
type f = ReadyComponentProps<ComponentType>
const OpenTest:FC<ImportType> = ({test, handleClearAnswers,setGrade,grade,handleClickSend,flagTest,setFlagTest,display,setDisplay,handleModalSend}) => {
const testId = useParams()
const state = React.useContext(UserData)
const [answer, setAnswer] = useState<TextItem[] | undefined>()
const [comment,setComment] = React.useState<string>('')
const [keyG,setKey] = React.useState<string>('')
const [like,setLike] = React.useState<number>(0)
const handleChangeCommentState = (event:ChangeEvent<HTMLInputElement>) => {
const value = event.target.value;
setComment(value)
console.log(test[5])
}
const handleSendComment = () => {
    const newComment:Comment = {
    author: state?.state.name,
    value: comment,
    date: new Date(),
    likes: like
    }
    const commentsArray:Comment[] = test[7] ? test[7] : [] 
    commentsArray.unshift(newComment)
    const newTest:readyTest = [test[0],test[1],test[2],test[3],test[4],test[5],test[6],commentsArray,test[8]]
    const sendComment = new BDFirebase('https://telegrambotfishcombat-default-rtdb.firebaseio.com/', 'usersTests')
    sendComment.getData(`${sendComment.path}usersTests.json`,"GET").then((response:any) => {
   
        for(const [key,value] of Object.entries(response)) {
            const realValue = value as readyTest
            if(realValue[5] === test[5]) {
               
console.log(key,'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')

sendComment.sendData(`${sendComment.path}usersTests/${key}.json`,'PUT',newTest).then((response:any) => {
    console.log(response)
  })

            }

        }
    }).then(() => {
        setComment('')
    })

  
}
const handleChangeTextAnswer = (event: React.ChangeEvent<HTMLInputElement>,format:string) => {
const data = event.currentTarget
const name = data.dataset.name

const targetIndex: any = test?.[0].findIndex((item) => item.id === name)



let targetObject:TextItem  = test?.[0]?.[targetIndex]

const answerValue = data.value


if(format === 'text') {
targetObject.answer = answerValue
let updateObject:any = test?.[0]
updateObject[targetIndex] = targetObject
console.log(updateObject)
setAnswer(updateObject)
} else if(format === 'checkbox') {
if(data.checked) {
   if(!Array.isArray(answer?.[targetIndex].answer)) {
    targetObject.answer = []
    targetObject.answer.push(answerValue)

    let updateObject:any = test?.[0]
    
    updateObject[targetIndex] = targetObject
    console.log(updateObject)
    setAnswer(updateObject)
   } else {
    console.log('wwdwddwwdwdwd')
if(Array.isArray(targetObject.answer)) {
    let answerValueArray:any = answer?.[targetIndex].answer
    targetObject.answer = [...answerValueArray,answerValue]
    answerValueArray = answer?.[targetIndex].answer
    console.log(answerValueArray)


    if (Array.isArray(answerValueArray)) {
        targetObject.isTrue = 0
        answer?.[targetIndex]?.trueAnswer.forEach((item) => {
            answerValueArray.forEach((itemTwo:string) => {
                if (item.includes(itemTwo)) {
                    targetObject.isTrue = targetObject.isTrue! + 1;
                }
            });
        });
    

      
        answerValueArray.forEach((item) => {
            targetObject.isTrue = targetObject.isTrue! + 1;
            answer?.[targetIndex].trueAnswer.forEach((itemTwo:string) => {
                if (!item.includes(itemTwo)) {
                    targetObject.isTrue = targetObject.isTrue! - 1;
                }
            });
        });
        console.log(targetObject.isTrue);
    
    





   

    let updateObject:any = test?.[0]
    const neew = targetObject
    updateObject[targetIndex] = neew
    console.log(updateObject,'WWWWWWWWWWWWWWWWWWWWWW')
    setAnswer(updateObject)
}
}
   }
} else {
    if(Array.isArray(targetObject.answer)) {
    const updateAnswerArray = targetObject.answer.filter((item:string) => {
return item !== answerValue
    })
    
    let updateObject:any = test?.[0]
    targetObject.answer = updateAnswerArray
    updateObject[targetIndex] = targetObject
    setAnswer(updateObject)
} 
}
} else {

targetObject.answer = answerValue
let updateObject:any = test?.[0]
updateObject[targetIndex] = targetObject
console.log(updateObject)
setAnswer(updateObject)
}
}
const handleCopyTestHref = (event: React.MouseEvent<HTMLDivElement>) => {
    const href:string = window.location.href
    navigator.clipboard.writeText(href)
    event.currentTarget.style.background = '#FFF'
    event.currentTarget.style.borderRadius = '5px'
}



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
                        background:  flagTest && item.trueAnswer?.[0] === answer?.[index]?.answer ? '#8eeda8'  : flagTest && item.trueAnswer[0] !== answer?.[index]?.answer ? '#f05656': test[4].question
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
                            background: flagTest && item.trueAnswer?.[0] === answer?.[index]?.answer ? '#8eeda8':  flagTest && item.trueAnswer !== answer?.[index]?.answer ?  '#f05656': test?.[4]?.question 
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
                        <div 
                            style={{ background: flagTest && item.trueAnswer[0] === answer?.[index].answer && answer?.[index].question[indexg] === item.trueAnswer[0] ? '#c8ed7e' : '',borderRadius:'5px',borderBottom: '2px solid grey'}}
                        data-name={item.id} key={indexg}className="passingTest__itemRadioItem"> 
                        <input 
                           
                        value={itemg} data-name={item.id} onChange={(event) => handleChangeTextAnswer(event,'any')}className="passingTest__itemRadio" type='radio' name={index.toString()}></input>
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
                           
borderRadius: '5px',
borderBottom: '2px solid grey',
 background: flagTest && answer?.[index].isTrue === 2 ? '#8eeda8' :  flagTest && answer?.[index].isTrue !== 2 ? '#f05656' : test?.[4].question
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
                            <div  
                            style={{
                                borderBottom: '2px solid grey'
                            }}
                            key={indexg}className="passingTest__itemRadioItem"> 
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
               <Grade handleModalSend={handleModalSend} grade={grade} setGrade={setGrade} display={display} setDisplay={setDisplay}></Grade>
            </div>
                <div className='passingTest__footer'>
           <button onClick={handleClickSend }style={{
                background:  test?.[4]?.button !== '' ? test?.[4]?.button : ''
             }} className='passingTest__sendBtn'>Отправить</button>
             <div onClick={(event) => handleCopyTestHref(event)} style={{display: 'flex', color: 'black', alignItems: 'center'}}>
           <MdContentCopy size='30' color='black'></MdContentCopy>
           <p>Скопировать</p>
           </div>
           <p onClick={handleClearAnswers} className='passingTest__clearTest'>Очистить форму</p>
           </div>
            <h1 className='passingTest__commentsTitle'>Комментарии</h1>
           <div className='passingTest__comments'>
            <div className='passingTest__commentAction'>
            <input  onChange={handleChangeCommentState} value={comment} className='passingTest__commentsInput'></input>
            <button onClick={ handleSendComment} className='passingTest__commentSendBtn'>Отправить</button>
            </div>{
                test[7] !== undefined && test[7] !== null ? (
                test[7].map((item,index) => {
               
                    return <CommentItem setLike={setLike} likes={item.likes} key={index} author={item.author} value={item.value} date={item.date}></CommentItem>
                    
                })): <p style={{marginLeft: '40%', marginBottom: '4px'}}>Комментариев пока нету :W </p>
}
           </div>
           
   </div>
    )
}
export default OpenTest