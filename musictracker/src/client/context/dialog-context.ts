import { createContext, useContext } from 'react'

export enum Dialogs {
  CreatePlaylistDialog,
  EditPlaylistDialog,
}
export interface DialogState {
  open: boolean
  id?: number
}

export const defaultDialogState: Record<Dialogs, DialogState> = {
  [Dialogs.CreatePlaylistDialog]: { open: false },
  [Dialogs.EditPlaylistDialog]: { open: false },
}
export const DialogContext = createContext<{
  openDialog: (dialog: Dialogs, playlistId?: number) => void
  closeDialog: (dialog: Dialogs) => void
  isDialogOpen: (dialog: Dialogs) => boolean
}>({
  openDialog: () => undefined,
  closeDialog: () => undefined,
  isDialogOpen: () => false,
})

export const useDialogContext = () => useContext(DialogContext)
