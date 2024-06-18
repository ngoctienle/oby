import create from 'zustand'

interface ICategorySheetProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

interface IFocusInputProps {
  isFocus: boolean
  onFocus: () => void
  outFocus: () => void
}

const useCategorySheet = create<ICategorySheetProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

const useFocusInput = create<IFocusInputProps>((set) => ({
  isFocus: false,
  onFocus: () => set({ isFocus: true }),
  outFocus: () => set({ isFocus: false })
}))

export { useCategorySheet, useFocusInput }
