import { RoutesInterface } from "./routes";
import {
  HomeComponent,
  AboutComponent,
  ContactComponent,
  NotFoundComponent
} from '../views';
import { useRoutes } from "react-router-dom";

// can use useRoutes to render the correct component based on the path
const routes: RoutesInterface[] = [
  { path: '', element: <HomeComponent /> },
  { path: 'about', element: <AboutComponent /> },
  { path: 'contact', element: <ContactComponent /> },
  { path: '*', element: <NotFoundComponent /> }
];

export default routes;
