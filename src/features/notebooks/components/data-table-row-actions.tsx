import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { getProjectEnvVariables } from "@/shared/projectEnvVariables";

const { envVariables } = getProjectEnvVariables()

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNotebooks } from '../context/notebooks-context'
import { Notebook, startNotebook, stopNotebook } from '@/services/notebooksService'

interface DataTableRowActionsProps {
  row: Row<Notebook>
  status: string
  onRefresh: () => void
  canEdit: boolean
}

export function DataTableRowActions({ row, status, onRefresh, canEdit }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useNotebooks()
  const handleStart = async () => {
    try {
      await startNotebook(row.original.metadata.namespace, row.original.metadata.name)
      onRefresh()
    } catch (error) {
      console.error('启动Notebook失败:', error)
    }
  }

  const handleStop = async () => {
    try {
      await stopNotebook(row.original.metadata.namespace, row.original.metadata.name)
      onRefresh()
    } catch (error) {
      console.error('停止Notebook失败:', error)
    }
  }

  if (status === 'pending') {
    return null;
  }
  return (
    <div className="flex items-center gap-2">
      {status === 'running' && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3"
            asChild // 使用asChild将按钮转为链接
          >
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3"
              asChild
            >
              <a href={`${envVariables.VITE_BACKEND_URL}/notebooks/${row.original.metadata.namespace}/${row.original.metadata.name}`} target='_blank'>
                Open
              </a>
            </Button>
          </Button>
          {canEdit && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-orange-600 hover:text-orange-700"
              onClick={handleStop}
            >
              Stop
            </Button>)}
        </>
      )}
      {status === 'stopped' && canEdit && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-green-600 hover:text-green-700"
          onClick={handleStart}
        >
          Start
        </Button>
      )}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        {canEdit && (
          <DropdownMenuContent align='end' className='w-[160px]'>
            <DropdownMenuItem
              onClick={() => {
                setCurrentRow(row.original)
                setOpen('edit')
              }}
            >
              Edit
              <DropdownMenuShortcut>
                <IconEdit size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setCurrentRow(row.original)
                setOpen('delete')
              }}
              className='!text-red-500'
            >
              Delete
              <DropdownMenuShortcut>
                <IconTrash size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>)}
      </DropdownMenu>
    </div>
  )
}
