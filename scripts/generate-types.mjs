import 'dotenv/config';
import { createClient } from 'contentful';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

async function generateTypes() {
  try {
    // Fetch content types
    const response = await client.getContentTypes();
    
    let typesContent = `// Auto-generated Contentful types
// Generated on: ${new Date().toISOString()}

import { RichTextContent } from '@/lib/render-rich-text';

export interface ContentfulSys {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  contentType: {
    sys: {
      type: string;
      linkType: string;
      id: string;
    };
  };
}

export interface ContentfulAsset {
  sys: ContentfulSys;
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface RichText {
  content: RichTextContent[];
  data: Record<string, unknown>;
  nodeType: string;
}

`;

    // Generate types for each content type
    response.items.forEach(contentType => {
      const typeName = contentType.sys.id.charAt(0).toUpperCase() + contentType.sys.id.slice(1);
      typesContent += `\nexport interface ${typeName} {
  sys: ContentfulSys;
  fields: {
`;

      contentType.fields.forEach(field => {
        const fieldName = field.id;
        let fieldType = 'unknown';
        

        
        switch (field.type) {
          case 'Symbol':
            fieldType = 'string';
            break;
          case 'Text':
            fieldType = 'string';
            break;
          case 'RichText':
            fieldType = 'RichText';
            break;
          case 'Number':
            fieldType = 'number';
            break;
          case 'Boolean':
            fieldType = 'boolean';
            break;
          case 'Date':
            fieldType = 'string';
            break;
          case 'Location':
            fieldType = '{ lat: number; lon: number }';
            break;
          case 'Object':
            fieldType = 'Record<string, unknown>';
            break;
          case 'Array':
            if (field.items?.type === 'Symbol') {
              fieldType = 'string[]';
            } else if (field.items?.type === 'Link') {
              // Try to determine the content type for linked entries
              if (field.items?.linkType === 'Entry' && field.items?.validations?.[0]?.linkContentType) {
                const contentType = field.items.validations[0].linkContentType;
                if (typeof contentType === 'string') {
                  const typeName = contentType.charAt(0).toUpperCase() + contentType.slice(1);
                  fieldType = `${typeName}[]`;
                } else if (Array.isArray(contentType)) {
                  // Handle multiple content types
                  const typeNames = contentType.map(ct => {
                    if (typeof ct === 'string') {
                      return ct.charAt(0).toUpperCase() + ct.slice(1);
                    }
                    return 'ContentfulSys';
                  });
                  fieldType = typeNames.join(' | ') + '[]';
                } else {
                  fieldType = 'ContentfulSys[]';
                }
              } else if (field.items?.linkType === 'Asset') {
                fieldType = 'ContentfulAsset[]';
              } else {
                fieldType = 'ContentfulSys[]';
              }
            } else {
              fieldType = 'unknown[]';
            }
            break;
          case 'Link':
            if (field.linkType === 'Asset') {
              fieldType = 'ContentfulAsset';
            } else if (field.linkType === 'Entry' && field.validations?.[0]?.linkContentType) {
              const contentType = field.validations[0].linkContentType;
              if (typeof contentType === 'string') {
                const typeName = contentType.charAt(0).toUpperCase() + contentType.slice(1);
                fieldType = typeName;
              } else {
                fieldType = 'ContentfulSys';
              }
            } else {
              fieldType = 'ContentfulSys';
            }
            break;
          default:
            fieldType = 'unknown';
        }
        
        const optional = field.required ? '' : '?';
        typesContent += `    ${fieldName}${optional}: ${fieldType};\n`;
      });

      typesContent += `  };
}\n`;
    });

    // Write to file
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const outputPath = path.join(__dirname, '..', 'src', 'types', 'contentful.ts');
    fs.writeFileSync(outputPath, typesContent);
    
    console.log(`✅ Generated types for ${response.items.length} content types`);
    console.log(`📁 Output: ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Error generating types:', error.message);
    process.exit(1);
  }
}

generateTypes();
