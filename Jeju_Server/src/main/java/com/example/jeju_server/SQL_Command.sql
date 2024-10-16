CREATE TABLE user (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      email VARCHAR(255) NOT NULL UNIQUE,
                      password VARCHAR(255) NOT NULL,
                      name VARCHAR(100) NOT NULL,
                      role_name VARCHAR(50) NOT NULL,
                      enabled BOOLEAN NOT NULL
);