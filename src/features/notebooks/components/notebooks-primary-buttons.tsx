import { IconMailPlus, IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useNotebooks } from '../context/notebooks-context'

export function NotebooksPrimaryButtons() {
  const { setOpen } = useNotebooks()
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>Invite User</span> <IconMailPlus size={18} />
      </Button>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Create</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}
