import React, { useState, useEffect } from 'react';

const WordContext = React.createContext();

function WordContextProvider(props) {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(null);

    useEffect(() => {
        getWords()
    }, [])

    const getWords = () => {
        setLoading(true);
        fetch(`/api/words`)
            .then(response => {
                if (response.ok) { //Проверяем что код ответа 200
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then((response) => {
                setData(response);
                setLoading(false);
            })

            .catch((error => setError(error)))
            .finally(() => {
                setLoading(false);
            })
    }

    // const addWord = async () => {
    //     // const id = uuidv4();
    //     const word = word.value;
    //     const transcription = transcription.value;
    //     const translation = translation.value;
    //     const tags = tags.value;

    //     try {
    //         const response = await fetch(`http://itgirlschool.justmakeit.ru/api/words/add`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 // id: id,
    //                 english: word,
    //                 transcription: transcription,
    //                 russian: translation,
    //                 tags: tags
    //             })
    //         });
    //         if (response.ok) {
    //             const newData = await response.json();
    //             setData(newData);
    //         }
    //     } catch (error) {
    //         alert(`Ошибка соединения с сервером. ${error}`);
    //     } finally {
    //         word.setValue('');
    //         transcription.setValue('');
    //         translation.setValue('');
    //         tags.setValue('');
    //     }
    // }

    // const addWord = (word) => {
    //     fetch(`/api/words/add`,
    //         {
    //             method: 'POST',
    //             body: JSON.stringify(word)
    //         })
    // }




    return (
        <WordContext.Provider value={{ data, setData, isLoading, setLoading, isError, setError, getWords }}>
            {props.children}
        </WordContext.Provider>
    );
}

export { WordContextProvider, WordContext };



