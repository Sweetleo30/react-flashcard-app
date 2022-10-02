import './App.scss';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";


import Header from '../header/Header';
import Footer from '../footer/Footer';
import { NoMatch } from '../noMatch/NoMatch';
import { FlashcardTable } from '../flashcard/FlashcardTable';
import { FlashcardContent } from '../flashcard/FlashcardContent';
// import words from '../../data/data.json';

function App() {
    return (
        <Router>
            <div className="wrapper">
                <Header></Header>
                <main className="main">
                    <Routes>
                        <Route exact path="/game" element={<FlashcardContent />}></Route>
                        <Route exact path="/" element={<FlashcardTable></FlashcardTable>}></Route>
                        <Route path="*" element={<NoMatch />}></Route>
                    </Routes>
                </main>
                <Footer></Footer>
            </div >
        </Router>

    );
}

export default App;
