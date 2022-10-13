import { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';

// Кастомный хук валидация
const useValidation = (value, validations) => {

    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [inputValid, setInputValid] = useState(false);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)

                    break;

                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)

                    break;
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || minLengthError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }

    }, [isEmpty, minLengthError])

    return {
        isEmpty,
        minLengthError,
        inputValid
    }

}

// Кастомный хук инпуты
const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validations);

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

export function TableRow(props) {

    const word = useInput(props.word, { isEmpty: true, minLength: 2 });
    const transcription = useInput(props.transcription, { isEmpty: true, minLength: 3 });
    const translation = useInput(props.translation, { isEmpty: true, minLength: 2 });
    const [isEdited, setEdited] = useState(props.isEdited);

    const handleChange = () => {
        setEdited(!isEdited);
    }

    return (
        <tr>
            <td scope="row">{props.id}</td>
            <td>
                {(word.isDirty && word.isEmpty) && <div className="has-error">Поле не может быть пустым</div> || (word.isDirty && word.minLengthError) && <div className="has-error">Некорректная длина</div>}
                {isEdited ? <input onChange={e => word.onChange(e)} onBlur={e => word.onBlur(e)} value={word.value} type="text" className={"form-control " + (!word.inputValid ? "form-control_error" : "")} name="word" /> : word.value}
            </td>
            <td>
                {(transcription.isDirty && transcription.isEmpty) && <div className="has-error">Поле не может быть пустым</div> || (transcription.isDirty && transcription.minLengthError) && <div className="has-error">Некорректная длина</div>}
                {isEdited ? <input onChange={e => transcription.onChange(e)} onBlur={e => transcription.onBlur(e)} value={transcription.value} type="text" className={"form-control " + (!transcription.inputValid ? "form-control_error" : "")} name="transcription" /> : transcription.value}
            </td>
            <td>
                {(translation.isDirty && translation.isEmpty) && <div className="has-error">Поле не может быть пустым</div> || (translation.isDirty && translation.minLengthError) && <div className="has-error">Некорректная длина</div>}
                {isEdited ? <input onChange={e => translation.onChange(e)} onBlur={e => translation.onBlur(e)} value={translation.value} type="text" className={"form-control " + (!translation.inputValid ? "form-control_error" : "")} name="translation" /> : translation.value}
            </td>
            <td>
                {isEdited ? <button disabled={!word.inputValid || !transcription.inputValid || !translation.inputValid} className="bt-save" onClick={handleChange}>SAVE</button> :
                    <button className="bt-edit" onClick={handleChange}><FontAwesomeIcon icon={faEdit} /></button>}
                {isEdited ? <button className="bt-close" onClick={handleChange}><FontAwesomeIcon icon={faXmark} /></button> :
                    <button className="bt-delete"><FontAwesomeIcon icon={faTrashCan} /></button>}
            </td>
        </tr>
    );
}