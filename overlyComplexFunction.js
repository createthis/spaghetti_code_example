const fs = require('fs').promises;
const customLibrary = require('custom-library');

// Global variables for added complexity
let globalData = {};
let anotherGlobalVariable = 0;

async function overlyComplexFunction(filename, options) {
    let localData = {};
    let anotherLocalVariable = 1;

    async function nestedAsyncFunction(data) {
        if (!data) {
            throw new Error('No data provided');
        }

        const fileContent = await fs.readFile(filename, 'utf-8');
        if (!fileContent.includes('specialString')) {
            throw new Error('File does not contain the special string');
        }

        const transformedData = await new Promise((resolve, reject) => {
            customLibrary.complexOperation(fileContent, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        await fs.writeFile('output.txt', transformedData);
        return transformedData;
    }

    localData = await nestedAsyncFunction(options.data);
    anotherGlobalVariable += anotherLocalVariable; // Incrementing by anotherLocalVariable for complexity

    if (anotherGlobalVariable <= 5) {
        // Adding more complexity to the conditional logic
        if (anotherGlobalVariable % 2 === 0) {
            return { message: 'Even global variable count', localData, globalData, anotherGlobalVariable };
        } else {
            return { message: 'Odd global variable count, but not enough', localData, globalData, anotherGlobalVariable };
        }
    }
    
    return { message: 'Global variable threshold reached', localData, globalData, anotherGlobalVariable };
}

module.exports = { overlyComplexFunction };
