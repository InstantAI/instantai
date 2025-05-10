import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { Workspace, WorkspaceRole } from '@/services/workspacesService'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Workspace>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'cpuLimit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='CPU' />
    ),
    cell: ({ row }) => <div>{row.getValue('cpuLimit')}</div>,
  },
  {
    accessorKey: 'memoryLimit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Memory' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('memoryLimit')}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'gpuLimit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='GPU' />
    ),
    cell: ({ row }) => <div>{row.getValue('gpuLimit')}</div>,
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const role = row.original.role;
      if (role === WorkspaceRole.ADMIN || role === WorkspaceRole.EDIT) {
        return <DataTableRowActions row={row} />;
      }
      return null;
    },
  },
]
