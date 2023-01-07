import { RoutesInterface, RoutePermission } from "./routes";
import { lazy } from "react";
// import {
//   HomeComponent,
//   AboutComponent,
//   ContactComponent,
//   EntryComponent,
//   NotFoundComponent,
// } from '@/views';

// Lazy load Page component to improve loading speed
const HomeComponent = lazy(() => import('@/views/Home'));
const AboutComponent = lazy(() => import('@/views/About'));
const ContactComponent = lazy(() => import('@/views/Contact'));
const EntryComponent = lazy(() => import('@/views/Entry'));
const NotFoundComponent = lazy(() => import('@/views/NotFound'));

// can use useRoutes to render the correct component based on the path
const routes: RoutesInterface[] = [
  { path: '', element: <HomeComponent />, permission: RoutePermission.Public },
  { path: 'about', element: <AboutComponent />, permission: RoutePermission.Public },
  { path: 'contact', element: <ContactComponent />, permission: RoutePermission.Admin },
  { path: 'entry', element: <EntryComponent />, permission: RoutePermission.Public },
  { path: '*', element: <NotFoundComponent />, permission: RoutePermission.Public },
];

// will be use in App.tsx
export default routes;
