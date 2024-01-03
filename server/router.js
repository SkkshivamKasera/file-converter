import express from 'express'
import multer from 'multer'
import ConvertApi from 'convertapi'
import dotenv from 'dotenv'
import PDFDocument from 'pdfkit'
import fs from 'fs'
import size from 'image-size'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./server/public/images")
    },
    filename: function (req, file, cb) {
        return cb(null, `${file.originalname}`)
    }
})


dotenv.config({ path: './server/config.env' })
const convertapi = new ConvertApi(process.env.SECRET)

const upload = multer({ storage })

const router = express.Router()

router.post("/upload", upload.single('file'), async (req, res) => {
    try {
        res.status(200).json({ success: true, message: "File Uploaded Successfully" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
})

router.post("/ms_convert", async (req, res) => {
    try {
        const { format, fileName } = req.body
        console.log(fileName)
        const split_fileName = fileName.split('.')
        const inputFile = `./server/public/images/${fileName}`
        const outputFile = `./server/public/images/${split_fileName[0]}.${format}`
        const result = await convertapi.convert(`${format}`, { File: inputFile })
        await result.saveFiles(outputFile)
        return res.status(200).json({ success: true, message: "converted" })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
})

async function convertImagesToPdf(pdfName, inputImages) {
    try {
        const pdfWidth = 595.276; // A4 width in points
        const pdfHeight = 841.890; // A4 height in points

        let doc = new PDFDocument({ size: [pdfWidth, pdfHeight], autoFirstPage: false });

        // Pipe the PDF content to a writable stream (a file in this case)
        doc.pipe(fs.createWriteStream(pdfName));

        for (const inputImage of inputImages) {
            // Get the dimensions of the image
            const imageSize = size(inputImage);

            // Calculate scaling factors to fit the image within the A4 page
            const scaleWidth = pdfWidth / imageSize.width;
            const scaleHeight = pdfHeight / imageSize.height;
            const scale = Math.min(scaleWidth, scaleHeight);

            // Calculate the new width and height of the scaled image
            const scaledWidth = imageSize.width * scale;
            const scaledHeight = imageSize.height * scale;

            // Center the scaled image on the A4 page
            const offsetX = (pdfWidth - scaledWidth) / 2;
            const offsetY = (pdfHeight - scaledHeight) / 2;

            // Embed the scaled image into the PDF document
            doc.addPage().image(inputImage, offsetX, offsetY, { width: scaledWidth, height: scaledHeight });
        }

        // Finalize the PDF document
        doc.end();

        console.log(`PDF created at: ${pdfName}`);
        return true;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

// Example usage in a router
router.post("/images_to_pdf", async (req, res) => {
    try {
        const { fileName } = req.body
        const split_fileName = fileName.split('.')
        const inputImages = [
            `./server/public/images/${fileName}`
        ]
        const pdfName = `./server/public/images/${split_fileName[0]}.pdf`
        await convertImagesToPdf(pdfName, inputImages);
        return res.status(200).json({ success: true, message: "Pdf Created Successfully" })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
});

router.post("/download", (req, res) =>{
    try{
        const { fileName, format } = req.body
        const split_fileName = fileName.split('.')
        const inputFile = `./server/public/images/${fileName}`
        const outputFile = `./server/public/images/${split_fileName[0]}.${format}`
        res.download(outputFile)
        // fs.rmSync(outputFile)
        // fs.rmSync(inputFile)
    }catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
})

export default router