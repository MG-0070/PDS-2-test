import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const defaultFileName = "Data_1.xlsx";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      alert("Please select an Excel file (XLSX format).");
      e.target.value = null;
      setFile(null);
    } else {
      setFile(selectedFile);
    }
  };

  const buttonStyle = {
    padding: "9px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "8px",
    // boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)"
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("uploadFile", file);

      const response = await axios.post(
        "http://localhost:5000/uploadConfigExcel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.status === 1) {
        setUploadStatus("File uploaded successfully!");
        setFile(new File([file], defaultFileName, { type: file.type }));
        console.log("Default file name sent to server:", defaultFileName);
        console.log("Server response data:", response.data);
      } else {
        setUploadStatus("File upload failed.");
        console.error("Server error:", response.data.error);
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      setUploadStatus("Error uploading file.");
    }
  };

  const isFileSelected = file !== null;

  return (
    <div style={{ boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.0)", padding: "18px" }}>
      <input type="file" accept=".xlsx" onChange={handleFileChange} style={{
        marginLeft: "5px",
        marginTop: "5px",
        padding: "5px"
      }}
      />
      <button
        style={buttonStyle}
        onClick={handleUpload}
        disabled={!isFileSelected}
      >
        Upload
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default Upload;
