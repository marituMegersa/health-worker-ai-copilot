import { ETHIOPIAN_MOH_GUIDELINES, ClinicalGuidelineManifest } from '../../packages/clinical-content';

export interface GuidelineChunk {
  id: string;
  documentId: string;
  documentTitle: string;
  publisher: string;
  version: string;
  effectiveDate: string;
  sectionId: string;
  heading: string;
  pageNumber: number;
  content: string;
  status: 'active' | 'superseded' | 'archived';
  keywords: string[];
}

export class IngestionPipeline {
  private chunksStore: GuidelineChunk[] = [];

  constructor() {
    this.ingestManifests(ETHIOPIAN_MOH_GUIDELINES);
  }

  ingestManifests(guidelines: ClinicalGuidelineManifest[]) {
    guidelines.forEach(doc => {
      doc.sections.forEach(sec => {
        const chunk: GuidelineChunk = {
          id: `CHUNK-${doc.id}-${sec.sectionId}`,
          documentId: doc.id,
          documentTitle: doc.title,
          publisher: doc.publisher,
          version: doc.version,
          effectiveDate: doc.effectiveDate,
          sectionId: sec.sectionId,
          heading: sec.heading,
          pageNumber: sec.pageNumber,
          content: sec.text,
          status: doc.status === 'approved' ? 'active' : 'superseded',
          keywords: [
            ...doc.title.toLowerCase().split(' '),
            ...sec.heading.toLowerCase().split(' '),
            ...sec.text.toLowerCase().split(' ')
          ].filter(k => k.length > 3)
        };
        this.chunksStore.push(chunk);
      });
    });
  }

  getActiveChunks(): GuidelineChunk[] {
    return this.chunksStore.filter(c => c.status === 'active');
  }
}

export const ingestionPipeline = new IngestionPipeline();
