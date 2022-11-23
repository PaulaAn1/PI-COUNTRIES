import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clean, getActivities, getAllCountries } from '../Redux/actions';
import Country from './Country';
import Pagination from './Pagination';
import './Countries.css';

export const Countries = () => {
    const countries = useSelector(state => state.countries);
    const countriesFil = useSelector(state => state.countryFiltered);
    let dispatch = useDispatch();

    const currentPages = useSelector((state) => state.currentPage);
    const pages = 10;
    const idLastCard = currentPages === 1 ? 8 : currentPages * pages - 2;
    const idFirstCard = currentPages === 1 ? 0 : idLastCard - pages + 1;
    const totalCard = countriesFil.length;
    const currentCountries = countriesFil.slice(idFirstCard, idLastCard + 1);

    console.log(currentCountries)
    useEffect(() => {
        if (countriesFil.length === countries.length) {
            dispatch(getAllCountries());
            dispatch(getActivities());
        }
        
        return dispatch(Clean());
    }, [countriesFil.length, countries.length, dispatch]);   

    return (
        <div className='container1'>
            <Country 
                posts={currentCountries} 
            />
            <Pagination
                currentPages={currentPages}
                pages={pages}
                totalCard={totalCard}
            />
            <br />  
        </div> 
    )
}

