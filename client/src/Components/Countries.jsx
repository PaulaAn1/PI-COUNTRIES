import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clean, getAllCountries } from '../Redux/actions';
import Country from './Country';
import Pagination from './Pagination';
import './Countries.css';

export const Countries = () => {
    const countriesFil = useSelector(state => state.countryFiltered);
    const countries = useSelector(state => state.countries);
    let dispatch = useDispatch();

    const currentPages = useSelector((state) => state.currentPage);
    const pages = 10;
    const idLastCard = currentPages === 1 ? 8 : currentPages * pages - 2;
    const idFirstCard = currentPages === 1 ? 0 : idLastCard - pages + 1;
    const totalCard = countriesFil.length;
    const currentCountries = countriesFil.slice(idFirstCard, idLastCard + 1);


    useEffect(() => {
        if (countriesFil.length === countries.length) {
            dispatch(getAllCountries());
            console.log(true);
        } else {
            console.log(false);
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

