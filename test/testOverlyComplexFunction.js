const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const fs = require('fs');
const { overlyComplexFunction } = require('../overlyComplexFunction');

describe('Overly Complex Function Tests', () => {
    let readFileStub, writeFileStub, complexOperationStub;

    beforeEach(() => {
        global.anotherGlobalVariable = 0; // Resetting the global variable
        readFileStub = sinon.stub(fs.promises, 'readFile');
        writeFileStub = sinon.stub(fs.promises, 'writeFile');
        complexOperationStub = sinon.stub(require('custom-library'), 'complexOperation');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should throw an error when no data is provided', async () => {
        try {
            await overlyComplexFunction('testfile.txt', { data: null });
            expect.fail('The function did not throw an error');
        } catch (error) {
            expect(error.message).to.equal('No data provided');
        }
    });

    it('should process correctly with special string in file', async () => {
        readFileStub.resolves('specialString');
        writeFileStub.resolves();
        complexOperationStub.callsFake((input, callback) => callback(null, 'processedData'));

        const result = await overlyComplexFunction('testfile.txt', { data: true });
        expect(result.localData).to.equal('processedData');
    });

    it('should return error if file does not contain special string', async () => {
        readFileStub.resolves('ordinaryContent');

        try {
            await overlyComplexFunction('testfile.txt', { data: true });
        } catch (error) {
            expect(error.message).to.equal('File does not contain the special string');
        }
    });

    // Additional test cases...
});
