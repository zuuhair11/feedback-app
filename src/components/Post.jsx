import { useParams } from "react-router-dom" ;
import { Navigate, useNavigate, Routes, Route } from 'react-router-dom' ;


function Post() {
    // useparams()
    const params = useParams();



    // Navigate
    const status = 200;

    // It's like Link, but here we can do something and then navigate
    const navigate = useNavigate();
    const onClick = () => {
        console.log('Update something on the serve');
        console.log('Finish updating');
        console.log('Then go to about page');
        navigate('/about');
    }

    if(status === 404) {
        return <Navigate to='/notfound' />
    }

    return (
        <div>
            {/* useparams */}
            <h1>Post: { params.id }</h1>
            <p>Name: { params.name }</p>
            
            <h1>Post</h1>
            <button onClick={ onClick }>Click</button>
            

            {/* 
                You rendered descendant <Routes> at "/post" 
                (under <Route path="/post">) but the parent route path has 
                no trailing "*". This means if you navigate deeper, 
                the parent won't match anymore and therefore the child 
                routes will never render.
                Please change the parent <Route path="/post"> to 
                <Route path="/post/*">.
                
                ==> We have to change the parent to <Route path="/post/*"
            */}
            <Routes>
                <Route path='/show' element={ <h1>Hello World</h1> }/>
            </Routes>
        </div>
    );
}


export default Post;
