import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const file = fileURLToPath(import.meta.url);
const dir = path.dirname(file);

const port = 3050;
const app = express();

app.use(express.static(path.join(dir,'public')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

