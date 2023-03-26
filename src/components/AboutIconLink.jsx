import { Link } from 'react-router-dom' ;
import { FaQuestion } from 'react-icons/fa' ;


function AboutIconLink() {
    return (
        <div className='about-link'>
            <Link to='/about'>
                <FaQuestion size={ 30 } />
            </Link>
        </div>
    );

    // return (
    //     <div className='about-link'>
    //         <Link
    //             // You could add those manually in a string. ``
    //             to={{
    //                 pathname:'/about',
    //                 search: '?sort=name',
    //                 hash: '#hello'
    //             }}
    //         >
    //             <FaQuestion size={ 30 } />
    //         </Link>
    //     </div>
    // );
}


export default AboutIconLink;
