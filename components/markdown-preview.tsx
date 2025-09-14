"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownPreviewProps {
  content: string
  className?: string
}

export function MarkdownPreview({ content, className = "" }: MarkdownPreviewProps) {
  return (
    <div className={`max-w-none ${className}`}>
      <style jsx global>{`
        .markdown-content {
          color: #0f172a !important;
        }
        .markdown-content *:not(a):not(code) {
          color: #0f172a !important;
        }
        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3,
        .markdown-content h4,
        .markdown-content h5,
        .markdown-content h6 {
          color: #0f172a !important;
          font-weight: 700 !important;
        }
        .markdown-content p,
        .markdown-content span,
        .markdown-content div,
        .markdown-content li,
        .markdown-content td,
        .markdown-content th,
        .markdown-content text {
          color: #0f172a !important;
        }
        .markdown-content strong,
        .markdown-content b {
          color: #0f172a !important;
          font-weight: 700 !important;
        }
        .markdown-content em,
        .markdown-content i {
          color: #0f172a !important;
        }
        .markdown-content code:not(pre code) {
          background-color: #e2e8f0 !important;
          color: #0f172a !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
          font-size: 0.875rem !important;
          font-weight: 600 !important;
        }
        .markdown-content pre {
          background-color: #0f172a !important;
          color: #f1f5f9 !important;
          padding: 16px !important;
          border-radius: 8px !important;
          overflow-x: auto !important;
          margin: 16px 0 !important;
        }
        .markdown-content pre code {
          background-color: transparent !important;
          color: #f1f5f9 !important;
          padding: 0 !important;
        }
        .markdown-content blockquote {
          color: #1e293b !important;
          border-left: 4px solid #059669 !important;
          padding-left: 16px !important;
          margin: 16px 0 !important;
          background-color: #f1f5f9 !important;
          padding: 12px 16px !important;
          border-radius: 0 8px 8px 0 !important;
        }
        .markdown-content blockquote * {
          color: #1e293b !important;
        }
        .markdown-content a {
          color: #059669 !important;
          text-decoration: underline !important;
          font-weight: 600 !important;
        }
        .markdown-content a:hover {
          color: #047857 !important;
        }
        
        /* Dark mode styles */
        .dark .markdown-content {
          color: #f8fafc !important;
        }
        .dark .markdown-content *:not(a):not(code) {
          color: #f8fafc !important;
        }
        .dark .markdown-content h1,
        .dark .markdown-content h2,
        .dark .markdown-content h3,
        .dark .markdown-content h4,
        .dark .markdown-content h5,
        .dark .markdown-content h6 {
          color: #ffffff !important;
        }
        .dark .markdown-content p,
        .dark .markdown-content span,
        .dark .markdown-content div,
        .dark .markdown-content li,
        .dark .markdown-content td,
        .dark .markdown-content th,
        .dark .markdown-content text {
          color: #f8fafc !important;
        }
        .dark .markdown-content strong,
        .dark .markdown-content b {
          color: #ffffff !important;
        }
        .dark .markdown-content code:not(pre code) {
          background-color: #374151 !important;
          color: #f8fafc !important;
        }
        .dark .markdown-content blockquote {
          color: #e5e7eb !important;
          background-color: #1e293b !important;
        }
        .dark .markdown-content blockquote * {
          color: #e5e7eb !important;
        }
        .dark .markdown-content a {
          color: #10b981 !important;
        }
        .dark .markdown-content a:hover {
          color: #34d399 !important;
        }
      `}</style>

      <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "")
              return !inline && match ? (
                <pre className="code-block">
                  <code className={`language-${match[1]} font-mono text-sm`} {...props}>
                    {String(children).replace(/\n$/, "")}
                  </code>
                </pre>
              ) : (
                <code className="inline-code font-mono" {...props}>
                  {children}
                </code>
              )
            },
            h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 pb-3 border-b border-border">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-semibold mb-4 mt-8">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-semibold mb-3 mt-6">{children}</h3>,
            p: ({ children }) => <p className="mb-4 leading-relaxed text-base">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 ml-4">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">{children}</ol>,
            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
            blockquote: ({ children }) => <blockquote className="quote-block">{children}</blockquote>,
            table: ({ children }) => (
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border border-border rounded-lg overflow-hidden">{children}</table>
              </div>
            ),
            thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
            th: ({ children }) => (
              <th className="border border-border px-4 py-3 text-left font-semibold">{children}</th>
            ),
            td: ({ children }) => <td className="border border-border px-4 py-3">{children}</td>,
            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            a: ({ href, children }) => (
              <a href={href} className="link-style" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
