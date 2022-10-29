import { TableRow } from '../flashcard/TableRow';
import { useState } from 'react';
import { LoadingIndicator } from '../loadingIndicator/LoadingIndicator';
import { Error } from '../error/Error';
import { observer, inject } from 'mobx-react';
import './FlashcardTable.scss';

import { useInput } from '../hooks/useInput';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';

function FlashcardTable({ words, addWord, isLoaded, loadData, isLoading, serverError, deleteWord, updateWord }) {

    const word = useInput('', { isEmpty: true, minLength: 2 });
    const transcription = useInput('', { isEmpty: true, minLength: 3 });
    const translation = useInput('', { isEmpty: true, minLength: 2 });
    // const tags = useInput('');
    const valid = (word.inputValid && transcription.inputValid && translation.inputValid)
    const [click, setClick] = useState(false);

    // Добавление нового слова в таблицу
    const addWordList = () => {
        const newWord = {
            english: word.value,
            transcription: transcription.value,
            russian: translation.value,
        }
        setClick(!click);
        addWord(newWord);
        word.value = '';
        transcription.value = '';
        translation.value = '';
    }

    // Кнопка добавления слова
    const handleClick = () => {
        setClick(!click);
    }

    if (isLoading) {
        return (
            <LoadingIndicator />
        )
    }

    if (serverError) {
        return (
            <Error />
        )
    }

    return (
        <div className="flashcard-table__container">
            <table className="table">
                <thead>
                    <tr>
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
                                isSelected={word.isSelected}
                                deleteWord={deleteWord}
                                updateWord={updateWord}>
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
};

export default inject(({ wordsStore }) => {
    const { words, addWord, isLoaded, isLoading, serverError, loadData, deleteWord, updateWord } = wordsStore;

    useEffect(() => {
        loadData();
    }, []);

    return {
        words, addWord, deleteWord, updateWord, isLoading, serverError
    };

})(observer(FlashcardTable));
