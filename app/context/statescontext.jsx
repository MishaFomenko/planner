import {useContext, createContext, useState} from 'react'

const StatesContext = createContext();

export const StatesContextProvider = ({children}) => {
    const [cont, setCont] = useState({});

    return (
        <StatesContext.Provider value={{cont, setCont}}>
            {children}
        </StatesContext.Provider>
    )
}

export const useStatesContext = () => useContext(StatesContext);