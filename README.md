
# Nest Assignment

Nest Assignment

## Description

Create User collection 
	
Create user api
Update user api
Get users list api
Get user api by user id
Delete user by id
Search user api
List/Search api must contain pagination (limit of records, Page number)
	
Registration and Login Api using the User Collection

## Getting Started

### Dependencies

* Install the LTS version of nodejs from here:
 https://nodejs.org/en/download/

### Installing

* Clone the repo from:
https://github.com/himanpanu/nestjs_assignment.git

* Do the necessary changes in .env which includes changing the PORT and Database connection credentials.

### Executing program

* Go to the root folder of your application using:

~ cd nestjs_assignment


* To install the packages/dependencies run the following command:

npm i


Run the APIs in foreground using:

npm run start:dev


Hit the getCsrfToken API to get a csrf token and access rest of the APIs.

The URI is http://localhost:{PORT}

pass X-CSRF-Token in header for the rest of the APIs