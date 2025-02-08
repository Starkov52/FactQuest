import React from 'react'
import test from '../images/person_11681696.png'
function testMiniItem({name}:any) {
    return (
        <div className="alreadyTests__checkedTestItem">
            <img className="alreadyTests__checkedTestIcon" src={test}></img>
            <p className="alreadyTests__checkedTestTitle">{name}</p>
        </div>
    )
}
export default testMiniItem