import {defineStore} from 'pinia';


/** Config Store */
export default defineStore('config', {
    // Default Config State
    state: () => ({
        _themeDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
    }),
    // Getters
    getters: {
        themeDark: () => this._themeDark,
    },
    // Actions
    actions: {
        toggleTheme() {
            this._themeDark = !this._themeDark;
        },
    },
// Data persistence destination
//     persist: {
//         key: import.meta.env.VITE_APP_WEBSTORAGE_NAMESPACE || 'vuetify',
//         storage: window.sessionStorage,
//     },
});
