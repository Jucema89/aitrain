import { AdminGuard } from "./AdminGuard/admin.guard";
import { AuthGuard } from "./AuthGuard/auth.guard";
import { SuperAdminGuard } from "./SuperAdminGuard/superadmin.guard";

export const GUARDS = [
  AuthGuard,
  AdminGuard,
  SuperAdminGuard
]
