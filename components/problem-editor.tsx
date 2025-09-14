'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(
  () => import('@/components/monaco-editor').then((mod) => mod.MonacoEditor),
  { ssr: false }
);

const EnhancedMarkdownEditor = dynamic(
  () =>
    import('@/components/enhanced-markdown-editor').then(
      (mod) => mod.EnhancedMarkdownEditor
    ),
  { ssr: false }
);

const CodeTester = dynamic(
  () => import('@/components/code-tester').then((mod) => mod.CodeTester),
  { ssr: false }
);

import { FileSidebar } from '@/components/file-sidebar';
import { ProblemForm } from '@/components/problem-form';
import {
  FileText,
  Code2,
  Play,
  Settings,
  TestTube,
  Save,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Lightbulb,
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  language: string;
  content: string;
  saved: boolean;
}

const steps = [
  {
    number: 1,
    key: 'details',
    label: 'Problem Details',
    icon: <ClipboardList className='h-5 w-5' />,
    description: 'Define problem information and metadata',
  },
  {
    number: 2,
    key: 'description',
    label: 'Description',
    icon: <FileText className='h-5 w-5' />,
    description: 'Create the problem description with examples',
  },
  {
    number: 3,
    key: 'solution',
    label: 'Solution Files',
    icon: <Code2 className='h-5 w-5' />,
    description: 'Create and edit solution files',
  },
  {
    number: 4,
    key: 'tests',
    label: 'Test Cases',
    icon: <Play className='h-5 w-5' />,
    description: 'Define test cases for the problem',
  },
  {
    number: 5,
    key: 'testing',
    label: 'Testing & Debugging',
    icon: <TestTube className='h-5 w-5' />,
    description: 'Test and debug your solutions',
  },
  {
    number: 6,
    key: 'settings',
    label: 'Settings',
    icon: <Settings className='h-5 w-5' />,
    description: 'Configure problem settings and options',
  },
];

export function ProblemEditor() {
  const [problemData, setProblemData] = useState({
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'algorithms',
    tags: ['Array', 'Hash Table'],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    hints:
      "Try using a hash map to store the numbers you've seen.\nFor each number, check if its complement exists in the hash map.",
    followUp: 'Can you solve this in one pass?\nWhat if the array is sorted?',
    description: `# Two Sum

Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly* one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

## Example 1:
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

## Example 2:
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

## Constraints:
- \`2 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
- **Only one valid answer exists.**`,
    testCases: `// Test Case 1
Input: nums = [2,7,11,15], target = 9
Expected Output: [0,1]

// Test Case 2
Input: nums = [3,2,4], target = 6
Expected Output: [1,2]`,
  });

  const [solutionFiles, setSolutionFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'solution.js',
      language: 'javascript',
      content: `function twoSum(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (map.has(complement)) {
            return [map.get(complement), i];
        }

        map.set(nums[i], i);
    }

    return [];
}

// Time Complexity: O(n)
// Space Complexity: O(n)`,
      saved: true,
    },
    {
      id: '2',
      name: 'solution.py',
      language: 'python',
      content: `def twoSum(nums, target):
    num_map = {}

    for i, num in enumerate(nums):
        complement = target - num

        if complement in num_map:
            return [num_map[complement], i]

        num_map[num] = i

    return []

# Time Complexity: O(n)
# Space Complexity: O(n)`,
      saved: true,
    },
    {
      id: '3',
      name: 'solution.java',
      language: 'java',
      content: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }

            map.put(nums[i], i);
        }

        return new int[] {};
    }
}

// Time Complexity: O(n)
// Space Complexity: O(n)`,
      saved: false,
    },
  ]);

  const [activeFileId, setActiveFileId] = useState('1');
  const [currentStep, setCurrentStep] = useState(0);

  const activeFile = solutionFiles.find((f) => f.id === activeFileId);
  const activeStep = steps[currentStep].key;

  const handleFileCreate = (name: string, language: string) => {
    const newFile: FileItem = {
      id: Date.now().toString(),
      name,
      language,
      content: `// New ${language} solution\n\n`,
      saved: false,
    };
    setSolutionFiles([...solutionFiles, newFile]);
    setActiveFileId(newFile.id);
  };

  const handleFileDelete = (fileId: string) => {
    setSolutionFiles((files) => files.filter((f) => f.id !== fileId));
    if (activeFileId === fileId && solutionFiles.length > 1) {
      setActiveFileId(solutionFiles.find((f) => f.id !== fileId)?.id || '');
    }
  };

  const handleFileSave = (fileId: string) => {
    setSolutionFiles((files) =>
      files.map((f) => (f.id === fileId ? { ...f, saved: true } : f))
    );
  };

  const handleFileContentChange = (content: string) => {
    setSolutionFiles((files) =>
      files.map((f) =>
        f.id === activeFileId ? { ...f, content, saved: false } : f
      )
    );
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className='space-y-6'>
      {/* Step Navigator */}
      <div className='flex flex-col space-y-6'>
        <div className='grid grid-cols-6 gap-2'>
          {steps.map((step, idx) => (
            <button
              key={step.key}
              onClick={() => setCurrentStep(idx)}
              className={`relative flex flex-col items-center p-3 rounded-lg border transition-all ${
                currentStep === idx
                  ? 'border-primary bg-primary/10 text-primary'
                  : idx < currentStep
                  ? 'border-muted bg-muted/50 text-muted-foreground'
                  : 'border-muted bg-background text-muted-foreground'
              }`}>
              <div className='absolute -top-3 -left-1 flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-xs font-bold'>
                {step.number}
              </div>
              <div className='mt-2'>{step.icon}</div>
              <div className='text-xs font-medium mt-2'>{step.label}</div>
            </button>
          ))}
        </div>

        <Card className='p-4'>
          <div className='flex items-center mb-4'>
            <div className='flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-3'>
              {steps[currentStep].number}
            </div>
            <div>
              <h2 className='text-xl font-semibold'>
                {steps[currentStep].label}
              </h2>
              <p className='text-muted-foreground text-sm'>
                {steps[currentStep].description}
              </p>
            </div>
          </div>

          {/* Step Content */}
          <div className='pt-4'>
            {activeStep === 'details' && (
              <div className='space-y-6'>
                <ProblemForm
                  problemData={problemData}
                  setProblemData={setProblemData}
                />

                {/* Hints & Tips Section */}
                <Card className='p-4 border-dashed'>
                  <div className='flex items-start gap-3'>
                    <Lightbulb className='h-5 w-5 text-yellow-500 mt-0.5' />
                    <div>
                      <h3 className='font-medium mb-1'>
                        Tips for Problem Details
                      </h3>
                      <ul className='text-sm space-y-1 text-muted-foreground list-disc pl-4'>
                        <li>Choose a clear and descriptive title</li>
                        <li>Set an appropriate difficulty level</li>
                        <li>Add relevant tags to help with searchability</li>
                        <li>
                          Specify accurate time and space complexity
                          requirements
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeStep === 'description' && (
              <EnhancedMarkdownEditor
                value={problemData.description}
                onChange={(value) =>
                  setProblemData({ ...problemData, description: value })
                }
                height='600px'
              />
            )}

            {activeStep === 'solution' && (
              <div className='flex gap-4 h-[700px]'>
                <FileSidebar
                  files={solutionFiles}
                  activeFileId={activeFileId}
                  onFileSelect={setActiveFileId}
                  onFileCreate={handleFileCreate}
                  onFileDelete={handleFileDelete}
                  onFileSave={handleFileSave}
                  onFileRename={(id, name) => {
                    setSolutionFiles((files) =>
                      files.map((f) => (f.id === id ? { ...f, name } : f))
                    );
                  }}
                />

                <Card className='flex-1 flex flex-col'>
                  <div className='flex items-center justify-between p-4 border-b border-border'>
                    <div className='flex items-center gap-2'>
                      <span className='font-semibold'>{activeFile?.name}</span>
                      {activeFile && !activeFile.saved && (
                        <div className='w-2 h-2 bg-orange-500 rounded-full' />
                      )}
                    </div>
                    <div className='flex gap-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleFileSave(activeFileId)}>
                        <Save className='h-4 w-4 mr-2' />
                        Save
                      </Button>
                      <Button size='sm' variant='outline'>
                        <Play className='h-4 w-4 mr-2' />
                        Run
                      </Button>
                    </div>
                  </div>

                  <div className='flex-1'>
                    {activeFile && (
                      <MonacoEditor
                        value={activeFile.content}
                        onChange={handleFileContentChange}
                        language={activeFile.language}
                        height='100%'
                        theme='vs-dark'
                        options={{
                          fontSize: 14,
                          fontFamily:
                            "'JetBrains Mono', 'Fira Code', monospace",
                          lineHeight: 1.6,
                          minimap: { enabled: true },
                          scrollBeyondLastLine: false,
                          wordWrap: 'on',
                        }}
                      />
                    )}
                  </div>
                </Card>
              </div>
            )}

            {activeStep === 'tests' && (
              <Card className='p-4'>
                <div className='flex items-center justify-between mb-4'>
                  <span className='font-semibold'>Test Cases</span>
                  <Button size='sm' variant='outline'>
                    <Play className='h-4 w-4 mr-2' />
                    Validate Tests
                  </Button>
                </div>
                <MonacoEditor
                  value={problemData.testCases}
                  onChange={(value) =>
                    setProblemData({ ...problemData, testCases: value })
                  }
                  language='javascript'
                  height='400px'
                  theme='vs-dark'
                />
              </Card>
            )}

            {activeStep === 'testing' && <CodeTester />}

            {activeStep === 'settings' && (
              <Card className='p-6'>
                <div className='space-y-6'>
                  <div>
                    <h3 className='text-lg font-semibold mb-4'>
                      Problem Configuration
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium mb-1'>
                          Time Limit
                        </label>
                        <select className='w-full h-9 px-3 rounded border bg-background'>
                          <option value='2'>2 seconds</option>
                          <option value='5'>5 seconds</option>
                          <option value='10'>10 seconds</option>
                        </select>
                      </div>
                      <div>
                        <label className='block text-sm font-medium mb-1'>
                          Memory Limit
                        </label>
                        <select className='w-full h-9 px-3 rounded border bg-background'>
                          <option value='256'>256 MB</option>
                          <option value='512'>512 MB</option>
                          <option value='1024'>1024 MB</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Card>
      </div>

      {/* Step Navigation Controls */}
      <div className='flex justify-between mt-6'>
        <Button
          variant='outline'
          onClick={goToPreviousStep}
          disabled={currentStep === 0}
          className='w-32'>
          <ChevronLeft className='h-4 w-4 mr-2' />
          Previous
        </Button>

        <div className='text-center text-sm text-muted-foreground'>
          Step {currentStep + 1} of {steps.length}
        </div>

        <Button
          variant={currentStep === steps.length - 1 ? 'default' : 'outline'}
          onClick={goToNextStep}
          disabled={currentStep === steps.length - 1}
          className='w-32'>
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          {currentStep !== steps.length - 1 && (
            <ChevronRight className='h-4 w-4 ml-2' />
          )}
        </Button>
      </div>
    </div>
  );
}
