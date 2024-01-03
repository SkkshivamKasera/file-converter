import React, { useState } from 'react';
import './FileInput.css';
import { download, jpg_to_pdf, ms_convert, upload } from '../../apicall/apicall';

const FileInput = ({ title, desc, accept, select, format }) => {
  const [file, setFile] = useState(null)
  
  const uploadFile = async () => {
    try{
      await upload(file)
    }catch(error){
      alert(error.message)
    }
  }

  const convert = async () => {
    if(title === "jpg to pdf"){
      await jpg_to_pdf(file, format)
    }else{
      await ms_convert(file, format)
    }
  }

  return (
    <div className="tool_workarea">
      <div className="tool__header">
        <h1 className="tool__header__title">{title}</h1>
        <h2 className="tool__header__subtitle">{desc}</h2>
      </div>
      <div className="uploading_button">
        <label htmlFor="fileInput">{select}</label>
        <input
          type="file"
          id="fileInput"
          accept={accept}
          onChange={(e)=>setFile(e.target.files[0])}
          name='file'
        />
      </div>
      <div style={{margin: "20px"}} className="render">
        <button style={{padding: "20px"}} onClick={uploadFile}>Upload</button>
        <button style={{padding: "20px"}} onClick={convert}>Convert</button>
        <button style={{padding: "20px"}} onClick={() => download(file, format)}>Download</button>
      </div>
    </div>
  )
}

export default FileInput;