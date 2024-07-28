import express from 'express';
import config from './config';
import helmet from 'helmet';
import router from "./routes/index.routes";
import { errorHandler } from './middlewares/errorHandler.middleware';
import { requestLogger } from "./middlewares/logger.middleware";
import cors from 'cors';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(requestLogger);
app.use(router);
app.use(errorHandler);


app.listen(config.port, () => {
    console.log(`Server started listening on port: ${config.port}`);
});