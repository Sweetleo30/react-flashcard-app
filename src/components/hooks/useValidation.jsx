import { useEffect } from 'react';
import { useState } from 'react';

export function useValidation(value, validations) {
    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [inputValid, setInputValid] = useState(false);
    const [isError, setError] = useState('');

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;

                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty) {
            setError('Поле не может быть пустым')
        } else if (minLengthError) {
            setError('Некорректная длина')
        } else {
            setError('')
        }

    }, [isEmpty, minLengthError])

    useEffect(() => {
        if (isEmpty || minLengthError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }

    }, [isEmpty, minLengthError])

    return {
        isEmpty,
        minLengthError,
        inputValid,
        isError
    }
}