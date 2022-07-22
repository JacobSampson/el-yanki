export interface Report {
  uid: string;
  title: string;
  reportNumber: number;
  summary: string;
  isLocked: boolean;
  updateTimestamp: string;
  cover?: string;
}
