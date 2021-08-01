import React from 'react'


const Cell = (props) => {
    const {i,j,value,wrong} = props
    
    function setClass(){
        let className = 'Cell '
        if (wrong === 1) {
            className += 'wrong'
        }
        return className
    }

    return (
        <input i={i} j={j} className={setClass()} type='text' value={value} readOnly/>        
    )
}

export default Cell