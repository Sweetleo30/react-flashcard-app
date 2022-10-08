import { useState } from 'react';
import { Flashcard } from './Flashcard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import './FlashcardSlider.scss';


export function FlashcardSlider(props) {

    FlashcardSlider.defaultProps = {
        index: 0
    };

    const words = props.words;
    const [count, setCount] = useState(props.index);
    const [number, setNumber] = useState(0);

    const handlePrev = () => {
        if (count > 0) {
            setCount(count - 1)
        } else {
            setCount(words.length - 1)
        };
    }

    const handleNext = () => {
        if (count === words.length - 1) {
            setCount(0);
        } else {
            setCount(count + 1)
        };
    }

    const addNumber = () => {
        setNumber(number + 1);
    }

    return (
        <div className="flashcard-slider">
            <div className="flashcard-slider__main">
                <button className="prev-btn" onClick={handlePrev}><FontAwesomeIcon icon={faChevronLeft} /></button>
                <Flashcard
                    isEdited={false}
                    key={words[count].id}
                    word={words[count].english}
                    transcription={words[count].transcription}
                    translation={words[count].russian}
                    addNumber={addNumber}>
                </Flashcard>
                <button className="next-btn" onClick={handleNext}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
            <div className="words-counter">Изучено слов:<span>{number}</span></div>
        </div>
    );
}


