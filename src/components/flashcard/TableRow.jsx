// import { useState, useContext } from 'react';
import { useState } from 'react';
import { useInput } from '../hooks/useInput';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// import WordContext from '../context/Context';

export function TableRow(props) {

    // const {state, setState } = useContext(WordContext);

    const word = useInput(props.word, { isEmpty: true, minLength: 2 });
    const transcription = useInput(props.transcription, { isEmpty: true, minLength: 3 });
    const translation = useInput(props.translation, { isEmpty: true, minLength: 2 });
    const [isEdited, setEdited] = useState(props.isEdited);
    const valid = (word.inputValid && transcription.inputValid && translation.inputValid)

    const handleChange = () => {
        setEdited(!isEdited);
    }

    const handleSave = () => {
        if (valid) {
            console.log(word.value, transcription.value, translation.value);
            setEdited(!isEdited);
        }
    }

    return (
        <tr>
            <td scope="row">{props.id}</td>
            <td>
                {((word.isDirty && word.isEmpty) || (word.isDirty && word.minLengthError)) && <div className="has-error">{word.isError}</div>}
                {isEdited ? <input onChange={e => word.onChange(e)} onBlur={e => word.onBlur(e)} value={word.value} type="text" className={"form-control " + (!word.inputValid ? "form-control_error" : "")} name="word" /> : word.value}
            </td>
            <td>
                {((transcription.isDirty && transcription.isEmpty) || (transcription.isDirty && transcription.minLengthError)) && <div className="has-error">{transcription.isError}</div>}
                {isEdited ? <input onChange={e => transcription.onChange(e)} onBlur={e => transcription.onBlur(e)} value={transcription.value} type="text" className={"form-control " + (!transcription.inputValid ? "form-control_error" : "")} name="transcription" /> : transcription.value}
            </td>
            <td>
                {((translation.isDirty && translation.isEmpty) || (translation.isDirty && translation.minLengthError)) && <div className="has-error">{translation.isError}</div>}
                {isEdited ? <input onChange={e => translation.onChange(e)} onBlur={e => translation.onBlur(e)} value={translation.value} type="text" className={"form-control " + (!translation.inputValid ? "form-control_error" : "")} name="translation" /> : translation.value}
            </td>
            <td>
                {isEdited ? <button disabled={!valid} className="bt-save" onClick={handleSave}>SAVE</button> :
                    <button className="bt-edit" onClick={handleChange}><FontAwesomeIcon icon={faEdit} /></button>}
                {isEdited ? <button disabled={!valid} className="bt-close" onClick={handleChange}><FontAwesomeIcon icon={faXmark} /></button> :
                    <button className="bt-delete"><FontAwesomeIcon icon={faTrashCan} /></button>}
            </td>
        </tr>
    );
}