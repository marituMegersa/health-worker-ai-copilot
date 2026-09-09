import { ingestionPipeline, GuidelineChunk } from '../document-processing/ingestionPipeline';

export interface RAGSearchQuery {
  queryText: string;
  categoryFilter?: string;
  minConfidenceThreshold?: number;
}

export interface RAGSearchResult {
  chunk: GuidelineChunk;
  relevanceScore: number;
  matchType: 'BM25_KEYWORD' | 'SEMANTIC_VECTOR' | 'HYBRID';
  citation: {
    guidelineTitle: string;
    publisher: string;
    version: string;
    section: string;
    pageNumber: number;
    confidenceScore: number;
  };
}

export class RAGEngine {
  search(query: RAGSearchQuery): RAGSearchResult[] {
    const activeChunks = ingestionPipeline.getActiveChunks();
    const queryTerms = query.queryText.toLowerCase().split(' ').filter(t => t.length > 2);

    const results: RAGSearchResult[] = [];

    activeChunks.forEach(chunk => {
      let matches = 0;
      queryTerms.forEach(term => {
        if (chunk.content.toLowerCase().includes(term) || chunk.heading.toLowerCase().includes(term)) {
          matches += 1;
        }
      });

      if (matches > 0) {
        const score = Math.min(0.99, 0.70 + matches * 0.1);
        results.push({
          chunk,
          relevanceScore: score,
          matchType: 'HYBRID',
          citation: {
            guidelineTitle: chunk.documentTitle,
            publisher: chunk.publisher,
            version: chunk.version,
            section: chunk.sectionId,
            pageNumber: chunk.pageNumber,
            confidenceScore: score
          }
        });
      }
    });

    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
}

export const ragEngine = new RAGEngine();
