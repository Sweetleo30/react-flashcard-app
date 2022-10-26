import { useState, useContext } from 'react';
import { useInput } from '../hooks/useInput';
import { WordContext } from '../context/Context';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function TableRow(props) {

    const { data, setData, getWords } = useContext(WordContext);

    const word = useInput(props.word, { isEmpty: true, minLength: 2 });
    const transcription = useInput(props.transcription, { isEmpty: true, minLength: 3 });
    const translation = useInput(props.translation, { isEmpty: true, minLength: 2 });
    const [isEdited, setEdited] = useState(props.isEdited);
    const valid = (word.inputValid && transcription.inputValid && translation.inputValid)


    const handleChange = () => {
        setEdited(!isEdited);
    }

    const handleEdit = () => {
        if (valid) {
            updateWord();
            setEdited(!isEdited);
        }
    }

    // Обновление слова
    const updateWord = async (id) => {
        const updWord = word.value;
        const updTranscription = transcription.value;
        const updTranslation = translation.value;
        const updTags = '';

        try {
            const response = await fetch(`/api/words/${props.id}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    english: updWord,
                    transcription: updTranscription,
                    russian: updTranslation,
                    tags: updTags
                })
            });
            if (response.ok) {
                let newData = [...data].map(item => {
                    if (item.id === props.id) {
                        item.english = updWord;
                        item.transcription = updTranscription;
                        item.russian = updTranslation;
                        item.tags = updTags;
                    }
                    return item;
                });
                setData(newData);
            }
        } catch (error) {
            alert(`Ошибка соединения с сервером. ${error}`);
        };
    }

    // Удаление слова
    const deleteWord = async () => {

        let isDelete = window.confirm("Удалить это слово?");
        if (isDelete) {
            try {
                const response = await fetch(`/api/words/${props.id}/delete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (response.ok) {
                    let newData = data.filter(item => item.id !== props.id);
                    setData(newData)
                };
            } catch (error) {
                alert(`Ошибка соединения с сервером. ${error}`);
            };
        }

    }

    // Отмена редактирования 
    const cancel = () => {
        getWords();
        setEdited(!isEdited);
    }

    return (
        <tr>
            <td scope="row">{props.id}</td>
            <td>
                {((word.isDirty && word.isEmpty) || (word.isDirty && word.minLengthError)) && <div className="has-error">{word.isError}</div>}
                {isEdited ? <input
                    onChange={e => word.onChange(e)}
                    onBlur={e => word.onBlur(e)}
                    value={word.value}
                    type="text"
                    className={"form-control " + (!word.inputValid ? "form-control_error" : "")}
                    name="word" /> : word.value}
            </td>
            <td>
                {((transcription.isDirty && transcription.isEmpty) || (transcription.isDirty && transcription.minLengthError)) && <div className="has-error">{transcription.isError}</div>}
                {isEdited ? <input
                    onChange={e => transcription.onChange(e)}
                    onBlur={e => transcription.onBlur(e)}
                    value={transcription.value}
                    type="text"
                    className={"form-control " + (!transcription.inputValid ? "form-control_error" : "")}
                    name="transcription" /> : transcription.value}
            </td>
            <td>
                {((translation.isDirty && translation.isEmpty) || (translation.isDirty && translation.minLengthError)) && <div className="has-error">{translation.isError}</div>}
                {isEdited ? <input
                    onChange={e => translation.onChange(e)}
                    onBlur={e => translation.onBlur(e)}
                    value={translation.value}
                    type="text"
                    className={"form-control " + (!translation.inputValid ? "form-control_error" : "")}
                    name="translation" /> : translation.value}
            </td>
            <td>
                {isEdited ? <button disabled={!valid} className="bt-save" onClick={handleEdit}>SAVE</button> :
                    <button className="bt-edit" onClick={handleChange}><FontAwesomeIcon icon={faEdit} /></button>}
                {isEdited ? <button disabled={!valid} className="bt-close" onClick={cancel}><FontAwesomeIcon icon={faXmark} /></button> :
                    <button className="bt-delete" onClick={deleteWord}><FontAwesomeIcon icon={faTrashCan} /></button>}
            </td>
        </tr>
    );
}