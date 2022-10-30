import { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import AddWordInput from './AddWordInput';
import { TableRow } from '../table/TableRow';
import { LoadingIndicator } from '../loadingIndicator/LoadingIndicator';
import { Error } from '../error/Error';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './TableWords.scss';

function TableWords({ words, isLoading, serverError, deleteWord, updateWord }) {
    const [click, setClick] = useState(false);

    // Кнопка добавления слова
    const handleClick = () => {
        setClick(!click);
    }

    if (isLoading) {
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
        <div className="flashcard-table__container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Слово</th>
                        <th>Транскрипция</th>
                        <th>Перевод</th>
                        <th>Управление
                            <button
                                className="bt-add"
                                style={{ display: !click ? 'inline-block' : 'none' }}
                                onClick={handleClick}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {click ? <AddWordInput
                        handleClick={handleClick}
                        click={click}
                        setClick={setClick}
                    /> : ""}
                    {
                        words.map((word) =>
                            <TableRow
                                key={word.id}
                                id={word.id}
                                word={word.english}
                                transcription={word.transcription}
                                translation={word.russian}
                                isSelected={word.isSelected}
                                deleteWord={deleteWord}
                                updateWord={updateWord}>
                            </TableRow>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default inject(({ wordsStore }) => {
    const { words, addWord, loadData, deleteWord, updateWord } = wordsStore;

    useEffect(() => {
        loadData();
    }, []);

    return {
        words, addWord, deleteWord, updateWord
    };

})(observer(TableWords));
