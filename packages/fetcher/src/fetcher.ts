import { isLeft, toError } from 'fp-ts/lib/Either';
import fs from 'fs';
import spreadsheetApi from 'google-spreadsheet';
import path from 'path';

import { Codec, WallMounts, WallMountsCodec } from './entities';
/**
 * @param docId
 * Id of the document.
 *
 * @param apiKey
 * Google credentials.
 * https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=api-key
 *
 * @param hasOutput
 * Store the results in a json file on the ./out directory.
 */

export class Fetcher {
  // TODO: extend definition-file for google-spreadsheet (there's no @types/ file)
  // Would be interesting to grab a part of the official @types for spreadsheets and extend those with this library
  readonly doc: GoogleSpreadsheet;
  worksheetTitleIndex: WorksheetInfo[];

  constructor(
    docId: string,
    apiKey: string,
    private readonly hasOutput = false,
  ) {
    this.doc = new spreadsheetApi.GoogleSpreadsheet(docId);
    this.doc.useApiKey(apiKey);
  }

  // For debug/cache purposes
  private StoreObjAsJSON(route: string, obj: {}) {
    fs.writeFileSync(
      path.resolve(__dirname, `../out/${route}.json`),
      JSON.stringify(obj),
    );
  }

  async loadDoc() {
    try {
      await this.doc.loadInfo();
    } catch (e) {
      throw Error('Failed to load information of google-spreadsheet document');
    }

    this.worksheetTitleIndex = this.doc.sheetsByIndex.map(
      (sheet: GoogleSpreadsheetWorksheet) => {
        return {
          sheetId: sheet.sheetId,
          title: sheet.title.toLowerCase(),
        };
      },
    );

    if (this.hasOutput) {
      this.StoreObjAsJSON('worksheetsFound', this.worksheetTitleIndex);
    }
  }

  private async fetchRows<T>(title: string): Promise<T> {
    const index = this.worksheetTitleIndex.findIndex(
      (sheet) => sheet.title == title,
    );
    const sheet = this.doc.sheetsByIndex[index];
    await sheet.loadCells('B2:B5');
    // eslint-disable-next-line no-console
    // console.log(sheet.cellStats.value);
    const cell = sheet.getCellByA1('B3');

    // TODO: images from the cdn
    // eslint-disable-next-line no-console
    console.log(cell, cell.formula);
    return this.doc.sheetsByIndex[index].getRows();
  }

  private async fetchWorksheet<T>(title: string, codec: Codec): Promise<T> {
    const rows = await this.fetchRows<T>(title);

    const response = codec.decode(rows);
    if (isLeft(response)) throw toError(response.left);
    if (this.hasOutput) {
      this.StoreObjAsJSON(title, response.right);
    }
    return response.right;
  }

  fetchWallMounts() {
    return this.fetchWorksheet<WallMounts>('wall-mounted', WallMountsCodec);
  }
}
