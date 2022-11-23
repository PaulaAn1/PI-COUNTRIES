import axios from 'axios';
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY = "GET_COUNTRY";
export const DELETE_COUNTRY = "DELETE_COUNTRY";
export const SORT_COUNTRY_BY_ASCDES = "SORT_COUNTRY_BY_ASCDES";
export const SORT_COUNTRY_BY_POPULATION = "SORT_COUNTRY_BY_POPULATION";
export const FILTER_COUNTRY_BY_CONTINENT = "FILTER_COUNTRY_BY_CONTINENT";
export const FILTER_COUNTRY_BY_ACTIVITY = "FILTER_COUNTRY_BY_ACTIVITY";
export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
export const SET_PAGE = "SET_PAGE";
export const CLEAN = "CLEAN";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";

export const getAllCountries = () => {
    return function (dispatch) {
        axios.get('http://localhost:3001/api/countries')
        .then(country => {
            dispatch({
            type: GET_ALL_COUNTRIES,
            payload: country.data
        })
        })
        .catch(error => {
            console.error(error);
        })
    }
}
export const getCountryDetail = (id) => {
    return function (dispatch) {
    return (
        axios.get(`http://localhost:3001/api/countries/${id}`)
        .then(country => {
            dispatch({
            type: GET_COUNTRY_DETAIL,
            payload: country.data
            })
        })
        .catch(err => {
        console.error(err);
        })
    )
    }
    }

    export const getCountry = (name) => {
    return function (dispatch) {
    return (
        axios.get(`http://localhost:3001/api/countries?name=${name}`)
        .then(country => {
            dispatch({
            type: GET_COUNTRY,
            payload: country.data
            })
        })
        .catch(err => {
            alert('No existe este país');
        })
    )
    }
    }
    export const getActivities = () => {
    return async function (dispatch) {
        const res = await axios.get(`http://localhost:3001/api/activities`)
        dispatch({
            type: GET_ACTIVITIES,
            payload: res.data
        })
        
    }
    }

    export const sortCountryByAscDes = (order) => {
    return {
        type: SORT_COUNTRY_BY_ASCDES,
        payload: order
    }
    }
    export const sortCountryByPopulation = (order) => {
    return {
        type: SORT_COUNTRY_BY_POPULATION,
        payload: order
    }
    }

    export const filterCountryByContinent = (payload) => {
    return {
        type: FILTER_COUNTRY_BY_CONTINENT,
        payload,
    }
    }

    export const filterCountryByActivity = (order) => {
    return {
        type: FILTER_COUNTRY_BY_ACTIVITY,
        payload: order
    }
}
    export const addActivity = (payload) => {
    return async function (dispatch) {
        return axios.post('http://localhost:3001/api/activities', payload)
        .then(country => {
            dispatch({
            type: ADD_ACTIVITY,
            payload: country.data
            })
        })

        .catch(err => {
        console.error(err);
        })
    }
}

export function setCurrentPage(page) {
    return {
    type: SET_PAGE,
    payload: page,
    };
}

export function Clean() {
    return function (dispatch) {
    dispatch({
        type: CLEAN,
    });
    };
}
