// custom-library/index.js
module.exports = {
    complexOperation: function(input, callback) {
        // Simulate a complex operation
        setTimeout(() => {
            callback(null, `Processed: ${input}`);
        }, 100);
    }
};
