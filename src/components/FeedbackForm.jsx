import { useContext, useState, useEffect } from 'react' ;
import RatingSelect from './RatingSelect' ;
import Card from './shared/Card' ;
import Button from './shared/Button' ;
import FeedbackContext from '../context/FeedbackContext' ;


function FeedbackForm() {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');

    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext);

    // Listen for any changes on feedbackEdit object
    useEffect( () => {
        if(feedbackEdit.edit === true) {
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating);
        }

    }, [feedbackEdit]);

    const handleChange = (e) => {
        if(text === '') {
            setBtnDisabled(true);
            setMessage(null);

        } else if(text !== '' && text.trim().length <= 10) {
            setMessage('Text must be at least 10 characters');
            setBtnDisabled(true);

        } else {
            setMessage(null);
            setBtnDisabled(false);
        }

        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(text.trim().length > 10) {
            const newFeedback = {
                text,
                rating
            }

            // Checking if the submited data is actually an update
            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback);

            } else {
                addFeedback(newFeedback);
            }
            
            // Clearing up the the field
            setText('');
        }
    }

    return (
        <Card>
            <form onSubmit={ handleSubmit }>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={ rating => setRating(rating) } />

                <div className='input-group'>
                    <input
                        type='text'
                        placeholder='Write a review'
                        onChange={ e => handleChange(e) }
                        value={ text }
                    />

                    <Button type='submit' isDisabled={ btnDisabled } >Send</Button>
                </div>

                { message && <div className='message'>{ message }</div> }
            </form>
        </Card>
    );
}


export default FeedbackForm;
