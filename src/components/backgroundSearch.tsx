import React,{FC} from 'react'
import { CiSearch } from "react-icons/ci"
import { TbBackground } from 'react-icons/tb'
import { readyTest } from '../App'
 interface props {
    background: readyTest[] | undefined,
    handleClickBackground: (path:string) => any,
    show: boolean
 }
const BackgroundSearch: FC<props> = ({background, handleClickBackground,show}) => {
    return (
        <div style={{visibility: show ? 'visible' : 'hidden'}} className="alreadyTests__background">
            {background?.map((item:readyTest,index:number) => {
                return <div  onClick={() =>  handleClickBackground(item[3][0].header.title.value.toLowerCase())} key={index} className='alreadyTests__backgroundItem'>
                <CiSearch size='30' color='grey'></CiSearch>
                <p className='alreadyTests__testTitle'>{item[3][0].header.title.value.toLowerCase()}</p>
            </div>
            })}
            
        </div>
    )
}
export default BackgroundSearch