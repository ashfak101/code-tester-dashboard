"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Plus, Save, Eye, Upload, Download } from "lucide-react"

interface ProblemFormProps {
  problemData: any
  setProblemData: (data: any) => void
}

export function ProblemForm({ problemData, setProblemData }: ProblemFormProps) {
  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    if (newTag.trim() && !problemData.tags.includes(newTag.trim())) {
      setProblemData({
        ...problemData,
        tags: [...problemData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setProblemData({
      ...problemData,
      tags: problemData.tags.filter((tag: string) => tag !== tagToRemove),
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const exportProblem = () => {
    const dataStr = JSON.stringify(problemData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `${problemData.title.toLowerCase().replace(/\s+/g, "-")}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const importProblem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string)
          setProblemData(importedData)
        } catch (error) {
          console.error("Error parsing JSON file:", error)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Problem Details</h2>
            <p className="text-sm text-muted-foreground">Configure the basic information for your coding problem</p>
          </div>
          {/* <div className="flex gap-2">
            <input type="file" accept=".json" onChange={importProblem} className="hidden" id="import-file" />
            <Button variant="outline" size="sm" onClick={() => document.getElementById("import-file")?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm" onClick={exportProblem}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div> */}
        </div>

        <Separator />

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Problem Title *</Label>
              <Input
                id="title"
                value={problemData.title}
                onChange={(e) => setProblemData({ ...problemData, title: e.target.value })}
                placeholder="Enter problem title"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty Level *</Label>
              <Select
                value={problemData.difficulty}
                onValueChange={(value) => setProblemData({ ...problemData, difficulty: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Easy
                    </div>
                  </SelectItem>
                  <SelectItem value="Medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem value="Hard">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      Hard
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={problemData.category || ""}
                onValueChange={(value) => setProblemData({ ...problemData, category: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="algorithms">Algorithms</SelectItem>
                  <SelectItem value="data-structures">Data Structures</SelectItem>
                  <SelectItem value="dynamic-programming">Dynamic Programming</SelectItem>
                  <SelectItem value="graph-theory">Graph Theory</SelectItem>
                  <SelectItem value="string-manipulation">String Manipulation</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="greedy">Greedy</SelectItem>
                  <SelectItem value="backtracking">Backtracking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {problemData.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 hover:bg-destructive/20 rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a tag"
                  className="flex-1"
                />
                <Button onClick={addTag} size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="time-complexity">Expected Time Complexity</Label>
              <Input
                id="time-complexity"
                value={problemData.timeComplexity || ""}
                onChange={(e) => setProblemData({ ...problemData, timeComplexity: e.target.value })}
                placeholder="e.g., O(n log n)"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="space-complexity">Expected Space Complexity</Label>
              <Input
                id="space-complexity"
                value={problemData.spaceComplexity || ""}
                onChange={(e) => setProblemData({ ...problemData, spaceComplexity: e.target.value })}
                placeholder="e.g., O(1)"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Additional Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="hints">Hints (Optional)</Label>
            <Textarea
              id="hints"
              value={problemData.hints || ""}
              onChange={(e) => setProblemData({ ...problemData, hints: e.target.value })}
              placeholder="Provide hints to help users solve the problem (one hint per line)"
              className="mt-1 min-h-[100px]"
            />
          </div>

          <div>
            <Label htmlFor="follow-up">Follow-up Questions (Optional)</Label>
            <Textarea
              id="follow-up"
              value={problemData.followUp || ""}
              onChange={(e) => setProblemData({ ...problemData, followUp: e.target.value })}
              placeholder="Additional questions or variations of the problem"
              className="mt-1 min-h-[80px]"
            />
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline">Reset Form</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">
              <Eye className="h-4 w-4 mr-2" />
              Preview Problem
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
