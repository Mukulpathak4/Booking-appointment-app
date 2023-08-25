const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const appointmentController = require('./controllers/appointmentController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Display the form for adding a new appointment
app.get('/add', appointmentController.displayAddForm);

// Display the form for editing an existing appointment
app.get('/edit/:id', appointmentController.loadAppointment);

// Handle POST request to add a new appointment
app.post('/add', appointmentController.addAppointment); // Ensure you have this function defined in your controller

// Handle POST request to update an appointment
app.post('/update/:id', appointmentController.updateAppointment); // Ensure you have this function defined in your controller

// Handle POST request to delete an appointment
app.post('/delete/:id', appointmentController.deleteAppointment);

// Display the list of all appointments
app.get('/', appointmentController.getAllAppointments);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});