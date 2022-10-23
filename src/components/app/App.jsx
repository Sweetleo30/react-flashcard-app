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
import { FlashcardSlider } from '../flashcard/FlashcardSlider';

// import WordContext from '../context/Context';


function App() {
    return (
        <Router>
            <div className="wrapper">
                <Header />
                <main className="main">
                    <Routes>
                        <Route path="/game" element={<FlashcardSlider />}></Route>
                        <Route path="/" element={<FlashcardTable/>}></Route>
                        <Route path="*" element={<NoMatch />}></Route>
                    </Routes>
                </main>
                <Footer />
            </div >
        </Router>

    );
}

export default App;


