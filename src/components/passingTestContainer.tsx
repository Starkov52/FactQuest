import React from 'react'
import {useParams} from 'react-router-dom'
import PassingTest from '../components/passingTest'
import { UserType } from '../models/userClass'
import { readyTest } from '../App'
import { BDFirebase } from '../App'
type ConfrimType = {
    handleClearAnswers: () => void,
state: UserType
}
const  PassingTestContainer:React.FC<ConfrimType>= ({handleClearAnswers,state}) => {
    const [test,setTest] = React.useState<readyTest | undefined>()
    const {testId} = useParams<{testId:string}>()
    const handleFingTest = () => {
        const targetTest = state.tests.filter((item:any) => {
            return item?.[5] === testId
        })
return targetTest[0]
    }
    class getTests extends BDFirebase {
        constructor(path:string,tests:string) {
            super(path,tests);
            this.path = path;
            this.tests = tests;
        }
    }
    const sendExamplare = new getTests('https://telegrambotfishcombat-default-rtdb.firebaseio.com/', 'usersTests.json')
    React.useEffect(() => {
        const testLocale:any = handleFingTest()
    
        testLocale ? setTest(testLocale) : sendExamplare.getData(`${sendExamplare.path}${sendExamplare.tests}`, 'GET').then((response:any) => {
            for(const [key,value] of Object.entries(response)) {
                const valueTest = value as readyTest
             if(valueTest[5] === testId) {
                setTest(valueTest)
             }
            }
        })
        

    },[])
    return (
        <div className='maain'>
            <PassingTest test={test} handleClearAnswers={handleClearAnswers}></PassingTest>
        </div>
    )
}
export default PassingTestContainer