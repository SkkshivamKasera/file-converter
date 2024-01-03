import axios from 'axios';
import FileDownload from 'js-file-download'

// const url_link_base = "http://localhost:5000/api/v1"
const url_link_base = "https://file-converter-gpub.onrender.com/api/v1"

export const upload = (file) => {
    const formData = new FormData()
    formData.append('file', file)
    axios.post(`${url_link_base}/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true
    }).then(res => alert(res.data.message))
        .catch(er => console.log(er))
}

export const ms_convert = (file, format) => {
    axios.post(`${url_link_base}/ms_convert`, { fileName: file.name, format: format }, {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    }).then(res => {
        alert(res.data.message)
    })
        .catch(er => console.log(er))
}

export const jpg_to_pdf = (file, format) => {
    axios.post(`${url_link_base}/images_to_pdf`, { fileName: file.name }, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    }).then(res => {
        alert(res.data.message)
    })
        .catch(er => console.log(er))
}

export const download = (file, format) => {
    console.log(file)
    const fileName = file.name.split('.')
    const splitFileName = fileName[0]
    axios.post(`${url_link_base}/download`, {
        fileName: file.name,
        format: format
    }, {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
        responseType: "blob"
    }).then(res => {
        FileDownload(res.data, `${splitFileName}.${format}`)
    }).catch(err => console.log(err))
}