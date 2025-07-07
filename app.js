import { createRequire } from "module";
const require = createRequire(import.meta.url)
import express, {json} from 'express'
import { ApiRouter } from './Routes/api.js'
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

require('dotenv').config();
app.disable('x-powered-by')
app.use(json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/', ApiRouter)
app.use(bodyParser.json())
app.use(express.json());
app.use('/uploads/documentos', express.static('uploads/documentos'));

// Elimina las líneas duplicadas de static
// app.use('/uploads/funcionarios', express.static(path.join(process.cwd(), 'uploads/funcionarios')));
// app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.listen(process.env.PORT,()=>{
    console.log(`server listening on port ${process.env.SERVER_IP}:${process.env.PORT}`);
})