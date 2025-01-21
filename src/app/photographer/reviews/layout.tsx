import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout userType="photographer">{children}</DashboardLayout>
}
