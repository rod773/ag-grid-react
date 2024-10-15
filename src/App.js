import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  const getData = () => {
    var pdfData = [];

    var line = [];

    colDefs.forEach((item) => {
      line.push(item.field);
    });

    pdfData.push(line);

    rowData.forEach((item) => {
      var line = [];

      line.push(item.make);
      line.push(item.model);
      line.push(item.price);
      line.push(item.electric);

      pdfData.push(line);
    });

    return pdfData;
  };

  const [url, setUrl] = useState();

  var docDefinition = {
    content: [
      {
        layout: "lightHorizontalLines", // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ["*", "auto", 100, "*"],

          body: getData(),
        },
      },
    ],
  };

  const createPdf = () => {
    const pdfGenerator = pdfMake.createPdf(docDefinition);
    //console.log(pdfGenerator);
    pdfGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setUrl(url);
    });
  };

  const defaultColDef = {
    flex: 1,
  };

  useEffect(() => {
    console.dir(getData());
  }, []);
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <button onClick={createPdf}>Export to PDF</button>
        {url && (
          <a href={url} target="__blank">
            link
          </a>
        )}
        <div
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{
            height: "100%",
            width: "100%",
          }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </>
  );
}

export default App;
