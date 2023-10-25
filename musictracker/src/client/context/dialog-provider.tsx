import { PropsWithChildren, useState } from 'react'
import {
  DialogContext,
  DialogState,
  Dialogs,
  defaultDialogState,
} from './dialog-context'
import CreatePlaylistDialog from '@/components/dialogs/create-playlist-dialog'

export const DialogProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [dialogs, setDialogs] =
    useState<Record<Dialogs, DialogState>>(defaultDialogState)
  const isDialogOpen = (dialog: Dialogs): boolean => dialogs[dialog].open
  const openDialog = (dialog: Dialogs, playlistId?: string) =>
    setDialogs((dialogs) => ({
      ...dialogs,
      [dialog]: { open: true, playlistId },
    }))
  const closeDialog = (dialog: Dialogs) =>
    setDialogs((dialogs) => ({
      ...dialogs,
      [dialog]: { ...dialogs[dialog], open: false },
    }))

  return (
    <>
      <DialogContext.Provider value={{ openDialog, closeDialog, isDialogOpen }}>
        {children}
      </DialogContext.Provider>
      <CreatePlaylistDialog
        onOpenChange={() => closeDialog(Dialogs.CreatePlaylistDialog)}
        open={isDialogOpen(Dialogs.CreatePlaylistDialog)}
      />
    </>
  )
}
