import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        _title: '',
    }),
    getters: {
        title: (state) => state._title,
    },
    actions: {
        setTitle(title) {
            this._title = title
            document.title = title
        }
    }
})
