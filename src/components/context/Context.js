import React, { useState, useEffect } from 'react';

const WordContext = React.createContext();

function WordContextProvider(props) {

    const [state, setState] = useState({
        data: [],
        isLoading: false,
        error: null,
    });

    useEffect(() => {
        fetch(`/api/words`)
            .then(response => {
                if (response.ok) { //Проверяем что код ответа 200
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then((response) => {
                setState({
                    data: response,
                    isLoading: false,
                })
            })
            .catch(error => setState({ error, isLoading: false }));
    }, [])


    // function toggleTheme() {
    //     setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    // }

    return (
        <WordContext.Provider value={{ state, setState }}>
            {props.children}
        </WordContext.Provider>
    );
}

export { WordContextProvider, WordContext };



// useEffect(() => {
//     fetch('https://localhost:5001/api/values', {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify({ id: '123', name : 'qweq' }) // body data type must match "Content-Type" header
//       })
//       .then(response => response.json())
//       .then(data =>
//         {
//           setData(data.name);
//           setId(data.id)
//         })
//   },[]);