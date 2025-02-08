import React, { ChangeEvent } from 'react'
import { FaSortAmountUp } from "react-icons/fa";
import useFlag from '../flasgHook'
import {searchState} from '../components/listUserTests'
function Select({setSearchValue, searchValue, setTestsSearch, testsSearch}:any ) {
   const handleChangeFlag = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    console.log(value)
setSearchValue((prev:any) => {
    const newObj = {
    ...prev,
    flag: value
    }
    return newObj
})
    }
    console.log(searchValue)
    const testsSorted = useFlag(searchValue.flag, testsSearch)
    React.useEffect(() => {
        setTestsSearch(testsSorted)
    },[searchValue.flag])
    return (
        <div className="selectElement">
            <FaSortAmountUp size='25' color='black'></FaSortAmountUp>
        <select onChange={(event) => handleChangeFlag(event)} className='selectElement__select'>
            <option  className='selectElement__item' value='dateUp'>По дате(новые)</option>
            <option  className='selectElement__item' value='dateDown'>По дате(старые)</option>
            <option  className='selectElement__item' value='starsUp'>По рейтингу(возвр)</option>
            <option  className='selectElement__item' value='starsDown'>По рейтингу(пониж)</option>
            <option  className='selectElement__item' value='countAccesUp'>По прохождениям(возвр)</option>
            <option  className='selectElement__item' value='countAccesDown'>По прохождениям(пониж)</option>
        </select>
        </div>
    )
}
export default Select
