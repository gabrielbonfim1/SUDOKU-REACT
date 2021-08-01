import React from 'react'
import { useState, useEffect } from 'react'
import Cell from './components/Cell'
import { initalGridValues, initalWrongValues } from './initials/initial'

// Function to check wrong filled squares on the Grid
function check(grid,setWrong){
    let newWrong = Array(9).fill(null).map(() => Array(9).fill(0));
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){            
            // Check Row and Collumn
            for(let t=0;t<9;t++){
                if((grid[i][t] === grid[i][j] && j !== t && grid[i][j] !=='') || (grid[t][j] === grid[i][j] && i !== t && grid[i][j] !=='')){
                    newWrong[i][j]=1
                }
            }

            //Check Square
            let ii = Math.floor(i/3)*3
            let jj = Math.floor(j/3)*3
            for(let k = ii; k<ii+3;k++){
                for(let l = jj; l<jj+3;l++){
                    if(grid[k][l] === grid[i][j] && grid[i][j] !== '' && (k !== i || l !== j)){
                        newWrong[i][j] = 1
                    }
                }
            }
        }
    }
    setWrong(newWrong)
}





const App = () => {
    
    const [grid, setGrid] = useState(initalGridValues)
    const [wrong,setWrong] = useState(Array(9).fill(null).map(() => Array(9).fill(0)))
    
    //Keyboard listener to set numbers on Grid
    useEffect(()=>{
        window.addEventListener('keyup', handleKeyDown)
        return () => {
            window.removeEventListener('keyup', handleKeyDown);
        };
    })

    function setCell(i,j){
        return (value) => {
            const newGrid = [...grid]
            newGrid[i][j] = value
            setGrid(newGrid)    
        }        
    }

    // Set the Wrong Cells with the 'wrong' props
    useEffect(()=>{
        check(grid,setWrong)       

        return (()=>{
            let newWrong = [...initalWrongValues]
            setWrong(newWrong)
        })
    },[grid])

    function handleKeyDown(event){
        
        //set grid with key the key pressed
        if (['Backspace','0','1','2','3','4','5','6','7','8','9'].includes(event.key)){
            if (event.target.classList[0] === 'Cell'){
                const i = event.target.attributes.i.value
                const j = event.target.attributes.j.value           
                
                if (event.key === 'Backspace' || event.key === '0'){
                    setCell(i,j)('') 
                }else{
                    setCell(i,j)(event.key)
                }
                
            }
        }    
    }


    return (
        <div className="App">
            <h1>Sudoku Game</h1>
            <h5>By Gabs</h5>
            <hr></hr>
            <table>
                <tbody>
                    {grid.map((row,i) => (
                        <tr key={i}>
                            {row.map((col,j) => (
                                <td key={j}>    
                                    <Cell value={grid[i][j]} wrong={wrong[i][j]} i={i} j={j}/>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    )
}

export default App