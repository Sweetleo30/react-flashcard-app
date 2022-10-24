import { TableRow } from '../flashcard/TableRow';
import { WordContext } from '../context/Context';
import { useContext } from 'react';
import { LoadingIndicator } from '../loadingIndicator/LoadingIndicator';
import { Error } from '../error/Error';
// import { NoMatch } from '../noMatch/NoMatch';
import './FlashcardTable.scss';

export function FlashcardTable() {

    // data, setData, isLoading, setLoading, isError, setError

    const { data, isLoading, isError } = useContext(WordContext);
    const words = data;

    if (isLoading) {
        return (
            <LoadingIndicator />
        )
    }

    if (isError) {
        return (
            <Error />
        )
    }

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





