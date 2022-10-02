import { FlashcardSlider } from '../flashcard/FlashcardSlider';
import words from '../../data/data.json';

export function FlashcardContent() {

    return (
        <div className="flashcard__container">
            <FlashcardSlider
                words={words}
                index={0}>
            </FlashcardSlider>
        </div>
    );
}
