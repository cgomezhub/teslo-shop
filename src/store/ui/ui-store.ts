import { create } from 'zustand'


interface State {
    isSideMenuOpen: boolean;
    OpenSideMenu: () => void;
    CloseSideMenu: () => void;



}

export const useUIStore = create<State>()((set) => ({
    isSideMenuOpen: false,
    OpenSideMenu: () => set({ isSideMenuOpen: true }),
    CloseSideMenu: () => set({ isSideMenuOpen: false }),
  
}))