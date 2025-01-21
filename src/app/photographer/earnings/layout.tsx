import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function EarningsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout userType="photographer">{children}</DashboardLayout>
}
