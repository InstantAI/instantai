import { createLazyFileRoute } from '@tanstack/react-router'
import Workspaces from '@/features/workspaces'

export const Route = createLazyFileRoute('/_authenticated/workspaces/')({
  component: Workspaces,
})
