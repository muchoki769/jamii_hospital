CREATE DATABASE jamii_hospital
CREATE TABLE patient(
patient_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR (100) NOT NULL UNIQUE,
password_hash VARCHAR(255) NOT NULL
)
CREATE TABLE identificationNumber(
  national_id INT PRIMARY KEY,
  nationalID_number INT NOT NULL,
)

CREATE TABLE insuranceNumber(
  insurance_id INT PRIMARY KEY,
  insuranceID_number INT NOT NULL,
),

CREATE TABLE currentMedication(
   currentMedication_id INT PRIMARY KEY,
   currentMedication VARCHAR(255),
)

CREATE TABLE allergies(
   allergies_id INT PRIMARY KEY,
  allergies VARCHAR(255),
),



CREATE TABLE Diagnosis(
  diagnosis_id INT PRIMARY KEY,
  Diagnosis VARCHAR(500) NOT NULL
)


CREATE TABLE appointment (
appointment_id SERIAL PRIMARY KEY,
patient_id INT NOT NULL,
national_id INT NOT NULL,
allergies_id INT,
currentMedication_id INT,
insurance_id INT NOT NULL,
ailment_description VARCHAR(500) NOT NULL,
gender VARCHAR(10),
appointment_date DATE NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW(),

FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
FOREIGN KEY (national_id) REFERENCES identificationNumber(national_id),
FOREIGN KEY (allergies_id) REFERENCES allergies(allergies_id),
FOREIGN KEY (currentMedication_id) REFERENCES currentMedication(currentMedication_id),
FOREIGN KEY (insurance_id) REFERENCES insuranceNumber(insurance_id)
)
CREATE TABLE department (
department_id SERIAL PRIMARY KEY, 
department_name VARCHAR(100)
)

CREATE TABLE doctor(
doctor_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR (100) NOT NULL UNIQUE,
password_hash VARCHAR(255) NOT NULL,
appointment_id INT,
diagnosis_id INT,
department_id INT,

FOREIGN KEY (diagnosis_id) REFERENCES Diagnosis(diagnosis_id),
FOREIGN KEY (department_id) REFERENCES department(department_id),
FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id)
)




