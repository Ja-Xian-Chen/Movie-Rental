import jsPDF from "jspdf";
import Axios from "axios";
import html2canvas from "html2canvas";
import React, { useState, useEffect } from "react";

export default function Reports() {
  const [reportList, setReportList] = useState([]);
  const getReports = () => {
    Axios.get("http://localhost:3001/reports").then((response) => {
      setReportList(response.data);
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const reportDiv = document.getElementById("report");

    html2canvas(reportDiv).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      doc.save("customer_report.pdf");
    });
  };
  useEffect(() => {
    getReports();
  }, []);

  return (
    <div>
      <div className="detailss">
        <h1>Recent Rentals</h1>
        <button className="btn" onClick={generatePDF}>
          Click Here to Generate PDF
        </button>
        <div id="report">
          <div className="details">
            <ul>
              {reportList.map((report, key) => {
                return (
                  <li id={report.rental_id}>
                    <div>
                      <div className="stat">
                        {" "}
                        Name:{report.first_name} {report.last_name} -- Rental:
                        {report.rental_id} -- Title: {report.title} --
                        Date/Time: {report.rental_date}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
