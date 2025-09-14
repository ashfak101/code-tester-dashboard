"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MonacoEditor } from "@/components/monaco-editor"
import { Play, CheckCircle, XCircle, Clock, AlertCircle, RotateCcw } from "lucide-react"

interface TestResult {
  id: number
  input: string
  expectedOutput: string
  actualOutput: string
  status: "passed" | "failed" | "error" | "timeout"
  executionTime: number
  memoryUsed: number
}

export function CodeTester() {
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [customInput, setCustomInput] = useState("")
  const [customOutput, setCustomOutput] = useState("")

  const mockTestResults: TestResult[] = [
    {
      id: 1,
      input: "nums = [2,7,11,15], target = 9",
      expectedOutput: "[0,1]",
      actualOutput: "[0,1]",
      status: "passed",
      executionTime: 12,
      memoryUsed: 14.2,
    },
    {
      id: 2,
      input: "nums = [3,2,4], target = 6",
      expectedOutput: "[1,2]",
      actualOutput: "[1,2]",
      status: "passed",
      executionTime: 8,
      memoryUsed: 13.8,
    },
    {
      id: 3,
      input: "nums = [3,3], target = 6",
      expectedOutput: "[0,1]",
      actualOutput: "[0,1]",
      status: "passed",
      executionTime: 6,
      memoryUsed: 13.5,
    },
    {
      id: 4,
      input: "nums = [1,2,3,4,5], target = 9",
      expectedOutput: "[3,4]",
      actualOutput: "[3,4]",
      status: "passed",
      executionTime: 15,
      memoryUsed: 14.8,
    },
    {
      id: 5,
      input: "nums = [], target = 0",
      expectedOutput: "[]",
      actualOutput: "Error: Array cannot be empty",
      status: "error",
      executionTime: 0,
      memoryUsed: 0,
    },
  ]

  const runTests = async () => {
    setIsRunning(true)
    // Simulate test execution
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setTestResults(mockTestResults)
    setIsRunning(false)
  }

  const runCustomTest = async () => {
    setIsRunning(true)
    // Simulate custom test execution
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setCustomOutput(`Output for input: ${customInput}\nResult: [0,1]\nExecution time: 10ms`)
    setIsRunning(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case "timeout":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "error":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "timeout":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const passedTests = testResults.filter((test) => test.status === "passed").length
  const totalTests = testResults.length

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Code Testing</h2>
            <p className="text-sm text-muted-foreground">Test your solution against predefined test cases</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setTestResults([])}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={runTests} disabled={isRunning}>
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? "Running..." : "Run All Tests"}
            </Button>
          </div>
        </div>

        {testResults.length > 0 && (
          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold">
                  {passedTests}/{totalTests} Tests Passed
                </div>
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${(passedTests / totalTests) * 100}%` }}
                  />
                </div>
              </div>
              <Badge className={passedTests === totalTests ? getStatusColor("passed") : getStatusColor("failed")}>
                {passedTests === totalTests ? "All Passed" : "Some Failed"}
              </Badge>
            </div>
          </div>
        )}

        <Tabs defaultValue="predefined" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="predefined">Predefined Tests</TabsTrigger>
            <TabsTrigger value="custom">Custom Test</TabsTrigger>
          </TabsList>

          <TabsContent value="predefined" className="space-y-4">
            {testResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Play className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Click "Run All Tests" to execute the predefined test cases</p>
              </div>
            ) : (
              <div className="space-y-3">
                {testResults.map((result) => (
                  <Card key={result.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(result.status)}
                        <span className="font-medium">Test Case {result.id}</span>
                        <Badge className={getStatusColor(result.status)}>{result.status.toUpperCase()}</Badge>
                      </div>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{result.executionTime}ms</span>
                        <span>{result.memoryUsed}MB</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <Label className="text-xs font-semibold text-muted-foreground">INPUT</Label>
                        <div className="mt-1 p-2 bg-muted rounded font-mono text-xs">{result.input}</div>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-muted-foreground">EXPECTED</Label>
                        <div className="mt-1 p-2 bg-muted rounded font-mono text-xs">{result.expectedOutput}</div>
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-muted-foreground">ACTUAL</Label>
                        <div
                          className={`mt-1 p-2 rounded font-mono text-xs ${
                            result.status === "passed"
                              ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                              : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                          }`}
                        >
                          {result.actualOutput}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-sm font-semibold">Custom Input</Label>
                  <Button size="sm" onClick={runCustomTest} disabled={isRunning}>
                    <Play className="h-4 w-4 mr-2" />
                    {isRunning ? "Running..." : "Run Test"}
                  </Button>
                </div>
                <MonacoEditor
                  value={customInput}
                  onChange={setCustomInput}
                  language="javascript"
                  height="300px"
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    lineNumbers: "off",
                    folding: false,
                  }}
                />
              </Card>

              <Card className="p-4">
                <Label className="text-sm font-semibold mb-4 block">Output</Label>
                <div className="h-[300px] p-3 bg-muted rounded border font-mono text-sm overflow-auto">
                  {customOutput || "Run a custom test to see the output here..."}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
