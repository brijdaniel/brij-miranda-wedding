import { saveAs } from 'file-saver';
import Papa from 'papaparse';

/**
 * This is a generic CSV download button,
 * @param filename is the name of the downloaded CSV
 * @param items is the input data (array of JSON objects)
 * @param getRow is the function that transforms a row of data -> to a CSV row
 */
export function CSVDownloadButton<T>(props: {
  filename: string,
  items: T[],
  getRow: (item: T) => any
}) {
  const disabled = !props.items;

  const onClickBtn = () => {
    const mappedData = props.items.map(item => props.getRow(item));
    const csvString = Papa.unparse(mappedData, {
      delimiter: ','
    })
    const blob = new Blob([csvString], {type: "text/plain;charset=utf-8"});
    console.log({inputItems: props.items, mappedData, csvString, blob})
    saveAs(blob, `${props.filename}-(${mappedData.length} items).csv`);
  }

  return <button disabled={disabled} className="btn" onClick={onClickBtn}>
    <span>CSV Download</span>
  </button>;
};
