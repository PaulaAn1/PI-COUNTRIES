import { useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity } from '../Redux/actions';
import { Link } from 'react-router-dom';
import './AddActivity.css';

let validateForm = (input) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;


    if(!input.name) {
        errors.name = "This field is required!"
    } else if (!regexName.test(input.name)){
        errors.name = "Name cannot contain special characters!"
    } else if (/[$%&|<>#]/.test(input.name)) {
        errors.name = "Name cannot contain special characters!"
    } else if (typeof(input.name) === 'number') {
        errors.name = "Name cannot contain a number!"
    }
    if(!input.difficulty) {
        errors.difficulty = "This field is required!"
    } else if(input.difficulty > 5 || input.difficulty < 1 ) {
        errors.difficulty = "difficulty must be a number between 1-5!"
    } else if(typeof(input.difficulty) === 'number') {
        errors.difficulty = "difficulty must be a number!"
    }
    if(!input.duration) {
        errors.duration = "This field is required!"
    } else if(input.duration > 24 || input.duration < 1 ) {
        errors.duration = "difficulty must be a number between 1-24!"
    } else if(regexName.test(input.duration)) {
        errors.duration = "duration must be a number!"
    }  
    if(!input.season) {
        errors.season = "This field is required!"
    }
    
    if(input.countries.length === 0) {
        errors.countries = "This field is required!"
    }
    return errors;
}

export const AddActivity = () => {
    const Allcountries = useSelector((state) => state.countries);
    let dispatch = useDispatch();
    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: []
    });
    const [errors, setErrors] = useState({});
    
    
    let history = useHistory()
    
    
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
            return alert("This country is already loaded!");
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
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(Object.values(errors));
        if (Object.values(errors).length === 0) {
            dispatch(addActivity(input));
            alert("Activity Created!");
            setInput({
                name: "",
                difficulty: [],
                duration: "",
                season: [],
            });
            history.push("/home");
        } else {
            alert("Fill in all the information please!");
        }
    }
    
    function handleDelete(e) {
        setInput({
            ...input,
            countries: input.countries.filter(ele => ele !== e)
        })
    }

    useEffect(() => {
        setErrors(validateForm(input));
    }, [input]);

    return (
        <div id='contacdcdc'>
            <form onSubmit={handleSubmit} method="post" id="contact_form">
                <h2>Add New Activity</h2>
                <div className="name">
                    <label htmlFor="name"></label>
                    <input type="text" placeholder="Activity Name" name="name" onChange={(e) => onInputChange(e)} value={input.name} id="name_input" />
                    {errors.name ? <label className='cdsdvsdvs'>{errors.name}</label> : null}
                </div>
                <div className="difficulty">
                    <label htmlFor="difficulty"></label>
                    <input type="number" placeholder="Activity Difficulty" name="difficulty" onChange={(e) => onInputChange(e)} value={input.difficulty} id="difficulty_input" />
                    {errors.difficulty && <p className='cdsdvsdvs'>{errors.difficulty}</p>}
                </div>
                <div className="duration">
                    <label htmlFor="duration"></label>
                    <input type="text" placeholder="Activity Duration" name="duration" onChange={(e) => onInputChange(e)} value={input.duration} id="duration_input" />
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
                <div className="subject">
                <label htmlFor="subject"></label>
                </div>
                <div>
                    <select placeholder="Subject line" name="subject" onChange={(e) => handleSelect(e)} id="subject_input" >
                        {
                            Allcountries?.map(ele => (
                                <option value={ele.name} key={ele.name}>{ele.name}</option>
                            ))
                            
                        }
                    </select>
                    {errors.countries && <p className='cdsdvsdvs'>{errors.countries}</p>}
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

