import React,{useContext} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import PassingTest from '../components/passingTest'
import { UserType } from '../models/userClass'
import { readyTest } from '../App'
import { BDFirebase } from '../App'
import { group } from 'console'
import {UserData} from '../App'
type ConfrimType = {
    handleClearAnswers: () => void,
state: UserType
}
const  PassingTestContainer:React.FC<ConfrimType>= ({handleClearAnswers,state}) => {
    const [test,setTest] = React.useState<any>([])
       const context = useContext(UserData)
       const navigate = useNavigate()
    const [grade,setGrade] = React.useState<number>(0)
    const [key,setKey] = React.useState<string>()
    const [keyUpdate,setKeyUpdate] = React.useState<string>()
    const [display,setDisplay] = React.useState<string>('none');
const [flagTest,setFlagTest] = React.useState<boolean>(false);
    const {testId} = useParams<{testId:string}>()
    const handleFingTest = () => {
        console.log('ГОВНО')
    if(state.tests) {
        const targetTest = state.tests.filter((item:any) => {
            return item?.[5] === testId
        })
        return targetTest[0]
    
    }
    }
    class getTests extends BDFirebase {
        constructor(path:string,tests:string) {
            super(path,tests);
            this.path = path;
            this.tests = tests;
        }
    }
    React.useEffect(() => {
        console.log(key)
    },[key])
    const sendExamplare = new getTests('https://telegrambotfishcombat-default-rtdb.firebaseio.com/', 'usersTests/')
    const handleClickSend = () => {
        setDisplay('flex')
    setFlagTest(true)


    }
    const handleModalSend = () => {
        if (!key) {
            console.error('Ошибка: key ещё не установлен!');
            return;
        }

      
        const countGrade = (test[1] + grade) / (test[2] + 1)
   context?.dispatch({type: 'decrimentPassages', payload: context?.state.countOfPassedTests + 1})
   context?.dispatch({type:'updateMoney',payload: context?.state.money + 5 })
        const updateTest:readyTest = [ test[0],  countGrade, test[2] + 1,  test[3], test[4], test[5], test[6],test[7],test[8]]
            console.log(updateTest)
    
        sendExamplare.sendData(`https://telegrambotfishcombat-default-rtdb.firebaseio.com/${sendExamplare.tests}${key}.json`,'PUT',updateTest).then((response) => {
            console.log(response)
        })
        sendExamplare.getData(`https://telegrambotfishcombat-default-rtdb.firebaseio.com/usersQuests.json`,'GET').then((response:any) => {
            for(const [keyG,value] of Object.entries(response)) {
                const realValue = value as UserType
                let testR:any = [];
               console.log(realValue)
                    const updateTestUser: UserType = {
                        name: realValue.name,
    password: realValue.password,
    friends: realValue.friends,
    tests: realValue.tests,
    secretKey: realValue.secretKey,
    themes: realValue.themes,
   
    description: realValue.description,
    countOfPassedTests: realValue.countOfPassedTests,
    headerTheme: realValue.headerTheme,
    money: realValue.money,
    isAutorization: realValue.isAutorization,
    viewTests: realValue.viewTests,
};
for(const [key,value] of Object.entries(realValue.tests)) {
    console.log(value, 'VVVVV')
    const testU = value as readyTest

     
    if(testU[5] === test[5]) {
        const testMb = [testU[0],countGrade,testU[2] + 1,testU[3],testU[4],testU[5],testU[6]] 
        console.log(testMb,'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')
        testR.push(testMb)
        updateTestUser.tests = testR
        sendExamplare.sendData(`https://telegrambotfishcombat-default-rtdb.firebaseio.com/usersQuests/${keyG}.json`,'PUT',updateTestUser).then((response) => {
            console.log(response, "Обновленный юзер")
        })
    } else {
        testR.push(testU) 
    }
}

                }
                
            }
        )
        
        
        setDisplay('none')
    }
    React.useEffect(() => {
        const testLocale:any = handleFingTest()
    
        testLocale && testLocale !== undefined ? setTest(testLocale) : sendExamplare.getData(`${sendExamplare.path}${sendExamplare.tests}.json`, 'GET').then((response:any) => {
            for(const [key,value] of Object.entries(response)) {
                const valueTest = value as readyTest
             if(valueTest[5] === testId) {
                setTest(valueTest)
                setKey(key)
          
             }
            }
        })
        

    },[])
    return (
        <div className='maain'>
            <PassingTest  handleModalSend={handleModalSend} setDisplay={setDisplay} display={display} handleClickSend={handleClickSend} flagTest={flagTest} setFlagTest={setFlagTest} grade={grade} setGrade={setGrade} test={test} handleClearAnswers={handleClearAnswers}></PassingTest>
        </div>
    )
}
export default PassingTestContainer