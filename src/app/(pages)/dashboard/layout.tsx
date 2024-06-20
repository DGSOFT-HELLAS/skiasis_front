'use client';

import { AuthGuard } from 'src/auth/guard';
// ----------------------------------------------------------------------
import DashboardLayout from 'src/app/_layouts/dashboard';
type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
