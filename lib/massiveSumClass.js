module.exports = class MassiveSum {

    calculate(fileName) {
        return this.readFile(fileName)
            .then(async data => {
                let lines = data.split("\n");
                let sum = lines.filter(line => line.trim().length > 0 && !line.trim().endsWith(".txt"))
                    .map(line => parseInt(line))
                    .reduce((prev, curr) => prev + curr);

                let subFiles = lines.filter(line => line.endsWith(".txt"));
                if (subFiles.length > 0) {
                    let internalFileSums = await Promise.all(subFiles
                        .map(file => this.calculate(file)));
                    let internalSum = internalFileSums.reduce((prev, curr) => prev + curr);
                    sum += internalSum;
                }
                console.info(`File ${fileName}, total sum: ${sum}`);
                return sum;
            }).catch(() => 0);
    }

    readFile(fileName) {
        const fs = require('fs');

        return new Promise(((resolve, reject) => {
            if (!fs.existsSync(fileName)) {
                console.error(`File ${fileName} not found!, returning 0`);
                reject(0)
            }
            fs.readFile(fileName, 'utf-8', (error, data) => {
                if (error) return reject(error);
                resolve(data);
            });
        }));
    }

}

