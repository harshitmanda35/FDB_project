create table user (
    user_id int not null AUTO_INCREMENT,
 name varchar(50), email varchar(50), password varchar(60), 
 gender varchar(10), age int, primary key(user_id));

create table admin (
    
    admin_id int not null AUTO_INCREMENT, 
    name varchar(50), email varchar(50), password varchar(60),
    primary key(admin_id));

CREATE TABLE location (
    location_id int not null auto_increment,
    location_area VARCHAR(255),
    pincode VARCHAR(20),
    place VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255),
    Primary key (location_id)
);

CREATE TABLE hotel (
    hotel_id int  auto_increment,
    hotel_name VARCHAR(255) NOT NULL,
    description TEXT,
    photos TEXT, 
    contact_info VARCHAR(255),
    opening_hours VARCHAR(255),
    total_rooms int,
    cancellation_policy VARCHAR(255),
    price_per_room int,
    location_id INT ,
    primary key(hotel_id),
    FOREIGN KEY (location_id) REFERENCES location(location_id)

);

CREATE TABLE amenities (
    amenity_id int  auto_increment,
    amenity_name VARCHAR(255),
    description TEXT,
    accessibility TEXT,
    rules TEXT,
    photo TEXT, 
    cost DECIMAL(10,2),
    contact_info VARCHAR(255),
    PRIMARY KEY(amenity_id)
);

create table hotel_amenities(
hotel_id int,
amenity_id int ,
 FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id),
  FOREIGN KEY (amenity_id) REFERENCES amenities(amenity_id)

);

-- Rooms:
CREATE TABLE rooms (
    room_id int not null auto_increment,
    room_number VARCHAR(50),
    level INT,
    additional_services TEXT,
    is_occupied BOOLEAN,
    hotel_id int,
     FOREIGN KEY (hotel_id) references hotel(hotel_id),
    PRIMARY KEY(room_id)
);

CREATE TABLE booking (
    booking_id int not null auto_increment, 
    check_in_date DATE,
    total_cost DECIMAL(10,2),
    hotel_id int,
    user_id int ,
     FOREIGN key (hotel_id) references hotel(hotel_id),
    FOREIGN key(user_id) references user(user_id),
    PRIMARY KEY(booking_id)
);

CREATE TABLE department (
    department_id int not null auto_increment,
    department_name VARCHAR(255),
    description TEXT,
    contact_info VARCHAR(255),
    admin_id int,
    FOREIGN key(admin_id) references admin(admin_id),
     PRIMARY KEY(department_id)
);
CREATE TABLE staff (
    staff_id int not null auto_increment,
    staff_name VARCHAR(255),
    position VARCHAR(255),
    staff_salary DECIMAL(10,2),
    staff_pic TEXT, -- URL to photo
    gender VARCHAR(10),
    hire_date DATE,
       admin_id int,
    primary key(staff_id),
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
 
);


CREATE TABLE maintenance (
    maintenance_id int not null auto_increment,
    description TEXT,
    status VARCHAR(50),
    priority INT,
    comments TEXT,
    admin_id int,
    PRIMARY KEY (maintenance_id),
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)

);


CREATE TABLE maintenance_staff (
    maintenance_id int,
    staff_id int,
    PRIMARY KEY (maintenance_id,staff_id),
    FOREIGN KEY (maintenance_id) REFERENCES maintenance(maintenance_id),
     FOREIGN KEY (staff_id) REFERENCES staff(staff_id)

);



CREATE TABLE user_preferences (
    preference_id int,
    special_requests varchar(200),
    room_type_preference varchar(200),
    floor_level_preference varchar(200),
    amenities_preference varchar(200),
    language_preference varchar(200),
    user_id int,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

SET SQL_SAFE_UPDATES = 0;

CREATE TABLE events (
    event_id int not null auto_increment,
    event_name varchar(200),
    description varchar(200),
    date_of_event DATE,
    additional_notes varchar(200),
    hotel_id int,
    primary key(event_id),
    FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id)
);

CREATE TABLE review (
    review_id int not null auto_increment,
    review_description varchar(200),
    rating varchar(200),
    comments varchar(200),
    user_id int,
    hotel_id int,
    primary key(review_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id)
);

CREATE TABLE coupons (
    coupon_id int not null auto_increment,
    coupon_name varchar(200),
    discount int,
    description varchar(200),
    admin_id int,
    primary key(coupon_id),
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id)
);
CREATE TABLE user_coupon (
    user_id int,
    coupon_id int,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (coupon_id) REFERENCES coupons(coupon_id)
);