import { useState } from "react";
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

  const [url, setUrl] = useState();

  const createPdf = () => {
    const pdfGenerator = pdfMake.createPdf();
    //console.log(pdfGenerator);
    pdfGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setUrl(url);
    });
  };

  const defaultColDef = {
    flex: 1,
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <button onClick={createPdf}>Export to PDF</button>
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
