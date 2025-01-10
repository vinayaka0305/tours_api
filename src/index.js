const app = require('./app'); // Import your app
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();

// Check for required environment variables
if (!process.env.URI || !process.env.PORT) {
    console.error('Error: Missing required environment variables (URI or PORT)');
    process.exit(1); // Exit the application if variables are missing
}

// Connect to MongoDB
mongoose
    .connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds
    })
    .then(() => {
        console.log('Connected to MongoDB (tour)');
    })
    .catch((error) => {
        console.error('Database connection error:', error.message);
        process.exit(1); // Exit the application if the database connection fails
    });

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await mongoose.disconnect();
    process.exit(0);
});
