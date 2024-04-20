create table user (user_id int not null primary key AUTO_INCREMENT, name varchar(50), email varchar(50), password varchar(60), gender varchar(10), age int);
create table admin (admin_id int not null primary key AUTO_INCREMENT, name varchar(50), email varchar(50), password varchar(60));
CREATE TABLE location (
    location_id SERIAL PRIMARY KEY auto_increment,
    location_area VARCHAR(255),
    pincode VARCHAR(20),
    place VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255)
);
CREATE TABLE hotel (
    hotel_id SERIAL PRIMARY KEY auto_increment,
    hotel_name VARCHAR(255) NOT NULL,
    description TEXT,
    photos TEXT, -- Assuming you store URLs to photos
    contact_info VARCHAR(255),
    opening_hours VARCHAR(255),
    total_rooms int,
    location_id INT REFERENCES location(location_id)
);
CREATE TABLE amenities (
    amenity_id SERIAL PRIMARY KEY auto_increment,
    amenity_name VARCHAR(255),
    description TEXT,
    accessibility TEXT,
    rules TEXT,
    photo TEXT, -- URLs to photos
    cost DECIMAL(10,2),
    contact_info VARCHAR(255)
);


create table hotel_amenities(
hotel_id int references hotel(hotel_id),
amenity_id int references amenities(amenity_id)
);
-- Rooms:
CREATE TABLE rooms (
    room_id SERIAL PRIMARY KEY auto_increment,
    room_number VARCHAR(50),
    level INT,
    additional_services TEXT,
    is_occupied BOOLEAN,
    hotel_id int references hotel(hotel_id)
    
);