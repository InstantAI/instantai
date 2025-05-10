import { IconCloudPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useWorkspaces } from '../context/workspaces-context'

export function WorkspacesPrimaryButtons() {
  const { setOpen } = useWorkspaces()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Workspace</span> <IconCloudPlus size={18} />
      </Button>
    </div>
  )
}
