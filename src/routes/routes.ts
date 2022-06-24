
export interface RoutesInterface {
  path: string;
  element: JSX.Element;
  permission: RoutePermission
}

export enum RoutePermission{
  Public = 'Public',
  Admin =  'Admin',
  User = 'User',
}
