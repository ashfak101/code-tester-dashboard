import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import CreatePage from "@/components/pages/create-page/create-page"
import { ProblemList } from "@/components/problem-list"

export default function ProblemsPage() {
  return (
    <div className="min-h-screen bg-background">
       <CreatePage />
    </div>
  )
}
