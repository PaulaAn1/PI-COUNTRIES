import React from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './CountryDetail.css';
import { Clean, getCountryDetail } from '../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export const CountryDetail = () => {
    let {id} = useParams();
    let dispatch = useDispatch();
    const country = useSelector(state => state.details);

    useEffect(() => {
        dispatch(getCountryDetail(id))
        return dispatch(Clean());
    }, [dispatch, id])
    /* console.log(country.activities.map(e => console.log(e))); */
    return (
        <div className='ccmain'>
            {
                country ?
                <>
                <h1>{country.name}</h1>
                <img src={country.image} alt="flag" />
                <h3>Code: {country.id}</h3>
                <div className='main222'>
                    <h3><b>Continent:</b> {country.continent}</h3>
                    <h4> Capital: {country.capital ? country.capital : 'Capital not found!'}</h4>
                    <h5> Subregion: {country.subregion ? country.subregion : 'Subregion not found!' }</h5>
                </div>
                <div className='main234'>
                    <h3>Area: {Number.parseFloat(country.area).toLocaleString()} km2</h3>
                    <h4>Population: {country.population?.toLocaleString("es-AR") || ""} Hab.</h4>
                </div>
                <div className='main287'>
                    <h4>Tourist Activities:</h4>
                    <h5>{country.activities?.map(e => (
                            <div key={e.name} className="div123">
                                Name: {e.name}
                                <br />
                                Difficulty: {e.difficulty}
                                <br />
                                Duration: {e.duration} h.
                                <br />
                                Season: {e.season}
                            </div>
                    )) }</h5>
                </div>
                <div className='main3455'>
                    <Link to={'/home'}>
                        <button>Back</button>
                    </Link>
                </div>
                </> :
                <div>Loading...</div>
            }
        </div>
    )
}
