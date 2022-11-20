import React from 'react'
import { Link } from 'react-router-dom';
import './Country.css';

const Country = ({posts}) => {
    if (posts.length === 0) {
        return <div className="spinner-container">
            <div className="loading-spinner">
            </div>
        </div>;
        }

        return (
            <div className='main'>
                {posts.map(post => (
                <Link to={`/${post.id}`} id='link'>
                    <div key={post.id}>
                        <div className='div2'>
                            <h2 className='h2'>{post.name}</h2>
                        </div>
                        <img className='img' src={post.flag} alt="imgen" />
                        <div className='div3'>
                            <h3 className='h3'>{post.continent}</h3>
                        </div>
                    </div>
                </Link>
                ))}
            </div> 
        )
    }
    
export default Country