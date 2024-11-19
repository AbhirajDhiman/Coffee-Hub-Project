const fs = require('fs');
const path = require('path');

// Specify the folder containing the images
const folderPath = './Assets'; // change this to your folder path

// Initialize an array to store image data
const imageDataArray = [];

// Read the directory and get all file names
fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
    }

    files.forEach((file) => {
        // Check if the file is an image (you can adjust the extensions based on your needs)
        if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
            const filePath = path.join(folderPath, file);
            
            // Create an object with the image info
            const imageData = {
                src: filePath,
                name: path.basename(file, path.extname(file)), // file name without extension
                extension: path.extname(file) // file extension
            };

            // Push the image data to the array
            imageDataArray.push(imageData);
        }
    });

    // Write the data to a JSON file
    fs.writeFile('imageData.json', JSON.stringify(imageDataArray, null, 2), (err) => {
        if (err) {
            console.error('Error writing JSON file', err);
        } else {
            console.log('Image data successfully written to imageData.json');
        }
    });
});
