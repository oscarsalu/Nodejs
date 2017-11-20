const fs = require('fs');

console.log('This is Execution before File Reading.');
//reads the file asynchronously
fs.readFile('input.txt', 'utf8', function(err, data) {
    if (err) {
        return console.error(err);
    }
    console.log('Reading File Asynchronously:' + data);
});

console.log('Executed after file reading');

// reading file syncronously
console.log('This is Execution before File Read.');
//reads the file Synchronously
var data = fs.readFileSync("input.txt");
console.log("Synchronous read: " + data.toString());

console.log("Executed after Synchronous file read");