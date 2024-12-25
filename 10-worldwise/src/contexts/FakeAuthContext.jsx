import { createContext, useContext, useReducer } from "react";

// Create the AuthContext to manage authentication state
const AuthContext = createContext();

// Define the initial state for the authentication context
const initialState = {
  user: null, // Initially, no user is logged in
  isAuthenticated: false, // Authentication status is false by default
};

// Reducer function to handle authentication state transitions
function reducer(state, action) {
  switch (action.type) {
    case "login":
      // Update state with user details and set authentication to true
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      // Clear user details and set authentication to false
      return { ...state, user: null, isAuthenticated: false };

    default:
      // Throw an error for unknown actions
      throw new Error("Unknown Action");
  }
}

// Fake user data for demonstration purposes
const FAKE_USER = {
  name: "Bhavya", // Name of the user
  email: "bhavya@example.com", // User's email
  password: "qwerty", // User's password
  avatar: "https://i.pravatar.cc/100?u=zz", // User's avatar image URL
};

// AuthProvider component to provide authentication context to children components
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Function to handle user login
  function login(email, password) {
    // Check credentials against the fake user data
    if (FAKE_USER.email === email && FAKE_USER.password === password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  // Function to handle user logout
  function logout() {
    dispatch({ type: "logout" });
  }

  // Provide the authentication context values to children components
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to consume the AuthContext
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    // Ensure the hook is used within the AuthProvider
    throw new Error("Auth context was used outside AuthProvider");

  return context;
}

// Export the AuthProvider and useAuth hook for use in other components
export { AuthProvider, useAuth };
