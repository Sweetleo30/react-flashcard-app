
import { makeAutoObservable, runInaction } from "mobx";

export default class Words {
    words = [];
    isLoaded = false;
    isLoading = false;
    serverError = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Загрузка слов с сервера
    loadData = async () => {
        if (this.isLoaded && this.isLoading) {
            return;
        }

        this.isLoading = true;
        this.serverError = false;

        fetch(`/api/words`)
            .then(response => response.json())
            .then(response => {
                this.words = response;
                this.isLoading = false;
            })
            .catch(error => {
                console.log(error);
                this.isLoading = false;
                this.serverError = true;
            });
    };

    // Добавление слова
    addWord = (newWord) => {
        this.isLoading = true;
        this.serverError = false;

        fetch(`/api/words/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(newWord),
        })
            .then(response => response.json())
            .then(response => {
                this.words.push(response);
                this.isLoading = false;
            })
            .catch(error => {
                console.log(error);
                this.serverError = true;
                this.isLoading = false;
            });
    };

    // Удаление слова
    deleteWord = (id) => {
        this.serverError = false;

        fetch(`/api/words/${id}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then(response => response.json())
            .then(word => {
                this.words = this.words.filter(item => item.id !== id);
                this.isLoading = false;
            })
            .catch(error => {
                console.log(error);
                this.serverError = true;
                this.isLoading = false;
            });
    };

    // Обновление слова
    updateWord = (id, word) => {
        this.isLoading = true;

        fetch(`/api/words/${id}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(word),
        })
            .then(response => response.json())
            .then(() => {
                this.words = this.words.map(item => item.id === id ? word : item);
                this.isLoading = false;
            })
            .catch(error => {
                console.log(error);
                this.serverError = true;
                this.isLoading = false;
            });
    };
}
