import { createContext, useContext, useState } from 'react'
import FullScreenLoader from '../components/FullScreenLoader/FullScreenLoader'

const LoadingContext = createContext()

export const useLoading = () => useContext(LoadingContext)

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {isLoading && <FullScreenLoader />}
            {children}
        </LoadingContext.Provider>
    )
}
