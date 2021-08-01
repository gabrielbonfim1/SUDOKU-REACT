import React from 'react'


const Cell = (props) => {
    const {i,j,defaultValue,value,wrong} = props
    
    function setClass(){
        let className = 'Cell '
        if (wrong === 1) {
            className += 'wrong '
        }
        if (['1','2','3','4','5','6','7','8','9'].includes(defaultValue)){
            className += 'default'
        }
        return className
    }

    return (
        <input i={i} j={j} className={setClass()} type='text' value={value} readOnly/>        
    )
}

export default Cell