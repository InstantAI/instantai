import { ColumnDef } from '@tanstack/react-table'
import LongText from '@/components/long-text'
import { cn } from '@/lib/utils'
import { DataTableColumnHeader } from './data-table-column-header'
import { Notebook } from '@/services/notebooksService'
import { Badge } from '@/components/ui/badge'
import { DataTableRowActions } from './data-table-row-actions'

const callTypes = new Map<string, string>([
  ['running', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['stopped', 'bg-neutral-300/40 border-neutral-300'],
  [
    'pending',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

const computeStatus = (record: Notebook) => {
  if (
    record.metadata.annotations &&
    record.metadata.annotations["kubeflow-resource-stopped"]
  ) {
    return 'stopped';
  }
  if (record.status && record.status.readyReplicas === 1) {
    return 'running';
  }
  return 'pending';
};

export const getColumns = (
  onRefresh: () => void,
  canEdit: boolean = false
): ColumnDef<Notebook>[] => [
    {
      accessorKey: 'name',
      accessorFn: (row) => row.metadata.name,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Name' />
      ),
      cell: ({ row }) => (
        <LongText className='max-w-18'>{row.getValue('name')}</LongText>
      ),
    },
    {
      accessorKey: 'creationTimestamp',
      accessorFn: (row) => row.metadata.creationTimestamp,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Created Time' />
      ),
      cell: ({ row }) => (
        <div>{row.getValue('creationTimestamp')}</div>
      ),
    },
    {
      id: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Status' />
      ),
      cell: ({ row }) => {
        const status = computeStatus(row.original)
        const badgeColor = callTypes.get(status)
        return (
          <div className='flex space-x-2'>
            <Badge variant='outline' className={cn('capitalize', badgeColor)}>
              {status}
            </Badge>
          </div>
        )
      },
    },
    {
      id: 'action',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Action' />
      ),
      cell: ({ row }) => {
        const status = computeStatus(row.original)
        return <DataTableRowActions row={row} status={status} onRefresh={onRefresh} canEdit={canEdit} />
      },
    },
  ]
