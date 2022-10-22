
import React from "react";
const WordContext = React.createContext();

export default WordContext

// import React from "react";
// const WordContext = React.createContext();

// import words from '../../data/data.json';

// function ThemeContextProvider(props) {
//     const [theme, setTheme] = useState("dark");

//     function toggleTheme() {
//         setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
//     }

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {props.children}
//         </ThemeContext.Provider>

//     );
// }

// export { WordContextProvider, WordContext };

