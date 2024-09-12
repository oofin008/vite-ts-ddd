import { Permission } from "@/components/Guard/type";

export interface RoutesInterface {
  path: string;
  element: JSX.Element;
  permission: Permission;
}
