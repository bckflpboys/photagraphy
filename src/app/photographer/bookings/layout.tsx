import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function BookingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout userType="photographer">{children}</DashboardLayout>
}
