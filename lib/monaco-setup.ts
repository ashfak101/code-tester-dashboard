import * as monaco from 'monaco-editor'

declare global {
    interface Window {
        MonacoEnvironment?: {
            getWorkerUrl: (moduleId: string, label: string) => string
        }
    }
}

// Define the Monaco Editor environment to handle workers
export function setupMonacoEnvironment () {
    if (typeof window === 'undefined') return // Prevent SSR error
    window.MonacoEnvironment = {
        getWorkerUrl: function (_, label) {
            if (label === 'json') {
                return '/_next/static/chunks/monaco/json.worker.js'
            }
            if (label === 'css' || label === 'scss' || label === 'less') {
                return '/_next/static/chunks/monaco/css.worker.js'
            }
            if (label === 'html' || label === 'handlebars' || label === 'razor') {
                return '/_next/static/chunks/monaco/html.worker.js'
            }
            if (label === 'typescript' || label === 'javascript') {
                return '/_next/static/chunks/monaco/ts.worker.js'
            }
            return '/_next/static/chunks/monaco/editor.worker.js'
        }
    }
}

// Initialize Monaco Editor
export function initMonaco () {
    if (typeof window !== 'undefined') {
        // Monaco will be initialized via the script in layout.tsx
        // This is an empty function to avoid errors when importing
    }
}
