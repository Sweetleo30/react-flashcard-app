import { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { useInput } from '../hooks/useInput';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// Форма добавления нового слова
function AddWordInput({ addWord, handleClick, click, setClick }) {
    const word = useInput('', { isEmpty: true, minLength: 2 });
    const transcription = useInput('', { isEmpty: true, minLength: 3 });
    const translation = useInput('', { isEmpty: true, minLength: 2 });
    // const tags = useInput('');
    const valid = (word.inputValid && transcription.inputValid && translation.inputValid)

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

export default inject(({ wordsStore }) => {
    const { words, addWord, loadData } = wordsStore;

    useEffect(() => {
        loadData();
    }, []);

    return {
        words, addWord, loadData
    };

})(observer(AddWordInput));