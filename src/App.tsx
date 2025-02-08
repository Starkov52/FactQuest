import React,{useState,useReducer, createContext,useContext,Provider,useEffect, useRef} from 'react';
import logo from './logo.svg';
import './css/style.css';
import Header from '../src/components/header';
import Main from '../src/components/mainPage';
import {BrowserRouter as Router,Link,Route,Routes} from 'react-router-dom';
import CreateTest from './components/createTest'
import { Text } from './components/addQuestion';
import { AnswerForm } from './components/addQuestion';
import { SetFunction } from './components/addQuestion';
import { FormatedText } from './components/addQuestion';
import { Format } from './components/createTest';
import {UserType} from './models/userClass'
import { create } from 'domain';
import {TextItem} from '../src/components/addQuestion'
import PassingTestContainer from './components/passingTestContainer';
import AlreadyTests from './components/listUserTests';
import UserTests from './components/userTests';
import Profile from './components/profile';
import ShopSection, { GradientItem } from './components/shopSection'
import PassingTest from './components/passingTest' 
import { Theme } from './components/shop';
import white from './images/Blank.jpg'
import profileHoc from './components/profileHOC';
import Registration from './components/AutoAndRegComponent';
 import {BASE} from './components/dataBase'

 export type Action =
  | { type: "deleteTest"; payload: {} }
  | { type: "addTest"; payload: readyTest}
  | { type: "reset" }
  | {type: "changeTheme", payload: boolean} 
  | {type: 'addTheme', payload: Theme}
  | {type: 'updateMoney', payload: number}
  | {type: 'updateView', payload: Set<string> | Set<unknown>}
  | {type: 'createData', payload: createData}
  | {type: 'autorization', payload: UserType}
  const initialState: UserType = {
    name: 'Name',
    password: '000000000',
    friends: {},
    tests: [],
    secretKey: 'aaaaaaaaaaaaaaa',
    themes:  {
    question: [{color: "#ffffff", description: "белый цвет", price: 0 }],
    button: [{color: "#ffffff", description: "белый цвет", price: 0 }],
    header: [{color: white, description: "белый цвет", price: 0 }],
    },
    description: 'User Description',
    countOfPassedTests: 0,
    headerTheme: false,
    money: 100 as const,
    isAutorization:false,
    viewTests: new Set(),
  };
  export type themeTest = {
    header: string,
    question: string,
    button: string,
  }
 export type readyTest = [
  tests: TextItem[] ,
  grade: number,
  passages: number,
  header: any[],
  themes: themeTest,
  key: string,
  date: Date | number

]
   export type ImportTypeContext = {
    state: {
      name: string;
      password: string;
      friends: {};
      tests: readyTest | [];
      secretKey: string;
      themes: Theme
      description: string;
      countOfPassedTests: number;
      headerTheme: boolean,
      money: number,
      isAutorization:boolean,
      viewTests: Set<string>
    },
    dispatch: React.Dispatch<Action>
   }
export const UserData = createContext<{ state: UserType, dispatch: React.Dispatch<Action> } | null>(null);
export type createData = {
  name: string;
  password: string;
  auth: boolean;
}

export class BDFirebase extends BASE {
  path: string = 'https://telegrambotfishcombat-default-rtdb.firebaseio.com/';
   users: string = 'usersQuest';
   tests: string = 'usersTests';
   
   constructor(path: string, users: string, te1sts: string) 
 
   
   constructor(path: string, users: string) 
   constructor(path:string,tests:string)
  
  
  constructor(path: string, users?: string, tests?: string) {
    super();
    this.path = path;
    this.users = users || '';
    this.tests = tests || '';
   }

 
    sendData(URL:string,METHOD:string,BODY?:any): Promise<string> {
     return fetch(URL,{
       headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json,'
         
       },
       
       method: METHOD,
       body: JSON.stringify(BODY),
     }).then((response) => {
       if(response.ok) {
         const data:any = response.json()
         return data
       } else {
         throw new Error("Ошибка с БД")
       }
     }).catch((error) => {
      console.error("Ошибка при отправке данных:", error); // добавил для отладки
      throw error;
    });
  }
  
   
 
   async getData(URL:string,METHOD:string): Promise<string> {
     return new Promise((resolve,reject) => {
  const xhr = new XMLHttpRequest
  xhr.open(METHOD,URL)
  xhr.setRequestHeader('Content-Type', 'Application/json')
  xhr.onload = () => {
   if(xhr.status >= 200 && xhr.status < 300) {
     resolve(JSON.parse(xhr.response))
   } else {
     reject(xhr.response)
   }
  }
  xhr.onerror = () => {
 throw new Error("Ошибка получения данных")
  }
  xhr.send()
     }) 

    }
    
 }
 
function App() {

  const headerRef = useRef<HTMLDivElement | null>(null)
  const [formTextH, setFormText] = useState<Text>({
    header: {
      title: {
        value:'Заголовок', 
        formated:'none',
      } ,
      description:{
        value: 'Описание',
        formated: 'none'
      } ,
    },
    value: 'Введите значение',
    formText: null,
    questionForm: AnswerForm.text,
    necessarily: 'disabled',
    question: ["Добавить вариант"],
    isActive:true,
    key: 0,
    index:0,
    id: '',
    answer: []
});

const User = new BDFirebase('https://telegrambotfishcombat-default-rtdb.firebaseio.com/','usersQuests', 'userTests')
const [state, dispatch] = useReducer(reducer,initialState)
useEffect(() => {
  User.sendData(`${User.path}${User.users}/${state.secretKey}.json`,'PATCH',state).then((response) => {console.log(response)})
},[state.tests])
  function reducer(state:UserType, action:Action): UserType | any{
  switch(action.type) {
    case 'addTest': {
  return {...state,
    tests: Array.isArray(state.tests)
        ? [...state.tests, action.payload]
        : [action.payload]}
    }
    case 'deleteTest': {
      return {...state, tests: action.payload}
    }
    case 'changeTheme' : {
      return{...state, headerTheme: action.payload}
    }
    case 'addTheme' : {
      return {...state,themes: action.payload}
    }
    case 'updateMoney' : {
      return {...state, money: action.payload}
    }
    case 'updateView' : {
      return {...state, viewTests: new Set([...Array.from(action.payload)])}
    }
    case 'createData' : {
      return {...state, password: action.payload.password, name: action.payload.name, isAutorization: action.payload.auth }
    }
    case 'autorization' : {
      return action.payload
    }
    default: {
      return state;
    }
  }
  }
  useEffect(() => {
    const HTML = document.documentElement
    if(state.headerTheme) {
      if(headerRef.current) {
        HTML.style.background = '#777872';
      headerRef.current.style.background = '#2d305f';
    }
  } else {
      if(headerRef.current) {
      HTML.style.background = 'rgb(225, 225, 243)'
      headerRef.current.style.background = 'linear-gradient(90deg, #7A5CFF, #4304d6)';
    }
    }
  },[state.headerTheme])

  const handleClearAnswers = () => {
    window.location.reload()
    }
    const ProfileNew = profileHoc(Profile)
    const CreateNew = profileHoc(CreateTest)
   
  
    return (
    
<UserData.Provider value={{state, dispatch}}>
    <Router>
    <div className="App">
     <Header ref={headerRef}></Header>

     <Routes>
      <Route path="/createTest" element={<CreateNew state={state}  formTextH={formTextH} setFormText={setFormText}></CreateNew>}></Route>
      <Route path="" element={<Main></Main>}></Route>
      <Route path='/testsAlready' element={<AlreadyTests></AlreadyTests>}></Route>
      <Route path='/userTests' element={<UserTests></UserTests>}></Route>
      <Route path='/profile' element={<ProfileNew state={state} ></ProfileNew>}></Route>
      <Route path='/shopSection' element={<ShopSection></ShopSection>}></Route>
    
      <Route path="/registration" element={<Registration flag='reg'></Registration>}></Route>
      <Route path="/autorization" element={<Registration flag='auth'></Registration>}></Route>
      <Route path="/userTests/walkthrough/:testId" element={<PassingTestContainer state={state} handleClearAnswers={handleClearAnswers}></PassingTestContainer>}></Route>
</Routes>
     
    </div>
     </Router>
     </UserData.Provider>
  );
}

export default App;


