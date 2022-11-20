import axios from 'axios'
import { AFRICA, AMERICAS, ANTARCTIC, ASCENDENTE, ASIA, DESCENCENTE, EUROPE, HIGHEST, LOWEST, OCEANIA } from '../constantes/sort'
import { useDispatch, useSelector } from 'react-redux'
import { Clean, filterCountryByActivity, filterCountryByContinent, getAllCountries, sortCountryByAscDes, sortCountryByPopulation } from '../Redux/actions'
import './Order.css';
import { useEffect, useState} from 'react';


export const Order = () => {
    let dispatch = useDispatch();
    function onSelectChange(e) {
        (dispatch(sortCountryByAscDes(e.target.value)))
    }
    function onSelectChange1(e) {
        dispatch(sortCountryByPopulation(e.target.value))
    }
    function onSelectChange2(e) {
        dispatch(filterCountryByContinent(e.target.value))
    }
    function onSelectChange3(e) {
        dispatch(filterCountryByActivity(e.target.value));
        setOrder(`${e.target.value}`);
        console.log(filterCountryByActivity(e.target.value));
    }
    
    const [countrys, setCountrys] = useState([]);
    //eslint-disable-next-line no-unused-vars
    const [order, setOrder] = useState('');
    
    
    useEffect(() => {
        const fetchCountries = async () => {
            await axios.get('http://localhost:3001/api/activities')
            .then(res => {
                setCountrys(res.data)
            })
        };
        
        fetchCountries();
    }, []);

    return (
        <div className='container1234'>
            <div className='div2314'>
                <div className='divde233'>
                    <select name='order' onChange={onSelectChange}>
                        <option>Order</option>
                        <option value={ASCENDENTE}>A - Z</option>
                        <option value={DESCENCENTE}>Z - A</option>
                    </select>
                </div>
                <div className='divde233'>
                    <select name='population' onChange={onSelectChange1}>
                        <option>Population</option>
                        <option value={HIGHEST}>Highest</option>
                        <option value={LOWEST}>Lowest</option>
                    </select>
                </div>
                <div className='divde233'>
                    <select name='select' onChange={onSelectChange2}>
                        <option>Continent</option>
                        <option value={AMERICAS}>Americas</option>
                        <option value={ASIA}>Asia</option>
                        <option value={AFRICA}>Africa</option>
                        <option value={EUROPE}>Europe</option>
                        <option value={OCEANIA}>Oceania</option>
                        <option value={ANTARCTIC}>Antarctic</option>
                    </select>
                </div>
                <div className='divde233'>
                    <select name='select' placeholder='Activities' onChange={onSelectChange3}>
                        <option>Activity</option>
                        {
                            countrys?.map(ele => (
                                    <option key={ele.id} value={ele.name} id={ele.id}>{ele.name}</option>   
                            ))  
                        }
                    </select>
                </div>
            </div>
        </div>
    )
}
