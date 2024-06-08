import { useState, useEffect } from "react";

const Counter = (props) => {

    const iCount = props.count ? props.count : 0;
    const [count, setCounter] = useState(iCount);
    const [isRed, setIsRed] = useState(false); 
  
    const togglePlaceholderColor = () => { 
        setIsRed(!isRed); 
        if(count == 0)
        {
            setIsRed(false);
        }
    }; 

    useEffect(() => {
        let storedVal = localStorage.getItem('count');
        setCounter(storedVal ? Number(storedVal) : iCount);
    }, []);

    const updateLocalStorage = (count) => {
        if(count === 0 || count <= iCount) {
            localStorage.removeItem('count');
        } else {
            localStorage.setItem('count', count);
        }
    }

    const incrementCount = () => {
        if (count < 20) {
            let newCount = count + 1;
            setCounter(count => newCount);
            updateLocalStorage(newCount);
        }

        if(count == 10)
        {
            togglePlaceholderColor();
        }
    };


    const decrementCount = () => {
        if (count > 0 && count > iCount) {
            let newCount = count - 1;
            setCounter(count => newCount);
            updateLocalStorage(newCount);
        }
    };
    
    const resetCount = () => {
        setCounter(iCount);
        updateLocalStorage(iCount);
    }

    return(
        <div style={{margin:'50px'}}>
            <div>initialCount : {iCount} &nbsp;&nbsp;&nbsp;</div>
            <br></br>
            <button onClick={decrementCount}>-</button>
            <span style={{ color: isRed == true ? 'red' : 'black' }}>&nbsp;&nbsp;&nbsp;Current Value : {count} &nbsp;&nbsp;&nbsp;</span>
            <button onClick={incrementCount}>+</button>
            <button  onClick={resetCount} style={{display:(count == iCount ? "none" : ""),marginLeft:'50px'}}>Reset</button>
        </div>
    );
}
export default Counter;
