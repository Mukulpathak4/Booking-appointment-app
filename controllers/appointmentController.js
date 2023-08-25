const db = require('../models/db'); // Adjust the path to your database connection module as needed

function displayAddForm(req, res) {
    // Render the form for adding a new appointment
    res.render('add');
}

function loadAppointment(req, res) {
    const id = req.params.id;
    // Query the database to retrieve the appointment data based on the ID
    const query = "SELECT * FROM appointments WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        if (result.length === 0) {
            // Handle case where appointment is not found
            res.redirect('/');
        } else {
            // Render the edit form and fill it with the appointment data
            res.render('edit', { appointment: result[0] });
        }
    });
}

function addAppointment(req, res) {
    const { username, email, phonenumber } = req.body;

    // Insert a new appointment into the database
    const query = "INSERT INTO appointments (username, email, phonenumber) VALUES (?, ?, ?)";
    db.query(query, [username, email, phonenumber], (err, result) => {
        if (err) {
            console.error(err);
        }
        // Redirect back to the main page after adding the appointment
        res.redirect('/');
    });
}

function updateAppointment(req, res) {
    const id = req.params.id;
    const { username, email, phonenumber } = req.body;

    // Update the appointment in the database based on the ID
    const query = "UPDATE appointments SET username = ?, email = ?, phonenumber = ? WHERE id = ?";
    db.query(query, [username, email, phonenumber, id], (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        // Redirect back to the main page after updating the appointment
        res.redirect('/');
    });
}

function deleteAppointment(req, res) {
    const id = req.params.id;
    // Query the database to delete the appointment based on the ID
    const query = "DELETE FROM appointments WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
        }
        // Redirect back to the main page after deleting the appointment
        res.redirect('/');
    });
}

function getAllAppointments(req, res) {
    // Query the database to retrieve all appointments
    const query = "SELECT * FROM appointments";
    db.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        // Render the main page with the list of appointments
        res.render('index', { appointments: result });
    });
}

module.exports = {
    displayAddForm,
    loadAppointment,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAllAppointments
};