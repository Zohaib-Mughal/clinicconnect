        -------API Design-------

----------------Auth---------------------

    POST /api/auth/login
        Access: public
        Body: { "email": "a@b.com", "password": "secret123" }
        200: { "token": "<jwt>", "user": { "id": "...", "name": "...", "role": "patient" } }
        400: Bad Request:	Email/password missing or invalid format
        401	Unauthorized	Incorrect email or password
        429	Too Many Requests	Too many login attempts


    POST /api/auth/register
        Access: public
        Body: { "name":"john", "phone":"031999999", "email": "a@b.com", "password": "secret123" }
        201	Created	Account successfully created
        400	Bad Request	Required fields missing 
        409	Conflict	Email or phone number already registered
        422	Validation Error	Invalid email, weak password, invalid phone number
        429	Too Many Requests	Too many signup attempts
        500	Internal Server Error	Server-side error
        503	Service Unavailable	Database/server temporarily unavailable
    
    GET /api/auth/me
        Access: Private - only LoggedIn users
        200	OK	User authenticated successfully
        401	Unauthorized	Token missing, invalid or expired
        403	Forbidden	User authenticated but access restricted
        404	Not Found	User associated with token no longer exists
        500	Internal Server Error	Unexpected server error
    
--------------Patient ------------------

    GET /api/patient/browser
        Access:Private - Patient only
        200	OK	Doctors retrieved successfully
        400	Bad Request	Invalid search, filter or pagination parameters
        401	Unauthorized	Patient is not logged in
        403	Forbidden	User doesn't have permission to browse this endpoint
        404	Not Found	No doctors found (optional; normally return 200 with an empty array)
        500	Internal Server Error	Server/database error

    POST /api/patient/appointment/book
         Access: Private - Patient only
        Body: {<jwt> , data: { "patient_id":"...", "doctor":"abc", "date":"****", "startTime":"999", "endTime":"000", "reason" : "assadas asdhk sdajhd"}}
        Status Code	Meaning	Situation
        201	Created	Appointment booked successfully
        400	Bad Request	Required fields missing or malformed
        401	Unauthorized	Patient is not authenticated (if authentication is required)
        403	Forbidden	User is not allowed to book appointments
        404	Not Found	Patient or doctor doesn't exist
        409	Conflict	Doctor is already booked for that time slot
        422	Validation Error	Invalid date, time, or appointment details
        500	Internal Server Error	Unexpected server/database error

    POST /api/patient/appointment/cancel
        Access: Private - Patient only
        Body: {"appointment_id": "ObjectId", "cancelReason": "Patient unable to attend"}
        Code	Meaning	Situation
        200	OK	Appointment cancelled successfully
        400	Bad Request	Missing or invalid appointment ID
        401	Unauthorized	Authentication token missing or invalid
        403	Forbidden	Appointment does not belong to the logged-in patient
        404	Not Found	Appointment not found
        409	Conflict	Appointment already cancelled or completed
        422	Unprocessable Entity	Cancellation not allowed under business rules
        500	Internal Server Error	Server/database error

    Get /api/patient/appointment/my
        200	OK	Appointments retrieved successfully
        400	Bad Request	Invalid pagination or status filter
        401	Unauthorized	Authentication token missing or invalid
        403	Forbidden	User does not have patient access
        500	Internal Server Error	Server/database error

--------------------Doctor ---------------------------
    
    GET /api/doctor/:id
        Access: Private - Patient, Doctor, Admin
        200	Doctor retrieved successfully
        400	Invalid doctor ID
        401	Unauthorized
        403	Access forbidden
        404	Doctor not found
        500	Internal server error

    POST /api/doctor/set-weekly-availability
        Access: Private - Doctor only
        Body : {
              "weeklyAvailability": [
                {
                "dayOfWeek": 1,
                "startTime": "09:00",
                "endTime": "13:00",
                "slotDurationMins": 30
                },
                {
                "dayOfWeek": 3,
                "startTime": "14:00",
                "endTime": "18:00",
                "slotDurationMins": 30
                }
            ]
            }
        200	Availability updated successfully
        400	Missing or invalid fields
        401	Unauthorized
        403	Doctor access required
        422	Invalid availability schedule
        500	Internal server error

    Get /api/doctor/appointment/my
        Access: Private - Doctor only
        200	Appointments retrieved successfully
        400	Invalid filters or pagination
        401	Unauthorized
        403	Doctor access required
        500	Internal server error

    PATCH /api/doctor/appointment/:id/status
        Access: Private - Doctor
         Body: {
            "appointment_id": "ObjectId",
            "status": "confirmed"
            }
        200	Appointment status updated
        400	Missing or invalid fields
        401	Unauthorized
        403	Appointment does not belong to this doctor
        404	Appointment not found
        409	Invalid status transition or appointment already completed/cancelled
        500	Internal server error
-Admin
    
    POST /api/admin/add-doctor
        Access: Private - Admin only
        Body: {
            "name": "Dr. Ahmed",
            "email": "ahmed@example.com",
            "password": "SecurePassword123",
            "phone": "03001234567",
            "specialization": "Cardiology",
            "qualifications": "MBBS, FCPS",
            "experienceYears": 5,
            "consultationFee": 2000,
            "bio": "Experienced cardiologist"
            }
        201	Doctor created successfully
        400	Missing or invalid fields
        401	Unauthorized
        403	Admin access required
        409	Email already registered or doctor profile already exists
        422	Validation error
        500	Internal server error

    PATCH /api/admin/doctor/:id
        Access: Private - Admin only
        Body: {
            "specialization": "Neurology",
            "qualifications": "MBBS, FCPS",
            "experienceYears": 8,
            "consultationFee": 2500,
            "bio": "Updated doctor profile",
            "isActive": true
            }
        200	Doctor updated successfully
        400	Missing or invalid fields
        401	Unauthorized
        403	Admin access required
        404	Doctor not found
        422	Validation error
        500	Internal server error

    DELETE /api/admin/doctor/:id
        Access: Private - Admin only
        Body: {
            "doctor_id": "ObjectId"
            }
        200	Doctor deactivated successfully
        400	Invalid doctor ID
        401	Unauthorized
        403	Admin access required
        404	Doctor not found
        500	Internal server error

    GET /api/admin/appointment
        Access: Private - Admin only
        Code	Meaning
        200	Appointments retrieved successfully
        400	Invalid filters or pagination
        401	Unauthorized
        403	Admin access required
        500	Internal server error
            







1. users

Field	Type	Notes
_id	ObjectId	auto
name	String	required
email	String	required, unique, lowercase
passwordHash	String	required, never returned in responses
role	String	patient, doctor, or admin; default patient
phone	String	optional
isActive	Boolean	default true
createdAt, updatedAt	Date	via Mongoose timestamps

2. doctors (profile linked to a user)

Field	Type	Notes
_id	ObjectId	auto
user	ObjectId → users	required, unique (one profile per user)
specialization	String	required, for example "Cardiology"
qualifications	String	optional
experienceYears	Number	min 0
consultationFee	Number	min 0
bio	String	optional
weeklyAvailability	Array of objects	see below
isActive	Boolean	default true (soft delete)
createdAt, updatedAt	Date	timestamps

Each item in weeklyAvailability:

Field	Type	Notes
dayOfWeek	Number	0 (Sunday) to 6 (Saturday)
startTime	String	"09:00"
endTime	String	"13:00"
slotDurationMins	Number	for example 30

3. appointments

Field	Type	Notes
_id	ObjectId	auto
patient	ObjectId → users	required
doctor	ObjectId → doctors	required
date	Date	the appointment day
startTime	String	"09:30"
endTime	String	"10:00"
status	String	pending, confirmed, completed, cancelled; default pending
reason	String	patient's reason for visit
cancelledBy	String	patient, doctor, or admin; only when cancelled
cancelReason	String	optional
doctorNotes	String	optional, set by the doctor
createdAt, updatedAt	Date	timestamps





Indexes to add

users.email: unique
doctors.user: unique
appointments: unique on (doctor, date, startTime), so a slot can't be booked twice. Ignore cancelled ones with a partial index (status != "cancelled").
appointments: index on (patient, date) and (doctor, date) for the "my appointments" lists


Rules your API must enforce

A patient can only see and cancel their own appointments.
A doctor can only update the status of their own appointments.
Only admins can create, update, or deactivate doctors.
A booking must fall inside the doctor's availability and must not overlap an existing one.