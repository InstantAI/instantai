/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedRouteImport } from './routes/_authenticated/route'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'

// Create Virtual Routes

const errors503LazyImport = createFileRoute('/(errors)/503')()
const errors500LazyImport = createFileRoute('/(errors)/500')()
const errors404LazyImport = createFileRoute('/(errors)/404')()
const errors403LazyImport = createFileRoute('/(errors)/403')()
const errors401LazyImport = createFileRoute('/(errors)/401')()
const AuthenticatedSettingsRouteLazyImport = createFileRoute(
  '/_authenticated/settings',
)()
const AuthenticatedWorkspacesIndexLazyImport = createFileRoute(
  '/_authenticated/workspaces/',
)()
const AuthenticatedTasksIndexLazyImport = createFileRoute(
  '/_authenticated/tasks/',
)()
const AuthenticatedSettingsIndexLazyImport = createFileRoute(
  '/_authenticated/settings/',
)()
const AuthenticatedNotebooksIndexLazyImport = createFileRoute(
  '/_authenticated/notebooks/',
)()
const AuthenticatedHelpCenterIndexLazyImport = createFileRoute(
  '/_authenticated/help-center/',
)()
const AuthenticatedSettingsNotificationsLazyImport = createFileRoute(
  '/_authenticated/settings/notifications',
)()
const AuthenticatedSettingsDisplayLazyImport = createFileRoute(
  '/_authenticated/settings/display',
)()
const AuthenticatedSettingsAppearanceLazyImport = createFileRoute(
  '/_authenticated/settings/appearance',
)()
const AuthenticatedSettingsAccountLazyImport = createFileRoute(
  '/_authenticated/settings/account',
)()
const AuthenticatedWorkspacesWorkspaceNameMembersLazyImport = createFileRoute(
  '/_authenticated/workspaces/$workspaceName/members',
)()

// Create/Update Routes

const AuthenticatedRouteRoute = AuthenticatedRouteImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)

const errors503LazyRoute = errors503LazyImport
  .update({
    id: '/(errors)/503',
    path: '/503',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/503.lazy').then((d) => d.Route))

const errors500LazyRoute = errors500LazyImport
  .update({
    id: '/(errors)/500',
    path: '/500',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/500.lazy').then((d) => d.Route))

const errors404LazyRoute = errors404LazyImport
  .update({
    id: '/(errors)/404',
    path: '/404',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/404.lazy').then((d) => d.Route))

const errors403LazyRoute = errors403LazyImport
  .update({
    id: '/(errors)/403',
    path: '/403',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/403.lazy').then((d) => d.Route))

const errors401LazyRoute = errors401LazyImport
  .update({
    id: '/(errors)/401',
    path: '/401',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/401.lazy').then((d) => d.Route))

const AuthenticatedSettingsRouteLazyRoute =
  AuthenticatedSettingsRouteLazyImport.update({
    id: '/settings',
    path: '/settings',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/settings/route.lazy').then((d) => d.Route),
  )

const AuthenticatedWorkspacesIndexLazyRoute =
  AuthenticatedWorkspacesIndexLazyImport.update({
    id: '/workspaces/',
    path: '/workspaces/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/workspaces/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedTasksIndexLazyRoute =
  AuthenticatedTasksIndexLazyImport.update({
    id: '/tasks/',
    path: '/tasks/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/tasks/index.lazy').then((d) => d.Route),
  )

const AuthenticatedSettingsIndexLazyRoute =
  AuthenticatedSettingsIndexLazyImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => AuthenticatedSettingsRouteLazyRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/settings/index.lazy').then((d) => d.Route),
  )

const AuthenticatedNotebooksIndexLazyRoute =
  AuthenticatedNotebooksIndexLazyImport.update({
    id: '/notebooks/',
    path: '/notebooks/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/notebooks/index.lazy').then((d) => d.Route),
  )

const AuthenticatedHelpCenterIndexLazyRoute =
  AuthenticatedHelpCenterIndexLazyImport.update({
    id: '/help-center/',
    path: '/help-center/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/help-center/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedSettingsNotificationsLazyRoute =
  AuthenticatedSettingsNotificationsLazyImport.update({
    id: '/notifications',
    path: '/notifications',
    getParentRoute: () => AuthenticatedSettingsRouteLazyRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/settings/notifications.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedSettingsDisplayLazyRoute =
  AuthenticatedSettingsDisplayLazyImport.update({
    id: '/display',
    path: '/display',
    getParentRoute: () => AuthenticatedSettingsRouteLazyRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/settings/display.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedSettingsAppearanceLazyRoute =
  AuthenticatedSettingsAppearanceLazyImport.update({
    id: '/appearance',
    path: '/appearance',
    getParentRoute: () => AuthenticatedSettingsRouteLazyRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/settings/appearance.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedSettingsAccountLazyRoute =
  AuthenticatedSettingsAccountLazyImport.update({
    id: '/account',
    path: '/account',
    getParentRoute: () => AuthenticatedSettingsRouteLazyRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/settings/account.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedWorkspacesWorkspaceNameMembersLazyRoute =
  AuthenticatedWorkspacesWorkspaceNameMembersLazyImport.update({
    id: '/workspaces/$workspaceName/members',
    path: '/workspaces/$workspaceName/members',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import(
      './routes/_authenticated/workspaces/$workspaceName/members.lazy'
    ).then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedRouteImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/settings': {
      id: '/_authenticated/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AuthenticatedSettingsRouteLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/(errors)/401': {
      id: '/(errors)/401'
      path: '/401'
      fullPath: '/401'
      preLoaderRoute: typeof errors401LazyImport
      parentRoute: typeof rootRoute
    }
    '/(errors)/403': {
      id: '/(errors)/403'
      path: '/403'
      fullPath: '/403'
      preLoaderRoute: typeof errors403LazyImport
      parentRoute: typeof rootRoute
    }
    '/(errors)/404': {
      id: '/(errors)/404'
      path: '/404'
      fullPath: '/404'
      preLoaderRoute: typeof errors404LazyImport
      parentRoute: typeof rootRoute
    }
    '/(errors)/500': {
      id: '/(errors)/500'
      path: '/500'
      fullPath: '/500'
      preLoaderRoute: typeof errors500LazyImport
      parentRoute: typeof rootRoute
    }
    '/(errors)/503': {
      id: '/(errors)/503'
      path: '/503'
      fullPath: '/503'
      preLoaderRoute: typeof errors503LazyImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/settings/account': {
      id: '/_authenticated/settings/account'
      path: '/account'
      fullPath: '/settings/account'
      preLoaderRoute: typeof AuthenticatedSettingsAccountLazyImport
      parentRoute: typeof AuthenticatedSettingsRouteLazyImport
    }
    '/_authenticated/settings/appearance': {
      id: '/_authenticated/settings/appearance'
      path: '/appearance'
      fullPath: '/settings/appearance'
      preLoaderRoute: typeof AuthenticatedSettingsAppearanceLazyImport
      parentRoute: typeof AuthenticatedSettingsRouteLazyImport
    }
    '/_authenticated/settings/display': {
      id: '/_authenticated/settings/display'
      path: '/display'
      fullPath: '/settings/display'
      preLoaderRoute: typeof AuthenticatedSettingsDisplayLazyImport
      parentRoute: typeof AuthenticatedSettingsRouteLazyImport
    }
    '/_authenticated/settings/notifications': {
      id: '/_authenticated/settings/notifications'
      path: '/notifications'
      fullPath: '/settings/notifications'
      preLoaderRoute: typeof AuthenticatedSettingsNotificationsLazyImport
      parentRoute: typeof AuthenticatedSettingsRouteLazyImport
    }
    '/_authenticated/help-center/': {
      id: '/_authenticated/help-center/'
      path: '/help-center'
      fullPath: '/help-center'
      preLoaderRoute: typeof AuthenticatedHelpCenterIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/notebooks/': {
      id: '/_authenticated/notebooks/'
      path: '/notebooks'
      fullPath: '/notebooks'
      preLoaderRoute: typeof AuthenticatedNotebooksIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/settings/': {
      id: '/_authenticated/settings/'
      path: '/'
      fullPath: '/settings/'
      preLoaderRoute: typeof AuthenticatedSettingsIndexLazyImport
      parentRoute: typeof AuthenticatedSettingsRouteLazyImport
    }
    '/_authenticated/tasks/': {
      id: '/_authenticated/tasks/'
      path: '/tasks'
      fullPath: '/tasks'
      preLoaderRoute: typeof AuthenticatedTasksIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/workspaces/': {
      id: '/_authenticated/workspaces/'
      path: '/workspaces'
      fullPath: '/workspaces'
      preLoaderRoute: typeof AuthenticatedWorkspacesIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/workspaces/$workspaceName/members': {
      id: '/_authenticated/workspaces/$workspaceName/members'
      path: '/workspaces/$workspaceName/members'
      fullPath: '/workspaces/$workspaceName/members'
      preLoaderRoute: typeof AuthenticatedWorkspacesWorkspaceNameMembersLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedSettingsRouteLazyRouteChildren {
  AuthenticatedSettingsAccountLazyRoute: typeof AuthenticatedSettingsAccountLazyRoute
  AuthenticatedSettingsAppearanceLazyRoute: typeof AuthenticatedSettingsAppearanceLazyRoute
  AuthenticatedSettingsDisplayLazyRoute: typeof AuthenticatedSettingsDisplayLazyRoute
  AuthenticatedSettingsNotificationsLazyRoute: typeof AuthenticatedSettingsNotificationsLazyRoute
  AuthenticatedSettingsIndexLazyRoute: typeof AuthenticatedSettingsIndexLazyRoute
}

const AuthenticatedSettingsRouteLazyRouteChildren: AuthenticatedSettingsRouteLazyRouteChildren =
  {
    AuthenticatedSettingsAccountLazyRoute:
      AuthenticatedSettingsAccountLazyRoute,
    AuthenticatedSettingsAppearanceLazyRoute:
      AuthenticatedSettingsAppearanceLazyRoute,
    AuthenticatedSettingsDisplayLazyRoute:
      AuthenticatedSettingsDisplayLazyRoute,
    AuthenticatedSettingsNotificationsLazyRoute:
      AuthenticatedSettingsNotificationsLazyRoute,
    AuthenticatedSettingsIndexLazyRoute: AuthenticatedSettingsIndexLazyRoute,
  }

const AuthenticatedSettingsRouteLazyRouteWithChildren =
  AuthenticatedSettingsRouteLazyRoute._addFileChildren(
    AuthenticatedSettingsRouteLazyRouteChildren,
  )

interface AuthenticatedRouteRouteChildren {
  AuthenticatedSettingsRouteLazyRoute: typeof AuthenticatedSettingsRouteLazyRouteWithChildren
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute
  AuthenticatedHelpCenterIndexLazyRoute: typeof AuthenticatedHelpCenterIndexLazyRoute
  AuthenticatedNotebooksIndexLazyRoute: typeof AuthenticatedNotebooksIndexLazyRoute
  AuthenticatedTasksIndexLazyRoute: typeof AuthenticatedTasksIndexLazyRoute
  AuthenticatedWorkspacesIndexLazyRoute: typeof AuthenticatedWorkspacesIndexLazyRoute
  AuthenticatedWorkspacesWorkspaceNameMembersLazyRoute: typeof AuthenticatedWorkspacesWorkspaceNameMembersLazyRoute
}

const AuthenticatedRouteRouteChildren: AuthenticatedRouteRouteChildren = {
  AuthenticatedSettingsRouteLazyRoute:
    AuthenticatedSettingsRouteLazyRouteWithChildren,
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
  AuthenticatedHelpCenterIndexLazyRoute: AuthenticatedHelpCenterIndexLazyRoute,
  AuthenticatedNotebooksIndexLazyRoute: AuthenticatedNotebooksIndexLazyRoute,
  AuthenticatedTasksIndexLazyRoute: AuthenticatedTasksIndexLazyRoute,
  AuthenticatedWorkspacesIndexLazyRoute: AuthenticatedWorkspacesIndexLazyRoute,
  AuthenticatedWorkspacesWorkspaceNameMembersLazyRoute:
    AuthenticatedWorkspacesWorkspaceNameMembersLazyRoute,
}

const AuthenticatedRouteRouteWithChildren =
  AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedRouteRouteWithChildren
  '/settings': typeof AuthenticatedSettingsRouteLazyRouteWithChildren
  '/401': typeof errors401LazyRoute
  '/403': typeof errors403LazyRoute
  '/404': typeof errors404LazyRoute
  '/500': typeof errors500LazyRoute
  '/503': typeof errors503LazyRoute
  '/': typeof AuthenticatedIndexRoute
  '/settings/account': typeof AuthenticatedSettingsAccountLazyRoute
  '/settings/appearance': typeof AuthenticatedSettingsAppearanceLazyRoute
  '/settings/display': typeof AuthenticatedSettingsDisplayLazyRoute
  '/settings/notifications': typeof AuthenticatedSettingsNotificationsLazyRoute
  '/help-center': typeof AuthenticatedHelpCenterIndexLazyRoute
  '/notebooks': typeof AuthenticatedNotebooksIndexLazyRoute
  '/settings/': typeof AuthenticatedSettingsIndexLazyRoute
  '/tasks': typeof AuthenticatedTasksIndexLazyRoute
  '/workspaces': typeof AuthenticatedWorkspacesIndexLazyRoute
  '/workspaces/$workspaceName/members': typeof AuthenticatedWorkspacesWorkspaceNameMembersLazyRoute
}

export interface FileRoutesByTo {
  '/401': typeof errors401LazyRoute
  '/403': typeof errors403LazyRoute
  '/404': typeof errors404LazyRoute
  '/500': typeof errors500LazyRoute
  '/503': typeof errors503LazyRoute
  '/': typeof AuthenticatedIndexRoute
  '/settings/account': typeof AuthenticatedSettingsAccountLazyRoute
  '/settings/appearance': typeof AuthenticatedSettingsAppearanceLazyRoute
  '/settings/display': typeof AuthenticatedSettingsDisplayLazyRoute
  '/settings/notifications': typeof AuthenticatedSettingsNotificationsLazyRoute
  '/help-center': typeof AuthenticatedHelpCenterIndexLazyRoute
  '/notebooks': typeof AuthenticatedNotebooksIndexLazyRoute
  '/settings': typeof AuthenticatedSettingsIndexLazyRoute
  '/tasks': typeof AuthenticatedTasksIndexLazyRoute
  '/workspaces': typeof AuthenticatedWorkspacesIndexLazyRoute
  '/workspaces/$workspaceName/members': typeof AuthenticatedWorkspacesWorkspaceNameMembersLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteRouteWithChildren
  '/_authenticated/settings': typeof AuthenticatedSettingsRouteLazyRouteWithChildren
  '/(errors)/401': typeof errors401LazyRoute
  '/(errors)/403': typeof errors403LazyRoute
  '/(errors)/404': typeof errors404LazyRoute
  '/(errors)/500': typeof errors500LazyRoute
  '/(errors)/503': typeof errors503LazyRoute
  '/_authenticated/': typeof AuthenticatedIndexRoute
  '/_authenticated/settings/account': typeof AuthenticatedSettingsAccountLazyRoute
  '/_authenticated/settings/appearance': typeof AuthenticatedSettingsAppearanceLazyRoute
  '/_authenticated/settings/display': typeof AuthenticatedSettingsDisplayLazyRoute
  '/_authenticated/settings/notifications': typeof AuthenticatedSettingsNotificationsLazyRoute
  '/_authenticated/help-center/': typeof AuthenticatedHelpCenterIndexLazyRoute
  '/_authenticated/notebooks/': typeof AuthenticatedNotebooksIndexLazyRoute
  '/_authenticated/settings/': typeof AuthenticatedSettingsIndexLazyRoute
  '/_authenticated/tasks/': typeof AuthenticatedTasksIndexLazyRoute
  '/_authenticated/workspaces/': typeof AuthenticatedWorkspacesIndexLazyRoute
  '/_authenticated/workspaces/$workspaceName/members': typeof AuthenticatedWorkspacesWorkspaceNameMembersLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/settings'
    | '/401'
    | '/403'
    | '/404'
    | '/500'
    | '/503'
    | '/'
    | '/settings/account'
    | '/settings/appearance'
    | '/settings/display'
    | '/settings/notifications'
    | '/help-center'
    | '/notebooks'
    | '/settings/'
    | '/tasks'
    | '/workspaces'
    | '/workspaces/$workspaceName/members'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/401'
    | '/403'
    | '/404'
    | '/500'
    | '/503'
    | '/'
    | '/settings/account'
    | '/settings/appearance'
    | '/settings/display'
    | '/settings/notifications'
    | '/help-center'
    | '/notebooks'
    | '/settings'
    | '/tasks'
    | '/workspaces'
    | '/workspaces/$workspaceName/members'
  id:
    | '__root__'
    | '/_authenticated'
    | '/_authenticated/settings'
    | '/(errors)/401'
    | '/(errors)/403'
    | '/(errors)/404'
    | '/(errors)/500'
    | '/(errors)/503'
    | '/_authenticated/'
    | '/_authenticated/settings/account'
    | '/_authenticated/settings/appearance'
    | '/_authenticated/settings/display'
    | '/_authenticated/settings/notifications'
    | '/_authenticated/help-center/'
    | '/_authenticated/notebooks/'
    | '/_authenticated/settings/'
    | '/_authenticated/tasks/'
    | '/_authenticated/workspaces/'
    | '/_authenticated/workspaces/$workspaceName/members'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRouteRoute: typeof AuthenticatedRouteRouteWithChildren
  errors401LazyRoute: typeof errors401LazyRoute
  errors403LazyRoute: typeof errors403LazyRoute
  errors404LazyRoute: typeof errors404LazyRoute
  errors500LazyRoute: typeof errors500LazyRoute
  errors503LazyRoute: typeof errors503LazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  errors401LazyRoute: errors401LazyRoute,
  errors403LazyRoute: errors403LazyRoute,
  errors404LazyRoute: errors404LazyRoute,
  errors500LazyRoute: errors500LazyRoute,
  errors503LazyRoute: errors503LazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/(errors)/401",
        "/(errors)/403",
        "/(errors)/404",
        "/(errors)/500",
        "/(errors)/503"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated/route.tsx",
      "children": [
        "/_authenticated/settings",
        "/_authenticated/",
        "/_authenticated/help-center/",
        "/_authenticated/notebooks/",
        "/_authenticated/tasks/",
        "/_authenticated/workspaces/",
        "/_authenticated/workspaces/$workspaceName/members"
      ]
    },
    "/_authenticated/settings": {
      "filePath": "_authenticated/settings/route.lazy.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/settings/account",
        "/_authenticated/settings/appearance",
        "/_authenticated/settings/display",
        "/_authenticated/settings/notifications",
        "/_authenticated/settings/"
      ]
    },
    "/(errors)/401": {
      "filePath": "(errors)/401.lazy.tsx"
    },
    "/(errors)/403": {
      "filePath": "(errors)/403.lazy.tsx"
    },
    "/(errors)/404": {
      "filePath": "(errors)/404.lazy.tsx"
    },
    "/(errors)/500": {
      "filePath": "(errors)/500.lazy.tsx"
    },
    "/(errors)/503": {
      "filePath": "(errors)/503.lazy.tsx"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/settings/account": {
      "filePath": "_authenticated/settings/account.lazy.tsx",
      "parent": "/_authenticated/settings"
    },
    "/_authenticated/settings/appearance": {
      "filePath": "_authenticated/settings/appearance.lazy.tsx",
      "parent": "/_authenticated/settings"
    },
    "/_authenticated/settings/display": {
      "filePath": "_authenticated/settings/display.lazy.tsx",
      "parent": "/_authenticated/settings"
    },
    "/_authenticated/settings/notifications": {
      "filePath": "_authenticated/settings/notifications.lazy.tsx",
      "parent": "/_authenticated/settings"
    },
    "/_authenticated/help-center/": {
      "filePath": "_authenticated/help-center/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/notebooks/": {
      "filePath": "_authenticated/notebooks/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/settings/": {
      "filePath": "_authenticated/settings/index.lazy.tsx",
      "parent": "/_authenticated/settings"
    },
    "/_authenticated/tasks/": {
      "filePath": "_authenticated/tasks/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/workspaces/": {
      "filePath": "_authenticated/workspaces/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/workspaces/$workspaceName/members": {
      "filePath": "_authenticated/workspaces/$workspaceName/members.lazy.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
