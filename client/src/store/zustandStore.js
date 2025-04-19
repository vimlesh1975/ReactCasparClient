import { create } from 'zustand';

const useCanvasStore = create((set) => ({
    activeText: '',
    setActiveText: (text) => set({ activeText: text }),

    transscript: { text: '', replace: false },
    setTranscript: ({ text, replace }) => set({ transscript: { text, replace } }),
    resetTranscript: null,
    setResetTranscript: (fn) => set({ resetTranscript: fn }),

}));

export default useCanvasStore;