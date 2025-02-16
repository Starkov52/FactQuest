import React, { SetStateAction } from 'react'
import { GrLike } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { Comment } from '../App';
type props = Comment & {setLike: React.Dispatch<number>}
function CommentItem({author,value, date,likes,setLike}:props) {
    
    return (
        <div className='passingTest__commentItem'>
            <div className='passingTest__commentProfile'>
            <FaUserCircle size='40' color='grey'></FaUserCircle>
            <p className='passingTest__commentAuthorName'>{author}</p>
            </div>
            <p className='passingTest__commentValue'>{value}</p>
            <div onClick={() => setLike(likes + 1)}className='passingTest__likeCountainer'>
               
 
            </div>
            <p className='passingTest__date'>{date.toString().slice(0,25)}</p>
        </div>
    )
}
export default CommentItem