import { useState } from 'react';
import { useInput } from '../hooks/useInput';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function TableRow(props) {
    const word = useInput(props.word, { isEmpty: true, minLength: 2 });
    const transcription = useInput(props.transcription, { isEmpty: true, minLength: 3 });
    const translation = useInput(props.translation, { isEmpty: true, minLength: 2 });
    const [isEdited, setEdited] = useState(props.isEdited);
    const valid = (word.inputValid && transcription.inputValid && translation.inputValid)

    const handleChange = () => {
        setEdited(!isEdited);
    }

    // Редактирование слова
    const handleEdit = () => {
        const updWord = {
            english: word.value,
            transcription: transcription.value,
            russian: translation.value,
            tags: '',
        }
        if (valid) {
            props.updateWord(props.id, updWord);
            setEdited(!isEdited);
        }
    }

    // Удаление слова
    const handleDeleteClick = () => {
        props.deleteWord(props.id);
    }

    return (
        <tr>
            <td>
                {((word.isDirty && word.isEmpty) || (word.isDirty && word.minLengthError)) && <div className="has-error">{word.isError}</div>}
                {isEdited ? <input
                    onChange={e => word.onChange(e)}
                    onBlur={e => word.onBlur(e)}
                    value={word.value}
                    type="text"
                    className={"form-control " + (!word.inputValid ? "form-control_error" : "")}
                    name="word" /> : props.word}
            </td>
            <td>
                {((transcription.isDirty && transcription.isEmpty) || (transcription.isDirty && transcription.minLengthError)) && <div className="has-error">{transcription.isError}</div>}
                {isEdited ? <input
                    onChange={e => transcription.onChange(e)}
                    onBlur={e => transcription.onBlur(e)}
                    value={transcription.value}
                    type="text"
                    className={"form-control " + (!transcription.inputValid ? "form-control_error" : "")}
                    name="transcription" /> : props.transcription}
            </td>
            <td>
                {((translation.isDirty && translation.isEmpty) || (translation.isDirty && translation.minLengthError)) && <div className="has-error">{translation.isError}</div>}
                {isEdited ? <input
                    onChange={e => translation.onChange(e)}
                    onBlur={e => translation.onBlur(e)}
                    value={translation.value}
                    type="text"
                    className={"form-control " + (!translation.inputValid ? "form-control_error" : "")}
                    name="translation" /> : props.translation}
            </td>
            <td>
                {isEdited ? <button disabled={!valid} className="bt-save" onClick={handleEdit}>SAVE</button> :
                    <button className="bt-edit" onClick={handleChange}><FontAwesomeIcon icon={faEdit} /></button>}
                {isEdited ? <button className="bt-close" onClick={handleChange}><FontAwesomeIcon icon={faXmark} /></button> :
                    <button className="bt-delete" onClick={handleDeleteClick}><FontAwesomeIcon icon={faTrashCan} /></button>}
            </td>
        </tr>
    );
}
