import { Permission } from "@/components/Guard/type";
import { RoutesInterface } from "./routes";
import { lazy } from "react";
import { PermissionGuard } from "@/components/Guard";
import { NoPermission } from "@/views/NoPermission";

// Lazy load Page component to improve loading speed
const HomeComponent = lazy(() => import('@/views/Home'));
const AdminComponent = lazy(() => import('@/views/Admin'));
const AboutComponent = lazy(() => import('@/views/About'));
const ContactComponent = lazy(() => import('@/views/Contact'));
const EntryComponent = lazy(() => import('@/views/Entry'));
const NotFoundComponent = lazy(() => import('@/views/NotFound'));

// can use useRoutes to render the correct component based on the path
const routes: RoutesInterface[] = [
  { path: '', element: <HomeComponent />, permission: Permission.PUBLIC },
  { path: 'about', element: <AboutComponent />, permission: Permission.PUBLIC },
  { path: 'admin', element: <AdminComponent />, permission: Permission.ADMIN},
  { path: 'contact', element: <ContactComponent />, permission: Permission.USER },
  { path: 'entry', element: <EntryComponent />, permission: Permission.PUBLIC },
  { path: 'nopermission', element: <NoPermission />, permission: Permission.PUBLIC },
  { path: '*', element: <NotFoundComponent />, permission: Permission.PUBLIC },
];

const buildRoutes = (routes: RoutesInterface[]) => {
  return routes.map((route, _i) => {
    return { ...route, element: <PermissionGuard permission={route.permission}>{route.element}</PermissionGuard>};
  });
}

// will be use in App.tsx
export default buildRoutes(routes);

// TODO: protect route with Admin Permission, if no permission, redirect to no permission page.
