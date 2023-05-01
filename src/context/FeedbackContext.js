import { v4 as uuidv4 } from 'uuid' ;
import { createContext, useState } from "react" ;


const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is feedback item 1',
            rating: 10
        },
        {
            id: 2,
            text: 'This is feedback item 2',
            rating: 9
        },
        {
            id: 3,
            text: 'This is feedback item 3',
            rating: 7
        }
    ]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    // Add feedback
    const addFeedback = (newFeedback) => {
        setFeedback( prevFeedback => {
            newFeedback.id = uuidv4();
            return [newFeedback, ...prevFeedback];
        });
    }

    // Delete feedback
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            setFeedback( prevFeedback => {
                return prevFeedback.filter( item => item.id !== id);
            });
        }
    }

    // Update feedback item
    const updateFeedback = (id, updItem) => {
        setFeedback( prevFeedback => {
            return prevFeedback.map( item => {
                return item.id === id ? {...item, ...updItem} : item;
            });
        });

        // Starting fresh, so I can prevent from updating the last feedback
        setFeedbackEdit({item: {}, edit: false})
    }

    // Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item: item,
            edit: true
        });
    }


    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                feedbackEdit,
                deleteFeedback,
                addFeedback,
                editFeedback,
                updateFeedback
            }}
        >
            { children }
        </FeedbackContext.Provider>
    );
}


export default FeedbackContext;
