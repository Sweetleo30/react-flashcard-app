import { TableRow } from '../flashcard/TableRow';
import { WordContext } from '../context/Context';
import { useContext, useState } from 'react';
import { LoadingIndicator } from '../loadingIndicator/LoadingIndicator';
import { Error } from '../error/Error';
import './FlashcardTable.scss';

import { useInput } from '../hooks/useInput';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function FlashcardTable() {

    const { data, setData, isLoading, isError, getWords } = useContext(WordContext);
    const words = data;
    const word = useInput('', { isEmpty: true, minLength: 2 });
    const transcription = useInput('', { isEmpty: true, minLength: 3 });
    const translation = useInput('', { isEmpty: true, minLength: 2 });
    const tags = useInput('');
    const valid = (word.inputValid && transcription.inputValid && translation.inputValid)
    const [click, setClick] = useState(false);

    // Добавление нового слова в таблицу
    const addWordList = () => {
        setClick(!click);
        addWord();
    }

    // Кнопка добавления слова
    const handleClick = () => {
        setClick(!click);
    }

    // Добавление слова
    const addWord = async () => {
        // setLoading(true);
        const newWord = word.value;
        const newTranscription = transcription.value;
        const newTranslation = translation.value;
        const newTags = 'цвет';

        try {
            const response = await fetch(`/api/words/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    english: newWord,
                    transcription: newTranscription,
                    russian: newTranslation,
                    tags: newTags,
                })
            });
            if (response.ok) {
                const newData = await response.json();
                setData(newData);
                getWords();
            }
        } catch (error) {
            alert(`Ошибка соединения с сервером. ${error}`);
        } finally {
            word.setValue('');
            transcription.setValue('');
            translation.setValue('');
            tags.setValue('');
            // setLoading(false);
        }
    }

    if (isLoading) {
        return (
            <LoadingIndicator />
        )
    }

    if (isError) {
        return (
            <Error />
        )
    }

    return (
        <div className="flashcard-table__container">
            <table className="table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Слово</th>
                        <th>Транскрипция</th>
                        <th>Перевод</th>
                        <th>Добавить слово
                            <button
                                className="bt-add"
                                style={{ display: !click ? 'inline-block' : 'none' }}
                                onClick={handleClick}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {click ? <AddWordInput /> : ""}
                    {
                        words.map((word) =>
                            <TableRow
                                key={word.id}
                                id={word.id}
                                word={word.english}
                                transcription={word.transcription}
                                translation={word.russian}
                                isSelected={word.isSelected}>
                            </TableRow>
                        )
                    }
                </tbody>
            </table>
        </div>
    );

    // Форма добавления нового слова
    function AddWordInput() {
        return (
            <tr>
                <td scope="row" name="id"></td>
                <td>
                    {((word.isDirty && word.isEmpty) || (word.isDirty && word.minLengthError)) && <div className="has-error">{word.isError}</div>}
                    <input
                        onChange={e => word.onChange(e)}
                        onBlur={e => word.onBlur(e)}
                        value={word.value}
                        type="text"
                        className={"form-control " + (!word.inputValid ? "form-control_error" : "")}
                        name="word" />
                </td>
                <td>
                    {((transcription.isDirty && transcription.isEmpty) || (transcription.isDirty && transcription.minLengthError)) && <div className="has-error">{transcription.isError}</div>}
                    <input
                        onChange={e => transcription.onChange(e)}
                        onBlur={e => transcription.onBlur(e)}
                        value={transcription.value}
                        type="text"
                        className={"form-control " + (!transcription.inputValid ? "form-control_error" : "")}
                        name="transcription" />
                </td>
                <td>
                    {((translation.isDirty && translation.isEmpty) || (translation.isDirty && translation.minLengthError)) && <div className="has-error">{translation.isError}</div>}
                    <input
                        onChange={e => translation.onChange(e)}
                        onBlur={e => translation.onBlur(e)}
                        value={translation.value} type="text"
                        className={"form-control " + (!translation.inputValid ? "form-control_error" : "")}
                        name="translation" />
                </td>
                <td>
                    <button disabled={!valid} className="bt-save" onClick={addWordList}>SAVE</button>
                    <button className="bt-close" onClick={handleClick}><FontAwesomeIcon icon={faXmark} /></button>
                </td>
            </tr>
        )

    }
}




