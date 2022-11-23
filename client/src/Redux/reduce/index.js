import { ASCENDENTE, HIGHEST } from "../../constantes/sort";
import { ADD_ACTIVITY, GET_ACTIVITIES, FILTER_COUNTRY_BY_ACTIVITY, FILTER_COUNTRY_BY_CONTINENT, GET_ALL_COUNTRIES, GET_COUNTRY, SORT_COUNTRY_BY_ASCDES, SORT_COUNTRY_BY_POPULATION, CLEAN, SET_PAGE, GET_COUNTRY_DETAIL, DELETE_ACTIVITY } from "../actions"

const initialState = {
    countries: [],
    countryFiltered: [],
    activities: [],
    currentPage: 1,
    details: {}
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
        return {
            ...state,
            countries: action.payload,
            countryFiltered: action.payload
        }
        case GET_COUNTRY:
        return {
            ...state,
            countryFiltered: action.payload
        }
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                details: action.payload
            }
        case GET_ACTIVITIES: 
        return {
            ...state,
            activities: action.payload
        }

        case ADD_ACTIVITY: 
        return {
            ...state,
            activities: [...state.activities, action.payload]
        }
        case CLEAN:
        return {
            ...state,
            details: {},
            currentPage: 1
        };
        case SET_PAGE:
        return {
            ...state,
            currentPage: action.payload,
        };
        case SORT_COUNTRY_BY_ASCDES:
        let orderCountry = [...state.countries];
        orderCountry = orderCountry.sort((a,b) => {
            if(a.name < b.name) return action.payload === ASCENDENTE ? -1 : 1;
            if(a.name > b.name) return action.payload === ASCENDENTE ? 1 : -1;
            else return 0;
        })
        return {
            ...state,
            countryFiltered: orderCountry
        }
        case SORT_COUNTRY_BY_POPULATION:
        let population = [...state.countries];
        population = population.sort((a,b) => {
            if(a.population < b.population) return action.payload === HIGHEST ? 1 : -1;
            if(a.population > b.population) return action.payload === HIGHEST ? -1 : 1;
            else return 0;
        });
        return {
            ...state,
            countryFiltered: population
        }

        case FILTER_COUNTRY_BY_ACTIVITY:
            let filter =
            action.payload === "sin filtro"
            ? state.countries
            : state.countries.filter((country) => {
                const activities = country.activities.map((a) => a.name);
                return activities.includes(action.payload);
            });

        return {
            ...state,
            countryFiltered: filter,
        };
        case FILTER_COUNTRY_BY_CONTINENT:
            let filteredCountry = [...state.countries];
            filteredCountry = filteredCountry.filter(e => e.continent.toLowerCase() === action.payload.toLowerCase())
            console.log(action.payload.toLowerCase());
        return {
            ...state,
            countryFiltered: filteredCountry
        }
        default: return state
    }
}
