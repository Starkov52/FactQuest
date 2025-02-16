import React,{ChangeEvent, useContext,useState,useEffect} from 'react'
import { IoSearchSharp } from "react-icons/io5";
import TestItem from '../components/testItem'
import TestMiniItem from '../components/testMiniItem'
import {Router as BrowserRouter,Link} from 'react-router-dom'
import Select from './select';
import {UserData} from '../App'
import {ImportTypeContext} from '../App'
import { readyTest } from '../App';
import BackgroundSearch from './backgroundSearch';
import useFlag from '../flasgHook'
import { BDFirebase } from '../App';
export type searchState = {
    input: string,
    flag: searchFlags,
}
export enum searchFlags {
    
        dateUp = 'dateUp',
        dateDown ='dateDown',
        starsUp = 'starsUp',
        starsDown = 'starsDown',
        countAccesUp = 'countAccesUp',
        countAccesDown = 'countAccesDown',
    
}

function AlreadyTests() {
    const context = useContext<ImportTypeContext | null>(UserData)
    const state = context
    const view = state?.state?.viewTests

class SearchGetData extends BDFirebase {

    constructor(path:string,tests:string) {
        super(path,tests);
        this.path = path;
        this.tests = tests || '';
       
    }
    
}

    const [tests,setTests] = useState<readyTest[] | [] >([])
    const [testsSearch,setTestsSearch] = useState<readyTest[]>(tests)
    const [showBackground,setShowBackground] = useState<boolean>(true)
    const [viewTests,setViewTests] = useState<Set<string> | Set<unknown>>(view ?? new Set())
    const [loading,setLoading] = useState<boolean>(true)
    const [searchValue,setSearchValue] = useState<searchState>({
        input: '',
        flag: searchFlags.dateUp
    })
 const [background,setBackground] = useState<readyTest[] | []>()
    const handleChangeInputSearch = (event:ChangeEvent<HTMLInputElement>) => {
setSearchValue((prev) => {
    const newStateSearch = {
    ...prev,
    input:event.target.value
    }
    return newStateSearch
})

console.log(searchValue)
setShowBackground(true)

    }
    
    useEffect(() => {
        if (searchValue.input.length >= 2) {
            const backgroundItemArray: readyTest[] = tests.filter((item?: readyTest) =>
                item?.[3][0].header.title.value.toLowerCase().includes(searchValue.input.toLowerCase())
            );
            setBackground(backgroundItemArray);
        } else {
            setBackground([]);
        }
    }, [searchValue.input]);
    const HandleClickBtn = () => {
        const newSearchTests = tests.filter((item:readyTest) => { return  item[3][0].header.title.value.toLowerCase().includes(searchValue.input.toLowerCase()) 
       
    })
    setTestsSearch(newSearchTests)
    }
    useEffect(() => {
        console.log(viewTests)
        
        context?.dispatch({type:'updateView',payload: viewTests})
    },[viewTests])
    const handleDeleteCheckedTest = () => {
        const nedw = new Set([])
        setViewTests(nedw)
    }
    const handleClickBackground = (path:string) => {
       
        setSearchValue({
            ...searchValue,
            input:path,
        }) 
        HandleClickBtn()
        setBackground([])
        setShowBackground(false)
    }
    useEffect(() => {
        HandleClickBtn()
      
        const examplare = new SearchGetData('https://telegrambotfishcombat-default-rtdb.firebaseio.com/', 'usersTests.json')
        examplare.getData(`${examplare.path}${examplare.tests}`, 'GET').then((response:any) => {
            const testsArray:readyTest[] = []
           for(const [key,value] of Object.entries(response)) {
const valueTest = value as readyTest
testsArray.push(valueTest)
}
setTests(testsArray)
        }).then(() => {
            setLoading(false)
        })
        
    },[])
   
    useEffect(() => {
        HandleClickBtn()
    },[tests])
return (
    <div className="alreadyTests">
        <div className="alreadyTests__checkedTests">
<div className="alreadyTests__checkedTestsHeader">
    <h1 className="alreadyTests__checkedTestsTitle">Недавно посещали</h1>
    <span onClick={handleDeleteCheckedTest} style={{color: 'blueviolet'}} className="alreadyTests__checkedTestsDelete">Очистить</span>
</div>
    <ul className="alreadyTests__checkedTestsList">
       
     {  view?.size  ? (Array.from(view).map((str:string,index:number) => { 
        console.log(str);
        return  <TestMiniItem key={index} name={str}></TestMiniItem> 
        }
        )
    ):null
    }
    </ul>
        </div>
        <div className="alreadyTests__content">
        <div className="alreadyTests__header">
<div className="alreadyTests__headerInfo">
    <p className="alreadyTests__headerInfoText">Все тесты</p>
    <span className="alreadyTests__headerInfoCount">{testsSearch?.length}</span>
</div>
<button className="alreadyTests__headerCreateBtn"><Link to='/createTest' className="alreadyTests__headerCreateBtnText">Создать Тест</Link></button>
        </div>
        <div className='alreadyTests__search'>
        <div className="alreadyTests__headerSearchElement">
            <input onChange={(event) => handleChangeInputSearch(event)} value={searchValue.input} className="alreadyTests__headerSearchElementInput"></input>
            <div  onClick={HandleClickBtn} className="alreadyTests__headerSearchElementIconsContainer">
            <IoSearchSharp  className='alreadyTests__headerSearchElementIcons' size={30} color="blueviolet"></IoSearchSharp>
            </div>
            <Select setSearchValue={setSearchValue} searchValue={searchValue} setTestsSearch={setTestsSearch} testsSearch={testsSearch} ></Select>
        </div>
            <BackgroundSearch show={showBackground}handleClickBackground={handleClickBackground} background={background}></BackgroundSearch>
        </div>
        <div className="alreadyTests__tests">
      { 
       loading ? <div className="alreadyTests__loading"></div>: testsSearch.map((item:any,index:number ) => {
            return (
                <TestItem setViewTests={setViewTests} test={item} key={index}></TestItem>
            )
        })
      }
          
        </div>
        </div>
    </div>
)
}
export default AlreadyTests
