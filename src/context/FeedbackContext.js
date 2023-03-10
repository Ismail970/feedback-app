// import { createContext, useState, useEffect } from 'react';
import { createContext, useState } from 'react';
import { v4 as uuidv4 } from "uuid"
import FeedbackData from "../data/FeedbackData"

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    // const [isLoading, setIsLoading] = useState(true)
    // const [error, setError] = useState(false)
    // const [feedback, setFeedback] = useState([])
    const [feedback, setFeedback] = useState(FeedbackData)
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // useEffect(() => {
    //     fetchFeedback()
    // }, [])

    // Fetch feedback
    // const fetchFeedback = async () => {
    //     try {
    //         const response = await fetch("/feedback?_sort=id&_order=desc")
    //         const data = await response.json()

    //         if (!response.ok) throw new Error()

    //         setFeedback(data)
    //         setIsLoading(false)
    //     } catch (err) {
    //         setError(true)
    //     }
    // }

    // Add feedback
    const addFeedback = async newFeedback => {
        // const response = await fetch("/feedback", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(newFeedback),
        // })

        // const data = await response.json()

        // setFeedback([data, ...feedback]);

        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback]);
    };

    // Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    // Update item
    const updateFeedback = async (id, updItem) => {
        // const response = await fetch(`/feedback/${id}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-type": "application/json"
        //     },
        //     body: JSON.stringify(updItem)
        // })

        // const data = await response.json()

        // setFeedback(feedback.map(item => item.id === id ? { ...item, ...data } : item))

        setFeedback(feedback.map(item => item.id === id ? { ...item, ...updItem } : item))
    }

    // Delete feedback
    const deleteFeedback = async id => {
        // await fetch(`/feedback/${id}`, { method: "DELETE" })

        setFeedback(feedback.filter(item => item.id !== id));
    };

    return <FeedbackContext.Provider
        value={{
            feedback,
            feedbackEdit,
            // isLoading,
            // error,
            deleteFeedback,
            addFeedback,
            editFeedback,
            updateFeedback,
            setFeedbackEdit,
        }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext