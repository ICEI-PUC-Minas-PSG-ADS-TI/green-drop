CREATE TABLE users (
    id             SERIAL PRIMARY KEY,
    name           VARCHAR(100) NOT NULL UNIQUE,
    password_hash  VARCHAR(255) NOT NULL,
    phone          VARCHAR(20) NOT NULL UNIQUE,
    email		   VARCHAR(100) NOT NULL UNIQUE,
    photo_url      VARCHAR(255),
    role           VARCHAR(50) NOT NULL,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    firebase_uid   VARCHAR(100) NOT NULL UNIQUE,
    private        INTEGER DEFAULT 0 NOT NULL
);
