import React, { useEffect, useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { getWorkspaces, Workspace } from '@/services/workspacesService'

type WorkspacesDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface WorkspacesContextType {
  workspaces: Workspace[]
  refresh: () => Promise<void>;
  open: WorkspacesDialogType | null
  setOpen: (str: WorkspacesDialogType | null) => void
  currentRow: Workspace | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Workspace | null>>
}

const WorkspacesContext = React.createContext<WorkspacesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function WorkspacesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<WorkspacesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Workspace | null>(null)
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  useEffect(() => {
    getWorkspaces().then(setWorkspaces);
  }, [workspaces.length]);
  
  const refresh = async () => {
    getWorkspaces().then(setWorkspaces);
  };
  
  return (
    <WorkspacesContext value={{ workspaces, refresh, open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </WorkspacesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWorkspaces = () => {
  const workspacesContext = React.useContext(WorkspacesContext)

  if (!workspacesContext) {
    throw new Error('useWorkspaces has to be used within <WorkspacesContext>')
  }

  return workspacesContext
}
