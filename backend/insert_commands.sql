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