import { useParams } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { WorkspaceMembers } from './components/workspace-members'

export default function WorkspaceMembersPage() {
  const { workspaceName } = useParams({ from: '/_authenticated/workspaces/$workspaceName/members' })


  return (
    <>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <WorkspaceMembers workspaceName={workspaceName} />
      </Main>
    </>
  )
}