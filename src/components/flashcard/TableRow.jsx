import { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function TableRow(props) {

    const [isEdited, setEdited] = useState(props.isEdited);

    const handleChange = () => {
        setEdited(!isEdited);
    }

    return (
        <tr>
            <td scope="row">{props.id}</td>
            <td>
                {isEdited ? <input type="text" className="form-control" name="word" /> : props.word}
            </td>
            <td>
                {isEdited ? <input type="text" className="form-control" name="transcription" /> : props.transcription}
            </td>
            <td>
                {isEdited ? <input type="text" className="form-control" name="translation" /> : props.translation}
            </td>
            <td>
                {isEdited ? <button className="bt-save" onClick={handleChange}>SAVE</button> :
                    <button className="bt-edit" onClick={handleChange}><FontAwesomeIcon icon={faEdit} /></button>}
                {isEdited ? <button className="bt-close" onClick={handleChange}><FontAwesomeIcon icon={faXmark} /></button> :
                    <button className="bt-delete"><FontAwesomeIcon icon={faTrashCan} /></button>}
            </td>
        </tr>
    );
}