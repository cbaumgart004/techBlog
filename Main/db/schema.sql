
DROP DATABASE IF EXISTS techblog_db;

CREATE DATABASE techblog_db;
\c techblog_db;

-- Create the Users table
CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    role VARCHAR(10) DEFAULT 'user'  -- can be 'user' or 'admin'
    
);

-- Create the Blogs table
CREATE TABLE blog (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(255),
    status VARCHAR(10) DEFAULT 'draft',  -- can be 'draft', 'published', or 'archived'
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,  -- for soft deletes
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Create the Comments table (optional, if you want to add commenting functionality)
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    user_id INT NOT NULL,
    blog_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (blog_id) REFERENCES blog(id) ON DELETE CASCADE
);