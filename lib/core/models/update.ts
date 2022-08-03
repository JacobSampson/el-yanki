export interface Update {
  title: string;
  body: string;
  id: string;
  updateTimestamp: string;
  comments?: {
    updateId: string;
    body: string;
    isAdmin: boolean;
  }[];
}
