import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/workspaces-columns'
import { WorkspacesDialogs } from './components/workspaces-dialogs'
import { WorkspacesPrimaryButtons } from './components/workspaces-primary-buttons'
import { WorkspacesTable } from './components/workspaces-table'
import WorkspacesProvider from './context/workspaces-context'

export default function Workspaces() {
  // const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  // useEffect(() => {
  //   const fetchWorkspaces = async () => {
  //     try {
  //       const response = await getWorkspaces();
  //       setWorkspaces(response.data);
  //     } catch (error) {
  //       console.error('获取工作区失败', error);
  //     }
  //   };
  //   if (!workspaces.length) {
  //     fetchWorkspaces();
  //   }
  // }, [workspaces.length]);

  return (
    <WorkspacesProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Workspace List</h2>
            <p className='text-muted-foreground'>
              Manage your workspaces and their roles here.
            </p>
          </div>
          <WorkspacesPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <WorkspacesTable columns={columns} />
        </div>
      </Main>

      <WorkspacesDialogs />
    </WorkspacesProvider>
  )
}
