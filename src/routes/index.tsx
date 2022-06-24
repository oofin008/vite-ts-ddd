import { RoutesInterface, RoutePermission } from "./routes";
import {
  HomeComponent,
  AboutComponent,
  ContactComponent,
  NotFoundComponent
} from '../views';

// can use useRoutes to render the correct component based on the path
const routes: RoutesInterface[] = [
  { path: '', element: <HomeComponent />, permission: RoutePermission.Public },
  { path: 'about', element: <AboutComponent />, permission: RoutePermission.Public },
  { path: 'contact', element: <ContactComponent />, permission: RoutePermission.Admin },
  { path: '*', element: <NotFoundComponent />, permission: RoutePermission.Public },
];

// will be use in App.tsx
export default routes;
