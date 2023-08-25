const db = require('./db');

function saveAppointment(username, email, phoneNumber, callback) {
    const query = "INSERT INTO appointments (username, email, phonenumber) VALUES (?, ?, ?)";
    db.query(query, [username, email, phoneNumber], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}
function getAllAppointments(callback) {
    const query = "SELECT * FROM appointments.appointments";
    console.log(query);
    db.query(query, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}


module.exports = {
    saveAppointment,
    getAllAppointments
};