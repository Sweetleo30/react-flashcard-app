
import { makeAutoObservable, runInAction } from "mobx";

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

        const result = await fetch(`/api/words`)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
                this.isLoading = false;
                this.serverError = true;
            });
        runInAction(() => {
            this.words = result;
            this.isLoading = false;
        })
    };

    // Добавление слова
    addWord = async (newWord) => {
        this.isLoading = true;
        this.serverError = false;

        const result = await fetch(`/api/words/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(newWord),
        })
            .then(response => response.json())
            .catch((error) => {
                console.log(error);
                this.serverError = true;
                this.isLoading = false;
            });

        runInAction(() => {
            this.words.push(result);
            this.isLoading = false;
        })
    };

    // Удаление слова
    deleteWord = async (id) => {
        this.isLoading = true;
        this.serverError = false;

        await fetch(`/api/words/${id}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then(response => response.json())
            .catch(error => {
                console.log(error);
                this.serverError = true;
                this.isLoading = false;
            });

        runInAction(() => {
            this.words = this.words.filter(item => item.id !== id);
            this.isLoading = false;
        })
    };

    // Обновление слова
    updateWord = async (id, word) => {
        this.isLoading = true;
        this.serverError = false;

        await fetch(`/api/words/${id}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(word),
        })
            .then(response => response.json())
            .catch(error => {
                console.log(error);
                this.serverError = true;
                this.isLoading = false;
            });

        runInAction(() => {
            this.words = this.words.map(item => item.id === id ? word : item);
            this.isLoading = false;
        })
    };
}
