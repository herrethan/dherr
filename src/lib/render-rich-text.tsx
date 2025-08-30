import React from 'react';

// Rich text content types
export interface RichTextContent {
  content?: RichTextContent[];
  data: Record<string, unknown> | {
    target?: {
      fields?: {
        title?: string;
        file?: {
          url: string;
          details?: {
            size: number;
          };
          fileName: string;
          contentType: string;
        };
      };
    };
    uri?: string;
  };
  marks?: string[];
  value?: string;
  nodeType: 'text' | 'hyperlink' | 'asset-hyperlink' | 'paragraph' | 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4' | 'heading-5' | 'heading-6' | 'ordered-list' | 'unordered-list' | 'list-item' | 'blockquote' | 'hr' | 'table' | 'table-row' | 'table-cell' | 'embedded-asset-block' | 'embedded-entry-block' | 'embedded-entry-inline';
}

// Helper function to render rich text content
export function renderRichText(content: RichTextContent[], insideListItem: boolean = false): React.ReactNode {
  return content.map((node, index) => {
    switch (node.nodeType) {
      case 'text':
        // Handle line breaks by splitting on newlines and rendering each part
        if (node.value && node.value.includes('\n')) {
          const lines = node.value.split('\n');
          return (
            <span key={index}>
              {lines.map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                  {node.marks?.includes('bold') ? <strong>{line}</strong> : 
                   node.marks?.includes('italic') ? <em>{line}</em> : 
                   line}
                  {lineIndex < lines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </span>
          );
        }
        
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
            className="inline-flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            {node.content && renderRichText(node.content, insideListItem)}
          </a>
        );
      
      case 'asset-hyperlink':
        // Handle asset hyperlinks (like PDF files)
        const targetData = node.data as { target?: { fields?: { file?: { url: string }; title?: string } } };
        const assetUrl = targetData?.target?.fields?.file?.url;
        const assetTitle = targetData?.target?.fields?.title || 'Download';
        
        if (assetUrl) {
          const fullUrl = assetUrl.startsWith('//') ? `https:${assetUrl}` : assetUrl;
          const isCV = assetTitle === 'CV';
          
          return (
            <a 
              key={index}
              href={fullUrl}
              data-asset-hyperlink
              className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {isCV && (
                <svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="inline-block size-6">
                  <path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.75v1h1.62V5zm-.75 3h6.62v1H4.5zm.75 3h-.75v1h6.62V11z" clipRule="evenodd" fill="currentColor" fillRule="evenodd"/>
                </svg>
              )}
              {node.content && renderRichText(node.content, insideListItem)}
            </a>
          );
        }
        
        // Fallback if no URL found
        return (
          <span key={index} className="text-gray-500">
            {node.content && renderRichText(node.content, insideListItem)}
          </span>
        );
      
      case 'paragraph':
        // Don't wrap in <p> tags if we're inside a list item
        if (insideListItem) {
          return (
            <span key={index}>
              {node.content && renderRichText(node.content, insideListItem)}
            </span>
          );
        }
        return (
          <p key={index} className="mb-4">
            {node.content && renderRichText(node.content, insideListItem)}
          </p>
        );
      
      case 'heading-1':
        return (
          <h1 key={index} className="text-3xl font-bold mb-4">
            {node.content && renderRichText(node.content, insideListItem)}
          </h1>
        );
      
      case 'heading-2':
        return (
          <h2 key={index} className="text-2xl font-semibold mb-3">
            {node.content && renderRichText(node.content, insideListItem)}
          </h2>
        );
      
      case 'heading-3':
        return (
          <h3 key={index} className="text-xl font-medium mb-2">
            {node.content && renderRichText(node.content, insideListItem)}
          </h3>
        );
      
      case 'unordered-list':
        return (
          <ul key={index} className="list-disc list-inside mb-4">
            {node.content && renderRichText(node.content, insideListItem)}
          </ul>
        );
      
      case 'ordered-list':
        return (
          <ol key={index} className="list-decimal list-inside mb-4">
            {node.content && renderRichText(node.content, insideListItem)}
          </ol>
        );
      
      case 'list-item':
        return (
          <li key={index} className="mb-1">
            {node.content && renderRichText(node.content, true)}
          </li>
        );
      
      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic mb-4">
            {node.content && renderRichText(node.content, insideListItem)}
          </blockquote>
        );
      
      case 'hr':
        return (
          <hr key={index} className="my-8 border-gray-300 dark:border-gray-600" />
        );
      
      default:
        return node.content ? renderRichText(node.content, insideListItem) : null;
    }
  });
}
