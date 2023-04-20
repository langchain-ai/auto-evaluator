import JSON2CSVBase from './BaseParser.js';
import { flattenReducer, fastJoin } from './utils.js';

export default class JSON2CSVParser extends JSON2CSVBase {
  constructor(opts) {
    super(opts);
  }
  /**
   * Main function that converts json to csv.
   *
   * @param {Array|Object} data Array of JSON objects to be converted to CSV
   * @returns {String} The CSV formated data as a string
   */
  parse(data) {
    const preprocessedData = this.preprocessData(data);

    this.opts.fields =
      this.opts.fields ||
      this.preprocessFieldsInfo(
        preprocessedData.reduce((fields, item) => {
          Object.keys(item).forEach((field) => {
            if (!fields.includes(field)) {
              fields.push(field);
            }
          });

          return fields;
        }, [])
      );

    const header = this.opts.header ? this.getHeader() : '';
    const rows = this.processData(preprocessedData);
    const csv =
      (this.opts.withBOM ? '\ufeff' : '') +
      header +
      (header && rows ? this.opts.eol : '') +
      rows;

    return csv;
  }

  /**
   * Preprocess the data according to the give opts (unwind, flatten, etc.)
    and calculate the fields and field names if they are not provided.
   *
   * @param {Array|Object} data Array or object to be converted to CSV
   */
  preprocessData(data) {
    const processedData = Array.isArray(data) ? data : [data];

    if (
      !this.opts.fields &&
      (processedData.length === 0 || typeof processedData[0] !== 'object')
    ) {
      throw new Error(
        'Data should not be empty or the "fields" option should be included'
      );
    }

    if (this.opts.transforms.length === 0) return processedData;

    return processedData
      .map((row) => this.preprocessRow(row))
      .reduce(flattenReducer, []);
  }

  /**
   * Create the content row by row below the header
   *
   * @param {Array} data Array of JSON objects to be converted to CSV
   * @returns {String} CSV string (body)
   */
  processData(data) {
    return fastJoin(
      data.map((row) => this.processRow(row)).filter((row) => row), // Filter empty rows
      this.opts.eol
    );
  }
}
