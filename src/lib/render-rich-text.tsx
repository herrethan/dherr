import React from 'react';

// Rich text content types
export interface RichTextContent {
  content?: RichTextContent[];
  data: Record<string, unknown>;
  marks?: string[];
  value?: string;
  nodeType: 'text' | 'hyperlink' | 'paragraph' | 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4' | 'heading-5' | 'heading-6' | 'ordered-list' | 'unordered-list' | 'list-item' | 'blockquote' | 'hr' | 'table' | 'table-row' | 'table-cell' | 'embedded-asset-block' | 'embedded-entry-block' | 'embedded-entry-inline';
}

// Helper function to render rich text content
export function renderRichText(content: RichTextContent[]): React.ReactNode {
  return content.map((node, index) => {
    switch (node.nodeType) {
      case 'text':
        return (
          <span key={index}>
            {node.marks?.includes('bold') ? <strong>{node.value}</strong> : 
             node.marks?.includes('italic') ? <em>{node.value}</em> : 
             node.value}
          </span>
        );
      
      case 'hyperlink':
        return (
          <a 
            key={index}
            href={typeof node.data?.uri === 'string' ? node.data.uri : '#'} 
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {node.content && renderRichText(node.content)}
          </a>
        );
      
      case 'paragraph':
        return (
          <p key={index}>
            {node.content && renderRichText(node.content)}
          </p>
        );
      
      case 'heading-1':
        return (
          <h1 key={index} className="text-3xl font-bold mb-4">
            {node.content && renderRichText(node.content)}
          </h1>
        );
      
      case 'heading-2':
        return (
          <h2 key={index} className="text-2xl font-semibold mb-3">
            {node.content && renderRichText(node.content)}
          </h2>
        );
      
      case 'heading-3':
        return (
          <h3 key={index} className="text-xl font-medium mb-2">
            {node.content && renderRichText(node.content)}
          </h3>
        );
      
      case 'unordered-list':
        return (
          <ul key={index} className="list-disc list-inside mb-4">
            {node.content && renderRichText(node.content)}
          </ul>
        );
      
      case 'ordered-list':
        return (
          <ol key={index} className="list-decimal list-inside mb-4">
            {node.content && renderRichText(node.content)}
          </ol>
        );
      
      case 'list-item':
        return (
          <li key={index} className="mb-1">
            {node.content && renderRichText(node.content)}
          </li>
        );
      
      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic mb-4">
            {node.content && renderRichText(node.content)}
          </blockquote>
        );
      
      default:
        return node.content ? renderRichText(node.content) : null;
    }
  });
}
