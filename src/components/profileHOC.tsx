import React, { SetStateAction } from 'react'
import Profile from './profile'
import Registration from './AutoAndRegComponent'
import { Text } from './addQuestion'
import { ImportTypeContext } from '../App'
type state = {
    state: ImportTypeContext['state'] }
type formTextAndSet = {
    formText?: Text
    setFormText?: React.Dispatch<React.SetStateAction<Text>>
    formTextH?: Text
    setFormTextH?: React.Dispatch<React.SetStateAction<Text>>
    state: ImportTypeContext['state']
}
type PropsChecked<U> = U & (state | formTextAndSet) 
const profileHoc = <Props extends object  >(Component:React.ComponentType<PropsChecked<Props>>) => {
    return (props:PropsChecked<Props>) => {
if( 'state' in props && props.state.isAutorization) {
    return <Component {...props as PropsChecked<Props>}></Component>
} else if( 'formText' in props && props.state.isAutorization) {
   return <Component {...props as PropsChecked<Props>}></Component>
} else {
    return <Registration flag='reg'></Registration>
}
    }
}
export default profileHoc