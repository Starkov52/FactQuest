import React,{useState} from 'react'
import { FaStarOfDavid } from "react-icons/fa6";
import { CgSmileMouthOpen } from "react-icons/cg";
import { CgSmile } from "react-icons/cg";
import { CgSmileUpside } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { CgSmileNeutral } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
type ConfrimProps =  {
    display:string, 
    setDisplay: React.Dispatch<string>
}
function Grade({display, setDisplay}:ConfrimProps) {
    const [star,setStar] = useState(0)
    const renderingArray = [0,1,2,3,4]
    const handleFindHoverElement = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement
if(target.dataset.f !== undefined) {
setStar(Number(target.dataset.f))
}
    }
    const smileRender = () => {
        switch(star) {
            case 0: {
                return <CgSmileSad color='yellow' size='50'></CgSmileSad>
                break;
            }
            case 1: {
                return <CgSmileNeutral color='yellow' size='50'></CgSmileNeutral>
                break;
            }
            case 2: {
                return <CgSmileUpside color='yellow' size='50'></CgSmileUpside >
                break;
            }
            case 3: {
                return <CgSmile color='yellow' size='50'></CgSmile>
                break;
            }
            case 4: {
                return <CgSmileMouthOpen color='yellow' size='50'></CgSmileMouthOpen>
                break;
            }
        }
    }
    return (
        <div style={{
            display: `${display}`
        }} className='grade'>
            <div  onMouseOver={handleFindHoverElement} className='grade__stars'>
               
               {
                renderingArray.map((item,index) => {
                    if(index <= star) {
                    return (
                        <FaStarOfDavid key={index} data-f={index} size='28' color='yellow'></FaStarOfDavid>
                    )
                } else {
                    return (
                        <FaStarOfDavid key={index}  data-f={index} size='28' color='blue'></FaStarOfDavid>
                    )
                }
                })
               }
            </div>
           {smileRender()}
            <p className='grade__text'>Оцените пройденный тест</p>
            <IoMdClose onClick={ () => setDisplay('none')} className='grade__closeIcon' color='black' size='35'></IoMdClose>
        </div>
    )
}
export default Grade