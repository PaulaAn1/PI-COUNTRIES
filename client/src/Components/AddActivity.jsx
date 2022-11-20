import { useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity, getAllCountries } from '../Redux/actions';
import { Link } from 'react-router-dom';
import './AddActivity.css';

let validateForm = (input) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;


    if(!input.name) {
        errors.name = "This field is required!"
    } else if (!regexName.test(input.name)){
        errors.name = "Name can be a number!"
    } else if (/[$%&|<>#]/.test(input.name)) {
        errors.name = "Name cannot contain special characters!"
    }
    if(!input.difficulty) {
        errors.difficulty = "This field is required!"
    } else if(input.difficulty > 5 || input.difficulty < 1 ) {
        errors.difficulty = "difficulty must be a number between 1-5!"
    }
    if(!input.duration) {
        errors.duration = "This field is required!"
    } else if(input.duration > 24 || input.duration < 1 ) {
        errors.duration = "difficulty must be a number between 1-24!"
    }   
    if(!input.season) {
        errors.season = "This field is required!"
    }    
    /* if(!input.season2) {
        errors.season2 = "This field is required!"
    }  */   

    return errors;
}

export const AddActivity = () => {
    const countries = useSelector((state) => state.countries);
    let dispatch = useDispatch();

    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        /* season2: '', */
        countries: []
    });
    const [errors, setErrors] = useState({});
    
    
    let history = useHistory()
    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch]);

    
    function onInputChange (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validateForm({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(el) {
        el.preventDefault();
        if (input.countries.includes(el.target.value)) {
            return alert("este país ya esta cargado");
        } else {
            setInput({
            ...input,
            countries: [...input.countries, el.target.value],
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validateForm({
            input,
            [e.target.name]: e.target.value
        }))
    
        if (Object.values(errors).length === 0) {
            dispatch(addActivity(input));
            alert("Actividad Creada");
            setInput({
            name: "",
            difficulty: [],
            duration: "",
            season: [],
            /* season2: [], */
            });
            history.push("/home");
        } else {
            alert("complete los datos por favor");
        }
    }

    function handleDelete(e) {
        setInput({
            ...input,
            countries: input.countries.filter(ele => ele !== e)
        })
    }

    /* function onInputChanges(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    } */

    return (
        <div id='contacdcdc'>
            <form onSubmit={handleSubmit} method="post" id="contact_form">
                <h2>Add New Activity</h2>
                <div className="name">
                    <label htmlFor="name"></label>
                    <input type="text" placeholder="Activity Name" name="name" onChange={(e) => onInputChange(e)} value={input.name} id="name_input" required />
                    {errors.name && <p className='cdsdvsdvs'>{errors.name}</p>}
                </div>
                <div className="difficulty">
                    <label htmlFor="difficulty"></label>
                    <input type="number" placeholder="Activity Difficulty" name="difficulty" onChange={(e) => onInputChange(e)} value={input.difficulty} id="difficulty_input" required />
                    {errors.difficulty && <p className='cdsdvsdvs'>{errors.difficulty}</p>}
                </div>
                <div className="duration">
                    <label htmlFor="duration"></label>
                    <input type="text" placeholder="Activity Duration" name="duration" onChange={(e) => onInputChange(e)} value={input.duration} id="duration_input" required />
                    {errors.duration && <p className='cdsdvsdvs'>{errors.duration}</p>}
                </div>
                <div className="season">
                    <label htmlFor="season"><b>Season</b></label>
                    <br />
                    <label>
                        Winter
                        <input
                            type="radio"
                            value="Winter"
                            name="season"
                            onChange={(e) => onInputChange(e)}
                        />
                    </label>
                    <label>
                        Summer
                        <input
                            type="radio"
                            value="Summer"
                            name="season"
                            onChange={(e) => onInputChange(e)}
                        />
                    </label>
                    <label>
                        Spring
                        <input
                            type="radio"
                            value="Spring"
                            name="season"
                            onChange={(e) => onInputChange(e)}
                        />
                    </label>
                    <label>
                        Fall
                        <input
                            type="radio"
                            value="Fall"
                            name="season"
                            onChange={(e) => onInputChange(e)}
                        />
                    </label>
                        {errors.season && <p className='cdsdvsdvs'>{errors.season}</p>}
                </div>
                {/* <div>
                    <label htmlFor="season2">Season2</label>
                    <label>
                        Alta
                        <input
                            type="radio"
                            value="Alta"
                            name="season2"
                            onChange={(e) => onInputChanges(e)}
                        />
                    </label>
                    <label>
                        Media
                        <input
                            type="radio"
                            value="Media"
                            name="season2"
                            onChange={(e) => onInputChanges(e)}
                        />
                    </label>
                    <label>
                        Baja
                        <input
                            type="radio"
                            value="Baja"
                            name="season2"
                            onChange={(e) => onInputChanges(e)}
                        />
                    </label>
                        {errors.season2 && <p className='cdsdvsdvs'>{errors.season2}</p>}
                    </div> */}
                <div className="subject">
                <label htmlFor="subject"></label>
                <select placeholder="Subject line" name="subject" onChange={handleSelect} id="subject_input" required>
                    {
                        countries.map(ele => (
                            <option value={ele.name} id={ele.id}>{ele.name}</option>
                        ))
                        
                    }
                </select>
                </div>
                <div className="paisAgregado">
                    {input.countries.map((el) => (
                    <div className="agregados" key={el}>
                        <p>{el}</p>
                        <button onClick={() => handleDelete(el)}>X</button>
                    </div>
                    ))}
                </div>
                <div>
                    <button className='submit' type="submit" value="Add Activity" id="form_button" >Add Activity</button>
                </div>
            </form>

                <div className='main3455'>
                    <Link to={'/home'}>
                        <button>Back</button>
                    </Link> 
                </div>
            
        </div> 
    )
}

/* export default Countries; */
