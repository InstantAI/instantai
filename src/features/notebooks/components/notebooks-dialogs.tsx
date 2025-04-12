import { useNotebooks } from '../context/notebooks-context'
import { NotebooksActionDialog } from './notebooks-action-dialog'
import { NotebooksDeleteDialog } from './notebooks-delete-dialog'
import { UsersInviteDialog } from './users-invite-dialog'

export function NotebooksDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useNotebooks()
  return (
    <>
      <NotebooksActionDialog
        key='notebook-add'
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
          <NotebooksActionDialog
            key={`notebook-edit-${currentRow.metadata.name}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <NotebooksDeleteDialog
            key={`notebook-delete-${currentRow.metadata.name}`}
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
