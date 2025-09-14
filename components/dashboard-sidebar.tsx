import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, HelpCircle, BookOpen, List, Folder, Star, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

export function DashboardSidebar() {
  return (
    <aside className="w-72 border-r border-sidebar-border bg-sidebar/50 backdrop-blur-sm">
      <div className="p-4 space-y-6">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <Link href="/">
            <Button
              className="w-full justify-start gap-3 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg"
              size="lg"
            >
              <Plus className="h-5 w-5" />
              Create New Problem
            </Button>
          </Link>
        </Card>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-sidebar-foreground px-3 mb-3 uppercase tracking-wide">
              Workspace
            </h3>
            <div className="space-y-1">
              <Link href="/problems">
                <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                  <List className="h-4 w-4" />
                  All Problems
                  <Badge variant="secondary" className="ml-auto">
                    12
                  </Badge>
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Folder className="h-4 w-4" />
                My Drafts
                <Badge variant="outline" className="ml-auto">
                  4
                </Badge>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Star className="h-4 w-4" />
                Favorites
                <Badge variant="outline" className="ml-auto">
                  8
                </Badge>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <Clock className="h-4 w-4" />
                Recent
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-sidebar-foreground px-3 mb-3 uppercase tracking-wide">
              Resources
            </h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <BookOpen className="h-4 w-4" />
                Templates
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                <HelpCircle className="h-4 w-4" />
                Documentation
              </Button>
            </div>
          </div>
        </div>

        <Card className="p-4 bg-gradient-to-br from-card to-muted/50">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold">Quick Stats</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Problems</span>
              <Badge variant="secondary" className="font-semibold">
                12
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Published</span>
              <Badge className="bg-green-100 text-green-800 font-semibold">8</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">In Review</span>
              <Badge className="bg-yellow-100 text-yellow-800 font-semibold">2</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Drafts</span>
              <Badge variant="outline" className="font-semibold">
                4
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </aside>
  )
}
