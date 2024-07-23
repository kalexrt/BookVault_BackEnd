import express from 'express';
import config from './config';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

app.use(helmet());

app.use(express.json());


app.listen(config.port, () => {
    console.log(`Server started listening on port: ${config.port}`);
});