import { saveAs } from 'file-saver';
import Papa from 'papaparse';

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
    saveAs(blob, `${props.filename}-(${mappedData.length} items).txt`);
  }

  return <button disabled={disabled} className="btn" onClick={onClickBtn}>
    <span>CSV Download</span>
  </button>;
};
