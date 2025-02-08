import React from 'react'
import { FormatedText } from './addQuestion'
import { MdOutlineFormatItalic } from "react-icons/md";
import { MdOutlineFormatUnderlined } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import {Format} from './createTest'
type HandleClick = {
    handleClickFormated: (format:Format, parametres:FormatedText) => any,
    format: Format
}
function FormatedLetters({format,handleClickFormated}:HandleClick) {
    return (
<ul className="createTest__TextForm">
<li data-F={FormatedText.fat} onClick={ () => handleClickFormated(format,FormatedText.fat)} className='createTest__fatText'>B</li>
<li data-F={FormatedText.italic} onClick={() =>handleClickFormated(format,FormatedText.italic)} className='createTest__italicText'><MdOutlineFormatItalic size={30} color='grey'></MdOutlineFormatItalic></li>
<li data-F={FormatedText.underlined} onClick={ () =>handleClickFormated(format,FormatedText.underlined)} className='createTest__underlinedText'><MdOutlineFormatUnderlined size={30} color='grey'></MdOutlineFormatUnderlined></li>
<li data-F={FormatedText.delete} onClick={() =>handleClickFormated(format,FormatedText.delete)} className='createTest__resetText'><IoClose  size={30} color='grey'></IoClose></li>
            </ul>
    )
}
export type ChangeLetters = React.ComponentProps<typeof FormatedLetters>
export default FormatedLetters