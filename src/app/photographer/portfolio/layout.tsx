import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout userType="photographer">{children}</DashboardLayout>
}
