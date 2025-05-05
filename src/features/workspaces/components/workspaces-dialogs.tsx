import { useWorkspaces } from '../context/workspaces-context'
import { WorkspacesActionDialog } from './workspaces-action-dialog'
import { WorkspacesDeleteDialog } from './workspaces-delete-dialog'
import { UsersInviteDialog } from './users-invite-dialog'

export function WorkspacesDialogs() {
  const { refresh, open, setOpen, currentRow, setCurrentRow } = useWorkspaces()

  return (
    <>
      <WorkspacesActionDialog
        key='workspace-add'
        refresh={refresh}
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      <UsersInviteDialog
        key='user-invite'
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      />

      {currentRow && (
        <>

          <WorkspacesActionDialog
            key={`workspace-edit-${currentRow.name}`}
            refresh={refresh}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <WorkspacesDeleteDialog
            key={`workspace-delete-${currentRow.name}`}
            refresh={refresh}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
