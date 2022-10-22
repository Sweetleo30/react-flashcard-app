// import words from '../../data/data.json';
import { TableRow } from '../flashcard/TableRow';
import WordContext from '../context/Context';
// import { useContext } from 'react';

import { useContext } from 'react';

import './FlashcardTable.scss';

export function FlashcardTable() {

    const { state, setState } = useContext(WordContext);
    const words = state;

    return (

        <div className="flashcard-table__container">
            <table className="table">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Слово</th>
                        <th>Транскрипция</th>
                        <th>Перевод</th>
                        <th>Кнопки</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        words.map((word) =>
                            <TableRow
                                key={word.id}
                                id={word.id}
                                word={word.english}
                                transcription={word.transcription}
                                translation={word.russian}
                                isSelected={word.isSelected}>
                            </TableRow>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}





