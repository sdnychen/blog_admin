import { defineStore } from "pinia"

export const useSettingStore = defineStore("setting", {
    state: () => {
        return {
            setting: {
                enable_auth: false as boolean
            }
        }
    }
})
