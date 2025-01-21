import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function AvailabilityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout userType="photographer">{children}</DashboardLayout>
}
