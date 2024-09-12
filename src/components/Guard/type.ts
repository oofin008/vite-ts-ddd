import React from "react";


export enum Permission {
  PUBLIC = 0,
  USER = 1,
  ADMIN =  2,
}

export interface PermissionGuardProps {
  permission: Permission;
  children: React.ReactNode;
  redirectUrl?: string;
}