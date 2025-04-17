import { create } from 'zustand';

const useCanvasStore = create((set) => ({
    activeText: '',
    setActiveText: (text) => set({ activeText: text }),

    transscript: '',
    setTranscript: (text) => set({ transscript: text }),
    onResetTranscript: () => set({ transscript: '' }),

    resetTranscript: null,
    setResetTranscript: (fn) => set({ resetTranscript: fn }),

    replace: false,
    setReplace: (value) => set({ replace: value }),


}));

export default useCanvasStore;