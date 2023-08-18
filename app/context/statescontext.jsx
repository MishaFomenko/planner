'use client'
import {useContext, createContext, useState} from 'react'

const StatesContext = createContext();



export const StatesContextProvider = ({children}) => {
    // let idun;
    // let localDays;
    // let localId;

    

    const originalDate = new Date();
    const year = originalDate.getFullYear();
    const month = String(originalDate.getMonth() + 1).padStart(2, "0");
    const day = String(originalDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    let initDate=formattedDate;
    


    const [typein, setTypein] = useState(new Array(9999).fill(''));
    const [dragged, setDragged] = useState(null);
    const [windowWidth, setWindowWidth] = useState(1440);
    const [idun, setIdun] = useState(0);

    const [days, setDays] = useState([{id:9999999, tasks:[], date:initDate}]);
    const [currentCard, setCurrentCard] = useState(days[0].id)

    

    
    
    
    

    return (
        <StatesContext.Provider value={{typein, setTypein, dragged, setDragged, windowWidth, setWindowWidth, days, setDays, currentCard, setCurrentCard, idun, setIdun, initDate}}>
            {children}
        </StatesContext.Provider>
    )
}

export const useStatesContext = () => useContext(StatesContext);