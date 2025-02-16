import React,{useState} from 'react'
import { FaStar } from "react-icons/fa";
import { CgSmileMouthOpen } from "react-icons/cg";
import { CgSmile } from "react-icons/cg";
import { CgSmileUpside } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { CgSmileNeutral } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
type ConfrimProps =  {
    display:string, 
    setDisplay: React.Dispatch<string>,
    grade: number,
    setGrade: React.Dispatch<number>,
    handleModalSend: () => void
}
function Grade({display, setDisplay,grade,setGrade,handleModalSend}:ConfrimProps) {
    const [star,setStar] = useState(0)
    const renderingArray = [0,1,2,3,4]
    const handleFindHoverElement = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement
if(target.dataset.f !== undefined) {
setStar(Number(target.dataset.f))
}
    }
    React.useEffect(() => {
        setGrade(star + 1)
    },[star])
    const smileRender = () => {
        switch(star) {
            case 0: {
                return <CgSmileSad color='black' size='50'></CgSmileSad>
                break;
            }
            case 1: {
                return <CgSmileNeutral color='black' size='50'></CgSmileNeutral>
                break;
            }
            case 2: {
                return <CgSmileUpside color='black' size='50'></CgSmileUpside >
                break;
            }
            case 3: {
                return <CgSmile color='black' size='50'></CgSmile>
                break;
            }
            case 4: {
                return <CgSmileMouthOpen color='black' size='50'></CgSmileMouthOpen>
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
                        <FaStar key={index} data-f={index} size='28' color='yellow'></FaStar>
                    )
                } else {
                    return (
                        <FaStar key={index}  data-f={index} size='28' color='grey'></FaStar>
                    )
                }
                })
               }
            </div>
           {smileRender()}
            <p className='grade__text'>Оцените пройденный тест</p>
            <IoMdClose onClick={ handleModalSend} className='grade__closeIcon' color='black' size='35'></IoMdClose>
        </div>
    )
}
export default Grade