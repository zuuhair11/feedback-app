import { v4 as uuidv4 } from 'uuid' ;
import { BrowserRouter,Routes, Route, NavLink } from 'react-router-dom' ;
import Card from './components/shared/Card' ;
import { useState } from 'react' ;
import Header from './components/Header' ;
import FeedbackList from './components/FeedbackList' ;
import FeedbackStats from './components/FeedbackStats' ;
import FeedbackForm from './components/FeedbackForm' ;
import AboutIconLink from './components/AboutIconLink' ;
import AboutPage from './pages/AboutPage' ;
import FeedbackData from './data/feedbackData' ;
// Use params
import Post from './components/Post' ;


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

                    {/* useParams */}
                    <Route path='/post/:id/:name' element={ <Post /> } />

                    {/* Navigate */}
                    <Route path='/post/*' element={ <Post /> } />
                </Routes>
                

                {/* NavLink */}
                <Card>
                    <NavLink to='/' activeclassname='active'>
                        Home
                    </NavLink>

                    <NavLink to='/about' activeclassname='active'>
                        About
                    </NavLink>
                </Card>
                
                {/* Link */}
                <AboutIconLink />
            </div>
        </BrowserRouter>
    );
}


export default App;
