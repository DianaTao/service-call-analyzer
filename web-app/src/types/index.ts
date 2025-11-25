export interface Utterance {
  id: number;
  speaker: string;
  speakerLabel: string;
  text: string;
  start: number;
  end: number;
  startTime: string;
  endTime: string;
  confidence: number;
  sentiment?: string | null;
}

export interface Transcript {
  id: string;
  fullText: string;
  duration: string;
  utterances: Utterance[];
  speakersDetected: number;
  metadata: {
    transcribedAt: string;
    audioFile: string;
  };
}

export interface ComplianceItem {
  present: boolean;
  quality: 'excellent' | 'good' | 'fair' | 'poor' | 'missing';
  timestamp?: string;
  transcript?: string;
  commentary: string;
  score: number;
  utteranceId?: number;
  utteranceIds?: number[];
  questionCount?: number;
}

export interface UpsellAttempts {
  attempts: Array<{
    timestamp: string;
    utteranceId: number;
    transcript: string;
  }>;
  present: boolean;
  count: number;
  score: number;
  commentary: string;
}

export interface Compliance {
  introduction: ComplianceItem;
  problemDiagnosis: ComplianceItem;
  solutionExplanation: ComplianceItem;
  upsellAttempts: UpsellAttempts;
  maintenancePlanOffer: ComplianceItem;
  closing: ComplianceItem;
}

export interface SalesInsight {
  type: 'opportunity_taken' | 'opportunity_missed' | 'customer_signal';
  timestamp: string;
  category: string;
  description: string;
  transcript?: string;
  recommendation: string;
}

export interface Analysis {
  metadata: {
    callId: string;
    callType: string;
    duration: string;
    date: string;
    participants: string[];
    analyzedAt: string;
  };
  compliance: Compliance;
  scores: {
    individual: {
      [key: string]: number;
    };
    overall: number;
  };
  salesInsights: SalesInsight[];
  summary: string;
}

