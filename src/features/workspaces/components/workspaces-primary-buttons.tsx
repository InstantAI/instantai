import { IconCloudPlus, IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useWorkspaces } from '../context/workspaces-context'

export function WorkspacesPrimaryButtons() {
  const { setOpen } = useWorkspaces()
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>Invite User</span> <IconUserPlus size={18} />
      </Button>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Workspace</span> <IconCloudPlus size={18} />
      </Button>
    </div>
  )
}
