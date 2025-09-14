'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Copy,
  Archive,
} from 'lucide-react';
import Link from 'next/link';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags: string[];
  status: 'Draft' | 'Published' | 'Archived';
  createdAt: string;
  lastModified: string;
  submissions: number;
  acceptanceRate: number;
}

const mockProblems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'algorithms',
    tags: ['Array', 'Hash Table'],
    status: 'Published',
    createdAt: '2024-01-15',
    lastModified: '2024-01-20',
    submissions: 1250,
    acceptanceRate: 85.2,
  },
  {
    id: '2',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    category: 'algorithms',
    tags: ['Linked List', 'Math'],
    status: 'Published',
    createdAt: '2024-01-10',
    lastModified: '2024-01-18',
    submissions: 890,
    acceptanceRate: 72.4,
  },
  {
    id: '3',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'algorithms',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    status: 'Draft',
    createdAt: '2024-01-22',
    lastModified: '2024-01-22',
    submissions: 0,
    acceptanceRate: 0,
  },
  {
    id: '4',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'algorithms',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    status: 'Published',
    createdAt: '2024-01-05',
    lastModified: '2024-01-15',
    submissions: 456,
    acceptanceRate: 34.8,
  },
  {
    id: '5',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'data-structures',
    tags: ['String', 'Stack'],
    status: 'Archived',
    createdAt: '2023-12-20',
    lastModified: '2024-01-10',
    submissions: 2100,
    acceptanceRate: 91.5,
  },
];

export function ProblemList() {
  const [problems, setProblems] = useState<Problem[]>(mockProblems);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesDifficulty =
      difficultyFilter === 'all' || problem.difficulty === difficultyFilter;
    const matchesStatus =
      statusFilter === 'all' || problem.status === statusFilter;

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'Archived':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className='space-y-6'>
      <Card className='p-6'>
        <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6'>
          <div>
            <h2 className='text-2xl font-bold text-foreground'>
              Problem Management
            </h2>
            <p className='text-muted-foreground'>
              Manage your coding problems and track their performance
            </p>
          </div>
          <Link href={'/create'} className='cursor-pointer'>

            <Button className='flex items-center cursor-pointer'>
              <Edit className='h-4 w-4 mr-2 cursor-pointer' />
              Create New Problem
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className='flex flex-col sm:flex-row gap-4 mb-6'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
            <Input
              placeholder='Search problems by title or tags...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className='w-full sm:w-40'>
              <Filter className='h-4 w-4 mr-2' />
              <SelectValue placeholder='Difficulty' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Difficulties</SelectItem>
              <SelectItem value='Easy'>Easy</SelectItem>
              <SelectItem value='Medium'>Medium</SelectItem>
              <SelectItem value='Hard'>Hard</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className='w-full sm:w-32'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Status</SelectItem>
              <SelectItem value='Published'>Published</SelectItem>
              <SelectItem value='Draft'>Draft</SelectItem>
              <SelectItem value='Archived'>Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Problems Table */}
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Problem</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Acceptance Rate</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className='w-12'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProblems.map((problem) => (
                <TableRow key={problem.id}>
                  <TableCell>
                    <div>
                      <div className='font-medium text-foreground'>
                        {problem.title}
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        ID: {problem.id}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(problem.status)}>
                      {problem.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-wrap gap-1'>
                      {problem.tags.slice(0, 2).map((tag, index) => (
                        <Badge
                          key={index}
                          variant='outline'
                          className='text-xs'>
                          {tag}
                        </Badge>
                      ))}
                      {problem.tags.length > 2 && (
                        <Badge variant='outline' className='text-xs'>
                          +{problem.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{problem.submissions.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <span>{problem.acceptanceRate}%</span>
                      <div className='w-16 h-2 bg-muted rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-primary rounded-full'
                          style={{ width: `${problem.acceptanceRate}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='text-sm text-muted-foreground'>
                    {new Date(problem.lastModified).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='sm'>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem>
                          <Eye className='h-4 w-4 mr-2' />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className='h-4 w-4 mr-2' />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className='h-4 w-4 mr-2' />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className='h-4 w-4 mr-2' />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className='text-destructive'>
                          <Trash2 className='h-4 w-4 mr-2' />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredProblems.length === 0 && (
          <div className='text-center py-8'>
            <p className='text-muted-foreground'>
              No problems found matching your criteria.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
