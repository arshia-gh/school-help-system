import mongoose from "mongoose";
import chalk from "chalk";
import env from "./environment";

export default async () => mongoose
    .connect(env.databaseUrl)
    .then(({ connection: { host, port, name } }) => {
        const url = `${host}:${port}/${name}`
        console.log(`🤖 Connected to database at ${chalk.green(url)}`)
    })