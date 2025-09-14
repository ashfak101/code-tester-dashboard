"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, Trash2, Download, Upload, FileCode, Folder, Search } from "lucide-react"

interface FileItem {
  id: string
  name: string
  language: string
  content: string
  saved: boolean
}

interface FileSidebarProps {
  files: FileItem[]
  activeFileId: string
  onFileSelect: (fileId: string) => void
  onFileCreate: (name: string, language: string) => void
  onFileDelete: (fileId: string) => void
  onFileSave: (fileId: string) => void
  onFileRename: (fileId: string, newName: string) => void
}

const languageIcons: Record<string, string> = {
  javascript: "🟨",
  python: "🐍",
  java: "☕",
  cpp: "⚡",
  csharp: "🔷",
  go: "🐹",
  rust: "🦀",
  typescript: "🔷",
  markdown: "📝",
}

const languageExtensions: Record<string, string> = {
  javascript: ".js",
  python: ".py",
  java: ".java",
  cpp: ".cpp",
  csharp: ".cs",
  go: ".go",
  rust: ".rs",
  typescript: ".ts",
  markdown: ".md",
}

export function FileSidebar({
  files,
  activeFileId,
  onFileSelect,
  onFileCreate,
  onFileDelete,
  onFileSave,
  onFileRename,
}: FileSidebarProps) {
  const [newFileName, setNewFileName] = useState("")
  const [newFileLanguage, setNewFileLanguage] = useState("javascript")
  const [showNewFileForm, setShowNewFileForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      const extension = languageExtensions[newFileLanguage] || ".txt"
      const fullName = newFileName.includes(".") ? newFileName : newFileName + extension
      onFileCreate(fullName, newFileLanguage)
      setNewFileName("")
      setShowNewFileForm(false)
    }
  }

  const handleSaveAll = () => {
    files.filter((f) => !f.saved).forEach((f) => onFileSave(f.id))
  }

  const unsavedCount = files.filter((f) => !f.saved).length

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Card className="w-80 h-full flex flex-col shadow-lg border-border/50">
      <div className="p-4 border-b border-border bg-gradient-to-r from-card to-muted/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm">Solution Files</h3>
            <Badge variant="outline" className="text-xs">
              {files.length}
            </Badge>
          </div>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowNewFileForm(!showNewFileForm)}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
            {unsavedCount > 0 && (
              <Button size="sm" variant="outline" onClick={handleSaveAll} className="h-8 px-2 bg-transparent">
                <Save className="h-3 w-3 mr-1" />
                {unsavedCount}
              </Button>
            )}
          </div>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pl-9 text-sm"
          />
        </div>

        {/* New File Form */}
        {showNewFileForm && (
          <div className="space-y-3 p-3 bg-muted/50 rounded-lg border border-border/50">
            <Input
              placeholder="File name"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="h-8"
            />
            <select
              value={newFileLanguage}
              onChange={(e) => setNewFileLanguage(e.target.value)}
              className="w-full h-8 px-2 rounded border bg-background text-sm"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="csharp">C#</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="typescript">TypeScript</option>
            </select>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleCreateFile} className="flex-1">
                Create
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowNewFileForm(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* File List */}
      <div className="flex-1 overflow-auto p-2">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted/50 hover:shadow-sm ${
              activeFileId === file.id ? "bg-primary/10 border border-primary/20 shadow-sm" : ""
            }`}
            onClick={() => onFileSelect(file.id)}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-primary/10 to-secondary/10">
              <span className="text-sm">{languageIcons[file.language] || <FileCode className="h-4 w-4" />}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium truncate">{file.name}</span>
                {!file.saved && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" title="Unsaved changes" />
                )}
              </div>
              <Badge variant="secondary" className="text-xs h-5 px-2 bg-muted/50">
                {file.language}
              </Badge>
            </div>
            <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 hover:bg-primary/10"
                onClick={(e) => {
                  e.stopPropagation()
                  onFileSave(file.id)
                }}
              >
                <Save className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                onClick={(e) => {
                  e.stopPropagation()
                  onFileDelete(file.id)
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border bg-gradient-to-r from-muted/30 to-card">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 h-9 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" variant="outline" className="flex-1 h-9 bg-transparent">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
        </div>
      </div>
    </Card>
  )
}
