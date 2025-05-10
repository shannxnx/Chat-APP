import { create } from "zustand";


export const useResponseStore = create((set, get) => ({
    inChat : false,

    setInChat : () => {
        set({inChat : true});
    }
}))