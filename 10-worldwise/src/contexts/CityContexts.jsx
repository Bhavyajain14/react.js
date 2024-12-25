import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

// Define the base URL for API calls
const BASE_URL = "http://localhost:9000";

// Create a context for city-related state and actions
const CityContext = createContext();

// Initial state for the reducer
const initialState = {
  cities: [], // List of cities
  isLoading: false, // Loading state
  currentCity: {}, // Currently selected city
  error: "", // Error message
};

// Reducer function to handle state updates
function reducer(state, action) {
  switch (action.type) {
    case "loading": // When loading state is set
      return { ...state, isLoading: true };

    case "cities/loaded": // When cities are successfully loaded
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded": // When a single city is successfully loaded
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created": // When a new city is successfully created
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted": // When a city is successfully deleted
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected": // When an error occurs
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown Action Type");
  }
}

// Provider component for managing city-related state and actions
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Fetches all cities on component mount
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: `There is an error in fetching data`,
        });
      }
    }
    fetchCities();
  }, []);

  // Fetch a single city by ID
  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: `There is an error in loading city`,
        });
      }
    },
    [currentCity.id]
  );

  // Get country flag based on country code
  function getFlag(flag) {
    if (flag === undefined) return;
    let countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");

    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  }

  // Create a new city
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: `There is an error in creating city`,
      });
    }
  }

  // Delete a city by ID
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: `There is an error in deleting city`,
      });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        getFlag,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

// Custom hook for accessing city-related state and actions
function useCities() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("City Context is used outside of City provider");
  return context;
}

export { CitiesProvider, useCities };
