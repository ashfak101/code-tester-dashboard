'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import * as monaco from 'monaco-editor';
import { initMonaco } from '@/lib/monaco-setup';

// Initialize Monaco once
if (typeof window !== 'undefined') {
  initMonaco();
}

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  theme?: 'vs' | 'vs-dark' | 'hc-black';
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
}

export function MonacoEditor({
  value,
  onChange,
  language = 'javascript',
  height = '400px',
  theme = 'vs-dark',
  options = {},
}: MonacoEditorProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  const valueRef = useRef<string>(value);

  // Update valueRef when value prop changes
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      if (editorRef.current) {
        try {
          editorRef.current.layout();
        } catch (error) {
          console.debug('[v0] Monaco layout error suppressed:', error);
        }
      }
    }, 100);
  }, []);

  // Add resize event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [handleResize]);

  // Create editor only once and preserve instance
  useEffect(() => {
    if (!containerRef.current || editorRef.current) return;

    try {
      // Create editor with initial options
      editorRef.current = monaco.editor.create(containerRef.current, {
        value: valueRef.current,
        language,
        theme,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        fontSize: 14,
        minimap: { enabled: true },
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        readOnly: false,
        ...options,
      });

      // Make sure editor is focused
      setTimeout(() => {
        editorRef.current?.focus();
      }, 100);
    } catch (err) {
      console.error('Failed to create Monaco editor:', err);
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, []); // Only run on mount

  // Set up model change listener separately
  useEffect(() => {
    if (!editorRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const subscription = model.onDidChangeContent(() => {
      const newValue = editorRef.current?.getValue();
      if (newValue !== undefined && newValue !== valueRef.current) {
        onChange(newValue);
      }
    });

    return () => {
      subscription.dispose();
    };
  }, [onChange]);

  // Update editor options when they change
  useEffect(() => {
    if (!editorRef.current) return;

    editorRef.current.updateOptions({
      ...options,
      language,
      theme,
    });
  }, [language, theme, options]);

  // Update editor value when prop changes (but only if different)
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getValue()) {
      // Preserve cursor position when updating
      const position = editorRef.current.getPosition();
      editorRef.current.setValue(value);
      if (position) {
        editorRef.current.setPosition(position);
      }
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height }}
      className='monaco-editor-container'
      onClick={() => editorRef.current?.focus()}
    />
  );
}
