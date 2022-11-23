import express from 'express'
import chalk from 'chalk'

class Server {
    #url; #app; #server; #port; #host

    /**
     * @param {Number} port
     * @param {String} host
     */
    constructor(port, host = 'localhost') {
        this.#port = port; this.#host = host;
        this.#url = `http://${host}:${port}`;
        this.#app = express();
    }

    get app() {
        return this.#app
    }

    get url() {
        return this.#url
    }

    start() {
        if (this.#server) return
        this.#server = this.#app.listen(this.#port, this.#host, () => {
            console.log(
                `🚀 Server started at ${chalk.green(this.#url)}`
            );
        })
    }

    stop() {
        if (!this.#server) return

        this.#server.close(err => {
            if (err) {
                console.log(`💢 server at ${chalk.yellow(url)} was stopped with an error`)
                console.error(err)
            }
            console.log(`💥 Server at ${chalk.yellow(url)} was stopped`)
        })

        this.#server = undefined
    }
}

export default Server
