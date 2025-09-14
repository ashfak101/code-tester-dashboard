"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MonacoEditor } from "@/components/monaco-editor"
import { MarkdownPreview } from "@/components/markdown-preview"
import {
  Eye,
  Edit3,
  Split,
  Maximize2,
  Type,
  Code,
  List,
  Link,
  ImageIcon,
  Table,
  Bold,
  Italic,
  Quote,
} from "lucide-react"

interface EnhancedMarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  height?: string
}

export function EnhancedMarkdownEditor({ value, onChange, height = "500px" }: EnhancedMarkdownEditorProps) {
  const [viewMode, setViewMode] = useState<"edit" | "preview" | "split">("split")
  const [isFullscreen, setIsFullscreen] = useState(false)

  const insertMarkdown = (syntax: string, placeholder = "") => {
    const textarea = document.querySelector(".monaco-editor textarea") as HTMLTextAreaElement
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = value.substring(start, end) || placeholder
      const newText = value.substring(0, start) + syntax.replace("{}", selectedText) + value.substring(end)
      onChange(newText)
    }
  }

  const markdownTools = [
    { icon: Type, label: "Heading", syntax: "# {}", placeholder: "Heading" },
    { icon: Bold, label: "Bold", syntax: "**{}**", placeholder: "bold text" },
    { icon: Italic, label: "Italic", syntax: "*{}*", placeholder: "italic text" },
    { icon: Code, label: "Code", syntax: "`{}`", placeholder: "code" },
    { icon: Quote, label: "Quote", syntax: "> {}", placeholder: "quote" },
    { icon: List, label: "List", syntax: "- {}", placeholder: "item" },
    { icon: Link, label: "Link", syntax: "[{}](url)", placeholder: "link text" },
    { icon: ImageIcon, label: "Image", syntax: "![{}](url)", placeholder: "alt text" },
    {
      icon: Table,
      label: "Table",
      syntax: "| {} | Column 2 |\n|------|----------|\n| Row 1 | Data |",
      placeholder: "Column 1",
    },
  ]

  return (
    <Card className={`${isFullscreen ? "fixed inset-4 z-50" : ""} flex flex-col shadow-lg border-border/50`}>
      <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-card to-muted/30">
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-xs bg-primary text-white border-primary/20 font-medium">
            <Edit3 className="h-3 w-3 mr-1" />
            Markdown Editor
          </Badge>
          <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
            {markdownTools.map((tool) => (
              <Button
                key={tool.label}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                onClick={() => insertMarkdown(tool.syntax, tool.placeholder)}
                title={tool.label}
              >
                <tool.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex border border-border rounded-lg bg-background shadow-sm">
            <Button
              size="sm"
              variant={viewMode === "edit" ? "default" : "ghost"}
              className="h-8 px-3 rounded-r-none"
              onClick={() => setViewMode("edit")}
            >
              <Edit3 className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant={viewMode === "split" ? "default" : "ghost"}
              className="h-8 px-3 rounded-none border-x"
              onClick={() => setViewMode("split")}
            >
              <Split className="h-4 w-4 mr-1" />
              Split
            </Button>
            <Button
              size="sm"
              variant={viewMode === "preview" ? "default" : "ghost"}
              className="h-8 px-3 rounded-l-none"
              onClick={() => setViewMode("preview")}
            >
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
          </div>

          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setIsFullscreen(!isFullscreen)}>
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex" style={{ height: isFullscreen ? "calc(100vh - 160px)" : height }}>
        {/* Edit Mode */}
        {(viewMode === "edit" || viewMode === "split") && (
          <div className={`${viewMode === "split" ? "w-1/2 border-r border-border" : "w-full"}`}>
            <MonacoEditor
              value={value}
              onChange={onChange}
              language="markdown"
              height="100%"
              theme="vs-dark"
              options={{
                wordWrap: "on",
                lineNumbers: "on",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                lineHeight: 1.6,
                padding: { top: 20, bottom: 20 },
              }}
            />
          </div>
        )}

        {/* Preview Mode */}
        {(viewMode === "preview" || viewMode === "split") && (
          <div
            className={`${viewMode === "split" ? "w-1/2" : "w-full"} overflow-auto bg-gradient-to-br from-background to-muted/20`}
          >
            <div className="p-8 h-full">
              <MarkdownPreview content={value} />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-gradient-to-r from-muted/30 to-card">
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full" />
            Lines: {value.split("\n").length}
          </span>
          <span>Words: {value.split(/\s+/).filter((w) => w.length > 0).length}</span>
          <span>Characters: {value.length}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Markdown • Auto-save enabled</span>
        </div>
      </div>
    </Card>
  )
}
