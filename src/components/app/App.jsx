import './App.scss';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import { FlashcardTable } from '../flashcard/FlashcardTable';
import { FlashcardContent } from '../flashcard/FlashcardContent';
// import words from '../../data/data.json';

// import { Counter } from '../flashcard/test';
import Counter from '../flashcard/test';

function App() {
    return (
        <div className="wrapper">
            <Header></Header>
            <div className="main">
                <FlashcardContent></FlashcardContent>
                <FlashcardTable></FlashcardTable>
            </div>
            <Footer></Footer>
            <Counter></Counter>
        </div >
    );
}

export default App;
