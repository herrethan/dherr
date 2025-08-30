// Auto-generated Contentful types
// Generated on: 2025-08-30T15:45:16.999Z

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


export interface About {
  sys: ContentfulSys;
  fields: {
    title?: string;
    image?: ContentfulAsset;
    content?: RichText;
  };
}

export interface Work {
  sys: ContentfulSys;
  fields: {
    title?: string;
    items?: ContentfulAsset[];
  };
}

export interface HomePage {
  sys: ContentfulSys;
  fields: {
    title?: string;
    backgroundImage?: ContentfulAsset;
    latestHappenings?: LatestHappeningEntry[];
  };
}

export interface LatestHappeningEntry {
  sys: ContentfulSys;
  fields: {
    title?: string;
    content?: RichText;
  };
}
