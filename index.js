const app = require('./src/app'); // Import your app
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();


// Get URI and PORT from environment variables
const URI = process.env.URI; // Define your MongoDB connection string in .env as URI
const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified in .env

mongoose.connect(URI)
    .then(() => {
        console.log('Connected to MongoDB (tour)');
    })
    .catch(err => {
        console.error('Connection error:', err);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await mongoose.disconnect();
    process.exit(0);
});
