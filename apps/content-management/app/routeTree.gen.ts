/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignupImport } from './routes/signup'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthIndexImport } from './routes/_auth/index'
import { Route as AuthProfileImport } from './routes/_auth/profile'
import { Route as AuthDashboardImport } from './routes/_auth/dashboard'

// Create/Update Routes

const SignupRoute = SignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexRoute = AuthIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthProfileRoute = AuthProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => AuthRoute,
} as any)

const AuthDashboardRoute = AuthDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/_auth/dashboard': {
      id: '/_auth/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthDashboardImport
      parentRoute: typeof AuthImport
    }
    '/_auth/profile': {
      id: '/_auth/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthProfileImport
      parentRoute: typeof AuthImport
    }
    '/_auth/': {
      id: '/_auth/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthIndexImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthDashboardRoute: typeof AuthDashboardRoute
  AuthProfileRoute: typeof AuthProfileRoute
  AuthIndexRoute: typeof AuthIndexRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthDashboardRoute: AuthDashboardRoute,
  AuthProfileRoute: AuthProfileRoute,
  AuthIndexRoute: AuthIndexRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/signup': typeof SignupRoute
  '/dashboard': typeof AuthDashboardRoute
  '/profile': typeof AuthProfileRoute
  '/': typeof AuthIndexRoute
}

export interface FileRoutesByTo {
  '/login': typeof LoginRoute
  '/signup': typeof SignupRoute
  '/dashboard': typeof AuthDashboardRoute
  '/profile': typeof AuthProfileRoute
  '/': typeof AuthIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/signup': typeof SignupRoute
  '/_auth/dashboard': typeof AuthDashboardRoute
  '/_auth/profile': typeof AuthProfileRoute
  '/_auth/': typeof AuthIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/login' | '/signup' | '/dashboard' | '/profile' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/login' | '/signup' | '/dashboard' | '/profile' | '/'
  id:
    | '__root__'
    | '/_auth'
    | '/login'
    | '/signup'
    | '/_auth/dashboard'
    | '/_auth/profile'
    | '/_auth/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  LoginRoute: typeof LoginRoute
  SignupRoute: typeof SignupRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  LoginRoute: LoginRoute,
  SignupRoute: SignupRoute,
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
        "/_auth",
        "/login",
        "/signup"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/dashboard",
        "/_auth/profile",
        "/_auth/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/_auth/dashboard": {
      "filePath": "_auth/dashboard.tsx",
      "parent": "/_auth"
    },
    "/_auth/profile": {
      "filePath": "_auth/profile.tsx",
      "parent": "/_auth"
    },
    "/_auth/": {
      "filePath": "_auth/index.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
