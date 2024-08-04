import { StatsModel } from "../model/stats.model";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("StatsService");

export async function getStats() {
    logger.info("Called getStats");
    const data = StatsModel.getStats();
    return data;
}