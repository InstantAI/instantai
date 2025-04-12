import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Workspace } from '@/services/notebooksService'

interface DataTableToolbarProps {
  workspaces: Workspace[]
  selectedWorkspace: string
  onWorkspaceChange: (value: string) => void
}

export function DataTableToolbar({
  workspaces,
  selectedWorkspace,
  onWorkspaceChange,
}: DataTableToolbarProps) {

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <div className='flex gap-x-2'>
          <Select
            value={selectedWorkspace}
            onValueChange={onWorkspaceChange}
            disabled={workspaces.length === 0}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={workspaces.length ? "Select workspace..." : "Loading workspaces..."}
              />
            </SelectTrigger>
            <SelectContent>
              {workspaces.map(workspace => (
                <SelectItem key={workspace.name} value={workspace.name}>
                  {workspace.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
