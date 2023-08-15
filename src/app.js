const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

app.use('/api', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
