import { createLazyFileRoute } from '@tanstack/react-router'
import Notebooks from '@/features/notebooks'

export const Route = createLazyFileRoute('/_authenticated/notebooks/')({
  component: Notebooks,
})
