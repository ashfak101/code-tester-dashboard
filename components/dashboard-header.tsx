import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, User, Code2, Moon, Sun, Bell } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg">
              <Code2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">LeetCode Studio</span>
              <span className="text-xs text-muted-foreground">Problem Setter Dashboard</span>
            </div>
          </div>

          <Badge variant="secondary" className="ml-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Online
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center">
              <span className="text-destructive-foreground text-[10px]">2</span>
            </div>
          </Button>

          <Button variant="ghost" size="icon">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="ml-2">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
