import React,{useContext} from 'react' 
import { BsFillQuestionDiamondFill } from "react-icons/bs";
import Button from './button'
import {BrowserRouter as Router,Link,useNavigate} from 'react-router-dom'
import { UserData,ImportTypeContext } from '../App';
import white from './images/Blank.jpg'
import { BDFirebase } from '../App';
import { UserType } from '../models/userClass';

type data = {
    name: string,
    password: string,
    auth: boolean,

}
type prop =  {
    flag: string 
}
function Registration({flag}:prop) {
    type Names =  'Login' | 'Password' | 'againPassword' | 'Button';
type className<E extends Names> = `registration__input${E}` 
function addClassToInput<E extends Names>(value:E) {
const className:className<E> = `registration__input${value}`
return  className;
}
const context = useContext<ImportTypeContext | null>(UserData)
const [datas,setDatas] = React.useState<data>({
    name: '',
    password: '',

    auth: false,
})
const [error,setError] = React.useState('2px solid grey')
const User = new BDFirebase ('https://telegrambotfishcombat-default-rtdb.firebaseio.com/','usersQuests', 'userTests')
function isMouse(event:React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>): event is React.MouseEvent<HTMLButtonElement> {
    return (event.target as HTMLElement).tagName === 'BUTTON'
}
let navigate = useNavigate()

const handlerChangeInputPassword = (event:React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>,flag?:string) => {
    const data = event.currentTarget.dataset.d

    console.log(data)
    if(flag === 'auth') {
      
       event.currentTarget.style.background =  'rgb(225, 226, 226)'
       event.currentTarget.style.border = '2px solid grey'
          if(isMouse(event)) {
            User.getData(`https://telegrambotfishcombat-default-rtdb.firebaseio.com/${User.users}.json`, 'GET').then((response:any) => {
                console.log(response)
     

                
     for(const [key,value]  of  Object.entries(response)) {
        const user  = value as UserType;
    
        if(user.password === datas.password && user.name === datas.name) {
            console.log('Успешный вход')
            const stateToSend:UserType = {
                name: user.name,
                password: user.password,
                friends: user.friends,
                tests: user.tests,
                secretKey: key,
                themes:  user.themes,
                description:  user.description,
                countOfPassedTests: user.countOfPassedTests,
                headerTheme: user.headerTheme,
                money: user.money,
                isAutorization:true,
                viewTests: user.viewTests,
            }
            context?.dispatch({type:'autorization',payload: stateToSend })
            const data:data = {
                password: datas.password,
                name: datas.name,
                auth: true
               
            }
            context?.dispatch({type:'createData',payload: data })
            navigate('/profile')
        } else {
       
              setError('2px solid red')
            
        }
console.log(value)
        
     }
               })
          } else if(data === 'login') {
             const login = event.currentTarget.value
             setDatas({
                ...datas,
                name: login
             })
            
          } else {
           const  password = event.currentTarget.value
           setDatas({
            ...datas,
            password: password
         })
          }
    } else {
    if(isMouse(event)) {
       if(datas.name.length !== 0 && datas.password.length !== 0 && datas.auth ) {

        const stateToSend:UserType = {
            name: datas.name,
            password: datas.password,
            friends: {},
            tests: [],
            secretKey: 's',
            themes:  {
            question: [{color: "#ffffff", description: "белый цвет", price: 0 }],
            button: [{color: "#ffffff", description: "белый цвет", price: 0 }],
            header: [{color: './images/Blank.jpg' ,description: "белый цвет", price: 0 }],
            },
            description: 'User Description',
            countOfPassedTests: 0,
            headerTheme: false,
            money: 100 as const,
            isAutorization:true,
            viewTests: new Set(),
        }
        setTimeout(() => { User.sendData(`${User.path}${User.users}.json`,'POST',stateToSend).then((response) => {console.log(response)})
        navigate('/autorization')},555)
       
       
       }
    } else  {
        if(data === 'login'){
            const value = event.currentTarget.value
            const regExp:RegExp = /^(?=(.*[A-Za-zА-Яа-я]){5,20})(?=(.*\d){2,5})[А-Яа-я\w]{10,20}$/
            if(regExp.test(value)) {
                event.currentTarget.style.backgroundColor = '#83d6a7'
                setDatas({
                    ...datas,
                    name: value
                }
                )
            } else {
                event.currentTarget.style.backgroundColor = '#ed9279'
                event.currentTarget.placeholder = 'Логин должен быть от 5 букв,2 цифры и быть длиной 10зн'
                
            }
        } else if(data === 'password') {
            const value = event.currentTarget.value
            const regExp:RegExp = /^(?=(.*\d){6,10})(?=(.*[A-ZА-Яa-zа-я]){3,10})(?=(.*[\W]){1,5})[A-ZА-Яa-zа-я\W\d]{10,20}$/
            
            if(regExp.test(value)) {
                event.currentTarget.style.backgroundColor = '#83d6a7'
                setDatas({
                    ...datas,
                    password: value
                }
                )
            } else {
                event.currentTarget.style.backgroundColor = '#ed9279'
                          event.currentTarget.placeholder = 'Пароль должен быть от 3 буквы,6 цифры и быть длиной 10зн'
                
            }
        } else {              
            const value = event.currentTarget.value
          if(value === datas.password) {
             event.currentTarget.style.backgroundColor = '#83d6a7'
             setDatas({
                ...datas,
                auth: true
             })
          } else {
               event.currentTarget.style.backgroundColor = '#ed9279'
               setDatas({
                ...datas,
                auth: false
             })
          }
        } 
    }
}
        }
        const [prank,setPrank] = React.useState<string>('Забыли пароль?')
      
 const handlePrank =()=> {
    setPrank("Твои проблемы,лол, не надо было забывать")
 }

    return (flag === 'reg' ? (
    <div className='registration'>
    <div  className="registration__productLogo">
    <BsFillQuestionDiamondFill size={40} color='purple'></BsFillQuestionDiamondFill>
    <h1 className="registration__logoTitle">FactQuest</h1>
 </div>
        <h1 className='registration__title'>Sign Up!</h1>
        <Button   data-d='login' onChange={(event) =>handlerChangeInputPassword(event)}placeholder='Логин' as='input' className={addClassToInput<'Login'>('Login')}></Button>
        <Button   data-d='password' onChange={(event) =>handlerChangeInputPassword(event)}placeholder='Пароль' as='input' className={addClassToInput<'Password'>('Password')}></Button>
        <Button   data-d='againPassword' onChange={(event) =>handlerChangeInputPassword(event)} placeholder='Повторите пароль' as='input' className={addClassToInput<'againPassword'>('againPassword')}></Button>
        <Button   onClick={(event) =>handlerChangeInputPassword(event,'aut')} as='button' className={addClassToInput<'Button'>('Button')}>Зарегистрироваться</Button>
        <p className='registration__description'>Есть аккаунт аккаунт?<Link to='/autorization'> Войти</Link></p>
    
      
    </div>
    ) : (
        <div className='registration'>
    <div  className="registration__productLogo">
    <BsFillQuestionDiamondFill size={40} color='purple'></BsFillQuestionDiamondFill>
    <h1 className="registration__logoTitle">FactQuest</h1>
 </div>
        <h1 className='registration__title'>Login</h1>
        <Button  style={{border:error}}data-d='login' onChange={(event) =>handlerChangeInputPassword(event,'auth')}placeholder='Логин' as='input' className={addClassToInput<'Login'>('Login')}></Button>
        <Button   style={{border:error}}data-d='password' onChange={(event) =>handlerChangeInputPassword(event,'auth')}placeholder='Пароль' as='input' className={addClassToInput<'Password'>('Password')}></Button>
        <Button  onClick={(event) =>handlerChangeInputPassword(event,'auth')} as='button' className={addClassToInput<'Button'>('Button')}>Войти</Button>
        <p className='registration__description'>Нету аккаунта?<Link to='/registration'> 3арегистрироваться</Link></p>
        <a onClick={handlePrank} style={{color: 'blue',marginLeft:'10px', marginTop:'-15px', cursor: 'pointer'}}>{prank}</a>
    
      
    </div>
    )
)

}
export default Registration