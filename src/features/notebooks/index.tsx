import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { getColumns } from './components/notebooks-columns'
import { NotebooksDialogs } from './components/notebooks-dialogs'
import { NotebooksPrimaryButtons } from './components/notebooks-primary-buttons'
import { NotebooksTable } from './components/notebooks-table'
import NotebooksProvider from './context/notebooks-context'
import { useEffect, useState } from 'react'
import { getNotebooks, Notebook } from '@/services/notebooksService';
import { getWorkspaces,Workspace } from '@/services/workspacesService'


export default function Notebooks() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState('');
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  
  useEffect(() => {
    getWorkspaces().then((data) => {
      setWorkspaces(data);
      if (data.length > 0) {
        setSelectedWorkspace(data[0].name);
      }
    });
  }, [workspaces.length]);

  const fetchNotebooks = async () => {
    try {
      const response = await getNotebooks(selectedWorkspace);
      setNotebooks(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('获取数据失败');
      }
    }
  };
  useEffect(() => {
    if (selectedWorkspace) {
      fetchNotebooks();
    } else {
      setNotebooks([]);
    }
  }, [selectedWorkspace, refreshFlag]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshFlag(prev => !prev);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NotebooksProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Notebook List</h2>
            <p className='text-muted-foreground'>
              Manage your notebooks.
            </p>
          </div>
          <NotebooksPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <NotebooksTable
            data={notebooks}
            columns={getColumns( // ✅ 动态生成columns
              () => setRefreshFlag(prev => !prev) // 刷新回调
            )}
            workspaces={workspaces}
            selectedWorkspace={selectedWorkspace}
            onWorkspaceChange={setSelectedWorkspace}
          />
        </div>
      </Main>

      <NotebooksDialogs opSuccess={() => setRefreshFlag(prev => !prev)} />
    </NotebooksProvider>
  )
}
