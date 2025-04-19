import html2pdf from 'html2pdf.js';

export const generateAdminReport = async (adminData) => {
  // Create the HTML structure
  const reportContent = document.createElement("div");
  reportContent.style.fontFamily = "'Times New Roman', serif";
  reportContent.style.fontSize = "12pt";
  reportContent.style.lineHeight = "1.5";
  reportContent.style.color = "#333333";
  reportContent.style.margin = "5mm 5mm 5mm 5mm";
  reportContent.style.pageBreakInside = "avoid";

  // Title Page
  const titlePage = `
    <div style="text-align: center; margin-bottom: 20mm;">
      <h1 style="font-size: 24pt; font-weight: bold; color: #003366;">CSR Audit Compliance Report</h1>
      <h2 style="font-size: 18pt; font-weight: bold; color: #003366;">${adminData.name}</h2>
      <p style="font-size: 14pt; color: #555555;">Generated on: ${new Date().toLocaleDateString()}</p>
    </div>
    <hr style="border: 1px solid #003366; margin-bottom: 20mm;">
  `;
  reportContent.innerHTML += titlePage;

  // Vision and Mission
  const visionMission = `
    <div style="margin-bottom: 20mm;">
      <div style="font-size: 14pt; font-weight: bold; color: #003366; margin-bottom: 5mm;">Vision:</div>
      <p style="font-size: 12pt; margin-bottom: 10mm;">${adminData.vision}</p>
      <div style="font-size: 14pt; font-weight: bold; color: #003366; margin-bottom: 5mm;">Mission:</div>
      <p style="font-size: 12pt; margin-bottom: 10mm;">${adminData.mission}</p>
    </div>
  `;
  reportContent.innerHTML += visionMission;

  

  // Admin Info
  const adminInfo = `
    <div style="margin-top:20mm; margin-bottom: 30mm;">
      <div style="font-size: 14pt; font-weight: bold; color: #003366; margin-bottom: 5mm;">Admin Info:</div>
      <p style="font-size: 12pt; margin-bottom: 5mm;">Organization: ${adminData.name}</p>
      <p style="font-size: 12pt; margin-bottom: 5mm;">Admin: ${adminData.adminName}</p>
      <p style="font-size: 12pt; margin-bottom: 5mm;">Email: ${adminData.adminEmail}</p>
      <p style="font-size: 12pt; margin-bottom: 10mm;">CSR Philosophy: ${adminData.csrPhilsophy}</p>
    </div>
  `;
  reportContent.innerHTML += adminInfo;

  const objectives = `
    <div style="margin-bottom: 20mm;">
      <div style="font-size: 14pt; font-weight: bold; color: #003366; margin-bottom: 5mm;">CSR Objectives:</div>
      <ul style="font-size: 12pt; margin-bottom: 10mm;">
        ${adminData.objectives.map((obj, index) => `<li key="${index}" style="margin-bottom: 5mm;">${obj}</li>`).join("")}
      </ul>
    </div>
  `;
  reportContent.innerHTML += objectives;

  // eve
  const events = `
    <div style="margin-bottom: 20mm;">
      <div style="font-size: 14pt; font-weight: bold; color: #003366; margin-bottom: 5mm;">Events:</div>
      ${adminData.events.map((event, index) => `
        <div style="margin-bottom: 20mm; page-break-inside: avoid;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 10mm; border: 0.5px solid #ddd; page-break-inside: avoid;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th colspan="2" style="text-align: left; font-size: 14pt; font-weight: bold; padding: 6px; border: 0.5px solid #ddd;">${index + 1}. ${event.eventName} (${event.eventCategory})</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight: bold; padding: 6px; border: 0.5px solid #ddd;">Location:</td>
                <td style="padding: 6px; border: 0.5px solid #ddd;">${event.eventLocation}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 6px; border: 0.5px solid #ddd;">Date:</td>
                <td style="padding: 6px; border: 0.5px solid #ddd;">${new Date(event.eventDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 6px; border: 0.5px solid #ddd;">Coins:</td>
                <td style="padding: 6px; border: 0.5px solid #ddd;">${event.eventCoins}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 6px; border: 0.5px solid #ddd;">Summary:</td>
                <td style="padding: 6px; border: 0.5px solid #ddd;">${event.eventSummary}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `).join("")}
    </div>
  `;
  reportContent.innerHTML += events;

  // Use html2pdf to convert HTML to PDF and auto-download
  const options = {
    margin: [5, 5, 5, 5],
    filename: 'csr_audit_report.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  html2pdf()
    .from(reportContent)
    .set(options)
    .save(); // Automatically downloads the PDF
};
