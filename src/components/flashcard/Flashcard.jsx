import { useState, useEffect, useRef } from 'react';
import { observer, inject } from 'mobx-react';
import './Flashcard.scss';

export function Flashcard({ key, word, transcription, translation, addNumber }) {

    const [isChecked, setChecked] = useState(false);

    const handleShow = () => {
        setChecked(!isChecked);
        addNumber();
    }

    const mainRef = useRef(null);
    useEffect(() => {
        mainRef.current.focus();
    }, []);

    return (
        <div className="flashcard">
            <span className="flashcard-word">{word}</span>
            <span className="flashcard-transcription">{transcription}</span>
            <button disabled={isChecked} className={isChecked ? "translation-btn" : "flashcard-btn"} ref={mainRef} onClick={handleShow}>
                {isChecked ? translation : "Проверить"}
            </button>
        </div >
    );
}

export default inject(({ wordsStore }) => {
    const { words, loadData } = wordsStore;

    useEffect(() => {
        loadData();
    }, []);

    return {
        words
    };

})(observer(Flashcard));



