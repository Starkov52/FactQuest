import React,{useContext, useState} from 'react'
import TestItem from './testItem'
import Select from './select'
import {UserData, readyTest} from '../App'
import {ImportTypeContext} from '../App'
import { UserType } from '../models/userClass'
import { TextItem } from './addQuestion'
import {searchState} from '../components/listUserTests'
import { searchFlags } from '../components/listUserTests'
import useFlag from '../flasgHook'
function UserTests() {
    const context = useContext<ImportTypeContext | null>(UserData)
    const state = context
    const [tests,setTests] = useState<any>(state?.state.tests)
    const [testsSearch,setTestsSearch] = useState<any>(state?.state.tests)

    const [searchValue,setSearchValue] = useState<searchState>({
        input: '',
        flag: searchFlags.dateUp
    })

    return (
        <div className="userTests">
            <h1 className="userTests__title">
                Мои тесты
            </h1>{
            state?.state.tests ? <Select setSearchValue={setSearchValue} searchValue={searchValue} setTestsSearch={setTestsSearch} testsSearch={testsSearch} ></Select> : null
}
            <div className='userTests__myTests'>
           {
          state?.state.tests ? (  state?.state.tests.map((item: any, index:number) => {
       return (     
<TestItem test={item} key={index}></TestItem>
       )
           })) :<p>У тебя еще нету тестов</p>}
            </div>
        </div>
    )
}
export default UserTests