import { useState } from 'react';
import './Flashcard.scss';

export function Flashcard(props) {

    const [isChecked, setChecked] = useState(false);

    const handleShow = () => {
        setChecked(!isChecked);
    }

    return (
        <div className="flashcard">
            <span className="flashcard-word">{props.word}</span>
            <span className="flashcard-transcription">{props.transcription}</span>
            <button className={isChecked ? "translation-btn" : "flashcard-btn"} onClick={handleShow}>
                {isChecked ? props.translation : "Проверить"}
            </button>
        </div >
    );
}
