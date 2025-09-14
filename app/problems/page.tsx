import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { ProblemList } from "@/components/problem-list"

export default function ProblemsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <ProblemList />
          </div>
        </main>
      </div>
    </div>
  )
}
