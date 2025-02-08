import React from 'react'

interface Props  {
    value: string
    onChange: (string: string) => any,
    handleSelectTrueAnswer?: (event: React.MouseEvent<HTMLInputElement>) => any,
    handleCheckBoxTrueAnswers?:(event: React.MouseEvent<HTMLInputElement>) => any,
}

const InputAnswer = ({value, onChange, handleSelectTrueAnswer, handleCheckBoxTrueAnswers}: Props) => {
    const handleChangeAnswer = (event:React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
      
    }
 
   
    return (
    <input onDoubleClick={(event) => handleSelectTrueAnswer ? handleSelectTrueAnswer(event) : handleCheckBoxTrueAnswers ? handleCheckBoxTrueAnswers(event):null} value={value} onChange={handleChangeAnswer} className="radioAnswer__input" ></input>
    )
}
export default InputAnswer