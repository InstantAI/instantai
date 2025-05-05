// src/routes/_authenticated/workspaces/$workspaceName/members.lazy.tsx
import { createLazyFileRoute } from '@tanstack/react-router'
import WorkspaceMembersPage from '@/features/workspaces/members-page'

export const Route = createLazyFileRoute('/_authenticated/workspaces/$workspaceName/members')({
  component: WorkspaceMembersPage,
})