import { createContext, useEffect, useState } from 'react'

const SubmissionContext = createContext()

export const SubmissionProvider = ({ children }) => {
    const [info, setInfo] = useState(() => {
        const storedInfo = localStorage.getItem('submissionInfo')
        return storedInfo ? JSON.parse(storedInfo) : {}
    })

    useEffect(() => {
        if (info?.submissionId) {
            localStorage.setItem('submissionInfo', JSON.stringify(info))
        }
    }, [info])

    return <SubmissionContext.Provider value={{ info, setInfo }}>{children}</SubmissionContext.Provider>
}

export default SubmissionContext
