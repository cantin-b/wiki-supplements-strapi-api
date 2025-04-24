import fs from 'fs'
import path from 'path'
import { google } from 'googleapis'
import dotenv from 'dotenv'

dotenv.config()

const KEYFILEPATH = process.env.GOOGLE_KEY_PATH as string
const SCOPES = ['https://www.googleapis.com/auth/drive.file']
const FOLDER_ID = '1cyhhvzAXormBL6GmYFTczNyXLgCioD_d'

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
})

function getLatestDumpFile(): { path: string, name: string } {
    const dumpFolder = path.resolve(__dirname, '../backups')
    const dumps = fs.readdirSync(dumpFolder)
        .filter(file => file.endsWith('.sql'))
        .map(file => ({
            file,
            time: fs.statSync(path.join(dumpFolder, file)).mtime.getTime()
        }))
        .sort((a, b) => b.time - a.time)

    const latest = dumps[0]
    return {
        path: path.join(dumpFolder, latest.file),
        name: latest.file,
    }
}

async function uploadFile(filePath: string, fileName: string) {
    const authClient = await auth.getClient()
    const drive = google.drive({ version: 'v3', auth: authClient as any })

    const res = await drive.files.create({
        requestBody: {
            name: fileName,
            mimeType: 'application/sql',
            parents: [FOLDER_ID], // <-- sends it to your SupplementoPedia DB DUMPS folder
        },
        media: {
            mimeType: 'application/sql',
            body: fs.createReadStream(filePath),
        },
    })

    console.log('📤 Uploaded file ID:', res.data.id)
}

const { path: filePath, name: fileName } = getLatestDumpFile()
uploadFile(filePath, fileName)
