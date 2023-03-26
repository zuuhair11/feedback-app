import { v4 as uuidv4 } from 'uuid' ;
import { BrowserRouter,Routes, Route } from 'react-router-dom' ;
import { useState } from 'react' ;
import Header from './components/Header' ;
import FeedbackList from './components/FeedbackList' ;
import FeedbackStats from './components/FeedbackStats' ;
import FeedbackForm from './components/FeedbackForm' ;
import AboutIconLink from './components/AboutIconLink' ;
import AboutPage from './pages/AboutPage' ;
import FeedbackData from './data/feedbackData' ;



function App() {
    const [feedback, setFeedback] = useState(FeedbackData);

    const addFeedback = (newFeedback) => {
        setFeedback( prevFeedback => {
            newFeedback.id = uuidv4();
            return [newFeedback, ...prevFeedback]
        });
    }
    
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            setFeedback( prevFeedback => {
                return prevFeedback.filter( item => item.id !== id);
            });
        }
    }
    
    return (
        <BrowserRouter>
            <Header />
            <div className="container">
                <Routes>
                    <Route
                        path='/'
                        element={
                            <>
                                <FeedbackForm handleAdd={ addFeedback } />
                                <FeedbackStats feedback={ feedback } />
                                <FeedbackList
                                    feedback={ feedback }
                                    handleDelete={ deleteFeedback }
                                />
                            </>
                        }
                    />
                    
                    <Route path='/about' element={ <AboutPage /> } />
                </Routes>
                
                {/* Link */}
                <AboutIconLink />
            </div>
        </BrowserRouter>
    );
}


export default App;
