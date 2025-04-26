'use client'

import { useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { deleteWorkspace, Workspace } from '@/services/workspacesService'

interface Props {
  refresh: () => void
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Workspace
}

export function WorkspacesDeleteDialog({ refresh, open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')

  const handleDelete = () => {
    if (value.trim() !== currentRow.name) return

    onOpenChange(false)
    deleteWorkspace(currentRow.name)
      .then(() => {
        refresh()
        toast({
          title: 'Workspace deleted',
          description: `Workspace ${currentRow.name} has been deleted.`,
        })
      })
      .catch((error) => {
        toast({
          title: 'Error deleting workspace',
          description: error.message,
          variant: 'destructive',
        })
      })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.name}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='mr-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete Workspace
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            This action will permanently remove the workspace with the name: {' '}
            <span className='font-bold'>
              {currentRow.name}
            </span>{' '}
            from the system. This cannot be undone.
          </p>

          <Label className='my-2'>
            Name:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter name to confirm deletion.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be carefull, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
