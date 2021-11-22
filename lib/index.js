module.exports = {
    sumFile: (fileName) => {
        const MassiveSum = require("./massiveSumClass");
        return new MassiveSum().calculate(fileName);
    }
}
