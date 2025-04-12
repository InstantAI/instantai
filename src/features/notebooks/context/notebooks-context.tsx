import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Notebook } from '@/services/notebooksService'

type NotebooksDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface NotebooksContextType {
  open: NotebooksDialogType | null
  setOpen: (str: NotebooksDialogType | null) => void
  currentRow: Notebook | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Notebook | null>>
}

const NotebooksContext = React.createContext<NotebooksContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function NotebooksProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<NotebooksDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Notebook | null>(null)

  return (
    <NotebooksContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </NotebooksContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotebooks = () => {
  const notebooksContext = React.useContext(NotebooksContext)

  if (!notebooksContext) {
    throw new Error('useNotebooks has to be used within <NotebooksContext>')
  }

  return notebooksContext
}
