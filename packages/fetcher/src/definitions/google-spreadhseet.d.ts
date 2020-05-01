declare module 'google-spreadsheet';

declare interface GoogleSpreadsheet {
  spreadsheetId: string;
  title: string;
  locale: string;
  timeZone: string;
  sheetsByIndex: [GoogleSpreadsheetWorksheet];
  sheetsById: any;
  sheetCount: number;

  useApiKey(key: string): void;
  loadInfo(): Promise<void>;
}

declare interface GoogleSpreadsheetWorksheet {
  sheetId: string;
  title: string;
  index: number;

  rowCount: number;
  columnCount: number;
  cellStats: any;

  loadCells(filters: any): Promise<any>;
  getCell(rowIndex: number, columnIndex: number): any;
  getCellByA1(a1Address: string): any;
  getRows<T>(options?: { offset: number; limit: number }): Promise<T>;
}

declare interface WorksheetInfo {
  sheetId: string;
  title: string;
}
