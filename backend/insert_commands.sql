INSERT INTO location (location_area, pincode, place, city, country) 
VALUES 
    ('Downtown', '12345', '123 Main Street', 'Metropolis', 'United States'),
    ('Beachside', '54321', '456 Ocean Avenue', 'Seaside City', 'United States'),
    ('Suburban', '67890', '789 Park Street', 'Village Town', 'United States'),
    ('Mountains', '98765', '321 Hill Road', 'Mountain Town', 'United States'),
    ('Riverside', '24680', '654 River Lane', 'River City', 'United States');

INSERT INTO hotel (hotel_name, description, photos, contact_info, opening_hours, total_rooms, cancellation_policy, price_per_room, location_id) 
VALUES 
    ('Grand Hotel', 'Luxurious hotel in the heart of the city.', 'https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg', 'info@grandhotel.com', '24/7', 100, 'Flexible', 200, 1),
    ('Seaside Resort', 'Relaxing resort with stunning ocean views.', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8fDA%3D', 'info@seasideresort.com', '8 AM - 10 PM', 50, 'Moderate', 300, 2),
    ('Suburban Inn', 'Comfortable inn nestled in a peaceful neighborhood.', 'https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg', 'info@suburbaninn.com', '9 AM - 8 PM', 30, 'Strict', 150, 3),
    ('Mountain Lodge', 'Cozy lodge surrounded by breathtaking mountain scenery.', 'https://t4.ftcdn.net/jpg/00/09/21/15/360_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg', 'info@mountainlodge.com', '10 AM - 7 PM', 20, 'Flexible', 250, 4),
    ('Riverside Retreat', 'Tranquil retreat overlooking a serene river.', 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg', 'info@riversideretreat.com', '9 AM - 9 PM', 40, 'Moderate', 180, 5);

INSERT INTO department (department_name, description, contact_info, admin_id) 
VALUES 
    ('Human Resources', 'Responsible for hiring, training, and managing employees.', 'hr@example.com', 1),
    ('Finance', 'Handles financial matters such as budgeting, accounting, and auditing.', 'finance@example.com', 1),
    ('Marketing', 'Promotes the company''s products and services through various channels.', 'marketing@example.com', 1),
    ('IT', 'Manages the company''s technological infrastructure and provides technical support.', 'it@example.com', 2),
    ('Sales', 'Responsible for selling products or services to customers.', 'sales@example.com', 2);

INSERT INTO staff (staff_name, position, staff_salary, staff_pic, gender, hire_date, admin_id) 
VALUES 
    ('John Doe', 'HR Manager', 60000.00, 'https://example.com/john_doe_pic.jpg', 'Male', '2023-03-15', 1),
    ('Jane Smith', 'Financial Analyst', 55000.00, 'https://example.com/jane_smith_pic.jpg', 'Female', '2022-08-20', 1),
    ('Michael Johnson', 'Marketing Coordinator', 50000.00, 'https://example.com/michael_johnson_pic.jpg', 'Male', '2023-01-10', 2),
    ('Emily Brown', 'IT Specialist', 58000.00, 'https://example.com/emily_brown_pic.jpg', 'Female', '2023-05-05', 2),
    ('David Lee', 'Sales Representative', 52000.00, 'https://example.com/david_lee_pic.jpg', 'Male', '2023-02-28', 1);

INSERT INTO maintenance (description, status, priority, comments, admin_id) 
VALUES 
    ('Repairing HVAC system in office building.', 'In Progress', 2, 'Scheduled for next week.', 1),
    ('Replacing broken windows in conference room.', 'Pending', 1, 'Waiting for delivery of materials.', 1),
    ('Fixing plumbing issues in restroom.', 'Completed', 3, 'No further issues reported.', 2),
    ('Servicing elevators in the office building.', 'Pending', 2, 'Waiting for technician availability.', 1),
    ('Inspecting fire suppression system.', 'In Progress', 1, 'Identified minor issues that need addressing.', 2);
INSERT INTO maintenance_staff (maintenance_id, staff_id) 
VALUES 
    (1, 1),
    (1, 3),
    (2, 2),
    (3, 4),
    (4, 5),
    (5, 1),
    (5, 3);

    INSERT INTO user_preferences (preference_id, special_requests, room_type_preference, floor_level_preference, amenities_preference, language_preference, user_id) 
VALUES 
    (1, 'Extra towels and pillows', 'Suite', 'High floor', 'Gym and pool access', 'English', 1),
    (2, 'Non-smoking room', 'Standard', 'Any', 'Free Wi-Fi', 'Spanish', 2),
    (3, 'Quiet room away from elevator', 'Executive', 'Low floor', 'Room service', 'French', 2),
    (4, 'Adjoining rooms for family', 'Family Suite', 'Any', 'Childrens play area', 'English', 3),
    (5, 'Early check-in if possible', 'Standard', 'Any', 'Laundry service', 'English', 1);


    INSERT INTO events (event_name, description, date_of_event, additional_notes, hotel_id) 
VALUES 
  ('Conference', 'Annual conference for industry professionals', '2024-05-15', 'Please arrive 30 minutes early for registration', 1),
  ('Wedding Reception', 'Celebration of John and Emily', '2024-06-20', 'Live music and open bar', 2),
  ('Birthday Party', 'Surprise party for Sarah', '2024-07-10', 'Gifts are optional', 3),
  ('Business Meeting', 'Quarterly board meeting', '2024-08-05', 'Agenda will be provided', 1),
  ('Seminar', 'Educational seminar on marketing strategies', '2024-09-15', 'Limited seating available', 2);


INSERT INTO review (review_description, rating, comments, user_id, hotel_id) 
VALUES 
    ('Great experience, highly recommended!', '5', 'Excellent service and amenities.', 1, 1),
    ('Lovely stay, excellent service.', '4', 'The beachfront location was amazing.', 2, 1),
    ('Average experience, room was not as expected.', '3', 'Room cleanliness could be improved.', 1, 1),
    ('Wonderful time, beautiful surroundings.', '5', 'The mountain views were breathtaking.', 3, 2),
    ('Disappointing stay, cleanliness could be improved.', '2', 'Disappointed with the room condition.', 2, 3);


INSERT INTO coupons (coupon_name, discount, description, admin_id) 
VALUES 
    ('FIRSTTIME20', '20%', 'Get 20% off on your first booking.', 1),
    ('WEEKENDSALE10', '10%', 'Weekend sale: Enjoy 10% off on all bookings.', 2),
    ('FREESHIPPING', 'Free', 'Free shipping on orders over $50.', 1),
    ('LOYALTY25', '25%', 'Loyalty reward: Get 25% off on your next purchase.', 2),
    ('SUMMERDEAL15', '15%', 'Special summer deal: Save 15% on selected items.', 1);

INSERT INTO user_coupon (user_id, coupon_id) 
VALUES 
    (1, 1),
    (2, 2),
    (1, 3),
    (2, 4),
    (1, 5),
    (3, 1),
    (2, 3);

