import { useState, useEffect, useRef } from 'react';
import './Flashcard.scss';

export function Flashcard(props) {

    const [isChecked, setChecked] = useState(false);

    const handleShow = () => {
        setChecked(!isChecked);
        props.addNumber();
    }

    const mainRef = useRef(null);
    useEffect(() => {
        mainRef.current.focus();
    }, []);

    return (
        <div className="flashcard">
            <span className="flashcard-word">{props.word}</span>
            <span className="flashcard-transcription">{props.transcription}</span>
            <button disabled={isChecked} className={isChecked ? "translation-btn" : "flashcard-btn"} ref={mainRef} onClick={handleShow}>
                {isChecked ? props.translation : "Проверить"}
            </button>
        </div >
    );
}



