import { useState, useContext, useEffect } from "react"
import RatingSelect from "./RatingSelect"
import Card from "./shared/Card"
import Button from "./shared/Button"
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm () {
    const [text, setText] = useState("")
    const [rating, setRating] = useState(10)
    const [btnDisabled, setbtnDisabled] = useState(true)
    const [message, setMessage] = useState("")

    const { addFeedback, feedbackEdit, setFeedbackEdit, updateFeedback } = useContext(FeedbackContext)

    useEffect(() => {
        if (!feedbackEdit.edit) return

        setbtnDisabled(false)
        setText(feedbackEdit.item.text)
        setRating(feedbackEdit.item.rating)
    }, [feedbackEdit])

    const handleTextChange = e => {
        setbtnDisabled(text === "" || text.trim().length <= 10);
        setMessage(
            (text === "" && null) ||
            (text !== "" && text.trim().length <= 10 && "Text must be at least 10 characters")
        )
        setText(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating
            };

            if (feedbackEdit.edit) updateFeedback(feedbackEdit.item.id, newFeedback)
            else addFeedback(newFeedback)

            setText("");
            setFeedbackEdit({
                ...feedbackEdit,
                edit: false
            })
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us</h2>
                <RatingSelect select={rating => setRating(rating)} />
                <div className="input-group">
                    <input
                        onChange={handleTextChange}
                        type="text"
                        placeholder="Write a review"
                        value={text}
                    />
                    <Button type="submit" isDisabled={btnDisabled}>{feedbackEdit.edit ? "Save" : "Send"}</Button>
                </div>

                {message && <div className="message">{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm