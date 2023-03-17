import { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import Flashcard from './Flashcard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { LoadingIndicator } from '../loadingIndicator/LoadingIndicator';
import { Error } from '../error/Error';

import './FlashcardSlider.scss';

function FlashcardSlider({ words, isLoading, serverError }) {

    // FlashcardSlider.defaultProps = {
    //     index: 0
    // };

    const [count, setCount] = useState(0);
    const [number, setNumber] = useState(0);

    const handlePrev = () => {
        if (count > 0) {
            setCount(count - 1)
        } else {
            setCount(words.length - 1)
        };
    };

    const handleNext = () => {
        if (count === words.length - 1) {
            setCount(0);
        } else {
            setCount(count + 1)
        };
    };

    const addNumber = () => {
        setNumber(number + 1);
    };

    if (isLoading || !words.length) {
        return (
            <LoadingIndicator />
        )
    }

    if (serverError) {
        return (
            <Error />
        )
    }

    return (
        <div className="flashcard-slider">
            <div className="flashcard-slider__container">
                <div className="flashcard-slider__main">
                    <button className="prev-btn" onClick={handlePrev}><FontAwesomeIcon icon={faChevronLeft} /></button>
                    <Flashcard
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
        </div>
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

})(observer(FlashcardSlider));





