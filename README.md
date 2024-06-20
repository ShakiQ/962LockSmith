
#########index.html
#########index.html
#########index.html
The  HTML code represents a web page for a locksmith service company named "962LockSmith." Below is a structured description of its components and functionality:

HTML Structure Overview
Document Type and Language
DOCTYPE Declaration: Declares the document type as HTML5.
Language Attribute: Specifies the language as English.
Meta Information
Charset: Sets the character encoding to UTF-8.
Viewport: Ensures proper scaling on different devices.
Title and Styling
Title: Displays "962LockSmith - Your Reliable Locksmith Service" in the browser tab.
CSS Styling: Defines the visual appearance of the page using embedded styles and an external stylesheet (style.css).
Body Structure
Background and Text Styling: Sets the background color to black (#000) and text color to gold (#FFD700). Uses the 'Trebuchet MS' font for readability.
Container: Provides padding around the page content.
Header Section
Header: Displays a centered header with a background color of dark grey (#111), containing:
H1: Main title "Welcome to 962LockSmith".
Paragraph: Brief introduction "We are your reliable locksmith service provider."
Sections
About Us Section (#description):

H2: Subtitle "About Us".
Paragraph: Describes the services offered by 962LockSmith, including emergency lockout assistance, lock repairs, key duplication, and security system installations.
Our Services Section (#services):

H2: Subtitle "Our Services".
Unordered List: Lists various locksmith services provided by the company.
Request a Service Section (#create-job):

H2: Subtitle "Request a Service".
Form: Allows users to submit service requests:
Input Fields: Collects client name, desired service description, preferred time and date, phone number, and address.
Submit Button: Initiates the form submission.
Button Link
Employee Portal Button: Positioned below the main content, linking to employee.html, styled as a yellow button (#FFD700) with black text, transitioning to a lighter shade (#FFC700) on hover.
Script
JavaScript Function (createJob):
Event Handling: Captures form submission events to handle job creation requests.
Asynchronous Request: Utilizes fetch API to POST form data (client-name, job-description, timeAndDate, phone-number, address) to the backend server (http://localhost:3000/jobs).
Response Handling: Processes server responses:
On success (200 OK), displays a confirmation message ("Request sent") and clears the form.
On failure, alerts the user with an error message retrieved from the server.
External Script
server.js: Linked JavaScript file, likely containing backend logic for handling job requests and interacting with a database or file system.
Purpose
This HTML document serves as the front-facing interface for customers of 962LockSmith, providing information about the company, its services, and a convenient form for clients to request locksmith services. The design emphasizes usability with clear sections and a straightforward submission process, supported by client-side scripting for interactive functionality.



############employee.html
############employee.html
############employee.html
This HTML document represents a login page for a web application, focusing on authentication and navigation. Here's a detailed description of its structure and functionality:

HTML Structure Overview
Document Type and Language
DOCTYPE Declaration: Declares the document type as HTML5.
Language Attribute: Specifies the language as English.
Meta Information
Charset: Sets the character encoding to UTF-8.
Viewport: Ensures proper scaling on different devices.
Title and Styling
Title: Displays "Login Page" in the browser tab.
CSS Styling: Defines the visual appearance of the page using embedded styles and an external stylesheet (style.css).
Body Structure
Background and Text Styling: Sets the background color to black (#000) and text color to gold (#FFD700). Uses the 'Trebuchet MS' font for readability.
Container: Centralizes the login form and styling within a 400px wide, centered container with a dark background, padding, and rounded corners.
Header Section
H2: Displays "Login" at the top center of the container.
Login Form
Form (#loginForm): Handles user login:
Username Input: Accepts username input.
Password Input: Accepts password input (masked).
Submit Button: Initiates form submission to authenticate the user.
Error Message Display
Error Message (#loginError): Displays validation errors or authentication failure messages in case of incorrect credentials.
Navigation Buttons
Buttons Section (div.buttons): Provides quick access to other functionalities:
Add New Job Button: Redirects to jobAdded.html.
View Jobs by Worker Button: Redirects to jobByWorkerDetails.html.
View All Jobs Button: Redirects to jobDetails.html.
JavaScript Functions
Login Function (login(event)):
Event Handling: Captures form submission events to handle login attempts.
Async Request: Uses fetch API to POST username and password to the server (http://localhost:3000/login).
Response Handling: Processes server responses:
On success (200 OK), stores JWT token and username in localStorage and redirects to dashboard.html.
On failure, displays error messages returned from the server.
Navigation Functions
Navigation Functions: Redirect users to specific pages based on button clicks:
loadAddJobPage(): Redirects to jobAdded.html.
loadJobsByWorkerPage(): Redirects to jobByWorkerDetails.html.
loadAllJobsPage(): Redirects to jobDetails.html.
Window Load Event
Window Load Event: Checks if a valid token is stored in localStorage:
Makes a GET request to http://localhost:3000/protected with the token for authentication.
On success, redirects to dashboard.html based on the stored username.
Redirects to login page if token is invalid or missing.
Purpose
This HTML document serves as the login interface for a web application, providing secure authentication via username and password. It incorporates error handling for invalid login attempts and facilitates user navigation to other sections of the application upon successful login. The integration of JavaScript ensures seamless interaction with the server for authentication and redirects based on user actions.


###########dashboard.html
###########dashboard.html
###########dashboard.html

This HTML document represents a user dashboard page for a web application, focusing on displaying job details and providing interaction functionalities. Here’s a detailed description of its structure and functionality:

HTML Structure Overview
Document Type and Language
DOCTYPE Declaration: Declares the document type as HTML5.
Language Attribute: Specifies the language as English.
Meta Information
Charset: Sets the character encoding to UTF-8.
Viewport: Ensures proper scaling on different devices.
Title and Styling
Title: Displays "User Dashboard" in the browser tab.
CSS Styling: Defines the visual appearance of the page using embedded styles and an external stylesheet (Style.css).
Body Structure
Background and Text Styling: Sets the background color to black (#000) and text color to gold (#FFD700). Uses the 'Trebuchet MS' font for readability.
Header Section
Header (header): Contains profile information and navigation buttons:
Profile: Displays a profile picture and provides a "Sign Out" button.
Navigation Button: Redirects to the main page (index.html).
Main Section
Main (main): Contains the main content of the dashboard.
Jobs Section (section.jobs): Displays a list of jobs.
Job List (ul#jobList): Dynamically populated with job details fetched via JavaScript.
Job Details (div.job-details): Displays each job's details including ID, client name, service, phone number, address, time and date, and description.
Job Actions (div.job-actions): Provides buttons for editing and deleting each job.
JavaScript Functionality
fetchJobsForWorker(workerId):

Fetches Jobs: Retrieves job data from http://localhost:3000/jobs.
Filters Jobs: Filters jobs based on the worker's ID to display only relevant jobs.
Populates Job List: Dynamically creates HTML elements (li) for each job and appends them to the job list (ul#jobList).
Edit and Delete Actions: Provides functionality for editing (loadEditPage(id)) and deleting (deleteJob(id)) jobs.
deleteJob(id):

Deletes Job: Sends a DELETE request to http://localhost:3000/jobs/{id} to delete a job.
Refreshes Page: Reloads the page (location.reload()) after deletion to reflect changes.
loadEditPage(id):

Redirects: Redirects the user to http://localhost:3000/jobUpdated.html?id={id} for editing a specific job.
signOut():

Clears Local Storage: Clears stored tokens and user data (localStorage.clear()).
Redirects: Redirects the user to the login page (employee.html).
DOMContentLoaded Event Listener:

Extracts Worker ID: Parses the URL to extract the worker's ID.
Fetches Jobs: Calls fetchJobsForWorker(workerId) to populate the job list upon page load.
Purpose
This HTML document serves as the user dashboard interface for a web application, specifically tailored to display jobs assigned to a particular worker. It integrates dynamic fetching of job data, interactive editing and deleting functionalities, and seamless navigation controls. The use of JavaScript ensures real-time updates and user-friendly interactions, enhancing the overall usability of the dashboard.





############jobAdded.html
############jobAdded.html
############jobAdded.html


This HTML document represents a form for adding a new job to a system, integrated with JavaScript for dynamic functionality. Below is a detailed description of its structure and functionality:

HTML Structure Overview
Document Type and Language
DOCTYPE Declaration: Specifies the document type as HTML5.
Language Attribute: Sets the language to English.
Meta Information
Charset: Declares the character encoding as UTF-8.
Viewport: Ensures proper scaling on different devices.
Title and Styling
Title: Displays "Add New Job" in the browser tab.
CSS Styling: Defines the visual appearance of the page using embedded styles and an external stylesheet (style.css).
Body Structure
Background and Text Styling: Sets the background color to black (#000) and text color to gold (#FFD700). Uses the 'Trebuchet MS' font for consistency.
Container (div.container)
Max Width and Alignment: Centers the container with a maximum width of 400 pixels.
Background and Padding: Sets a dark background color (#111) with padding for content spacing.
Border Radius and Shadow: Adds rounded corners (border-radius) and a subtle box shadow for depth.
Heading (h1)
Font Size and Alignment: Displays "Add New Job" with a larger font size aligned to the left.
Color: Styled in gold (#FFD700) for visibility.
Form (form#addJobForm)
Form Group (div.form-group): Groups form elements for styling and structure.
Label and Input Fields: Labels (label) for inputs (input and textarea) with appropriate placeholders and required attributes.
Select Dropdown (select#worker-id)
Assign to Worker: Provides a dropdown menu to select a worker, populated dynamically using JavaScript.
Button Group (div.button-group)
Action Buttons: Includes buttons for submitting the form (Add Job), navigating back (Go Back), and returning to the main page (Main Page).
Job Added Feedback (div#jobAdded)
Feedback Section: Displays a message (h3) confirming successful job addition upon submission.
JavaScript Functionality
addJob(event)
Event Handling: Prevents the default form submission behavior (event.preventDefault()).
Form Data Handling: Retrieves form data using FormData and converts it to a plain object (plainFormData).
POST Request: Sends a POST request to http://localhost:3000/jobs with JSON data (JSON.stringify(plainFormData)).
Response Handling: Displays a success message (Job Added Successfully) upon successful submission and resets the form.
window.onload
Dropdown Population: Loads worker options dynamically from http://localhost:3000/workers upon page load.
Options Creation: Iterates through fetched data to create option elements for the select dropdown.
Purpose
This HTML document serves as an interface for users to add new job details into a system. It ensures user-friendly interaction with structured input fields, dynamic worker assignment via a dropdown, and immediate feedback upon job addition. The integration of JavaScript enhances functionality by facilitating asynchronous data fetching and form submission handling, thereby improving the overall user experience.



#############jobByWorkerDwtails.html
#############jobByWorkerDwtails.html
#############jobByWorkerDwtails.html


This HTML document provides a user interface to retrieve jobs based on a worker's ID. It utilizes JavaScript for fetching data from a server and dynamically displaying the results. Below is a breakdown of its structure and functionality:

HTML Structure Overview
Document Type and Language
DOCTYPE Declaration: Specifies the document type as HTML5.
Language Attribute: Sets the language to English.
Meta Information
Charset: Declares the character encoding as UTF-8.
Viewport: Ensures proper scaling on different devices.
Title and Styling
Title: Displays "Get Jobs by Worker ID" in the browser tab.
CSS Styling: Defines the visual appearance of the page using embedded styles and an external stylesheet (style.css).
Body Structure
Background and Text Styling: Sets the background color to black (#000) and text color to gold (#FFD700). Uses the 'Trebuchet MS' font for consistency.
Container (div.container)
Max Width and Alignment: Centers the container with a maximum width of 400 pixels.
Background and Padding: Sets a dark background color (#111) with padding for content spacing.
Border Radius and Shadow: Adds rounded corners (border-radius) and a subtle box shadow for depth.
Heading (h1)
Font Size and Alignment: Displays "Get Jobs by Worker ID" with a larger font size centered horizontally.
Color: Styled in gold (#FFD700) for visibility.
Form (form#getJobByWorkerForm)
Form Group (div.form-group): Groups form elements for styling and structure.
Label and Input Field: Labels (label) for worker ID input (input[type="text"]) with required attribute.
Button (button)
Action Button: Submits the form to fetch jobs based on the entered worker ID.
Job Details Container (div#jobByWorkerDetails)
Results Container: Displays retrieved job details dynamically using JavaScript.
Navigation Buttons (div.buttons)
Button Group: Provides buttons to navigate back to the previous page (Go Back) or to the home page (Home).
JavaScript Functionality
getJobsByWorker(event)
Event Handling: Prevents the default form submission behavior (event.preventDefault()).
Fetch Jobs: Performs a GET request to http://localhost:3000/jobs to retrieve all jobs.
Filter Jobs: Filters retrieved jobs based on the entered worker ID (workerId).
Display Results: Dynamically creates HTML elements (div.job-container) for each job matching the worker ID and appends them to jobByWorkerDetails.
goBack()
Navigation: Uses window.history.back() to navigate to the previous page in the browsing history.
goHome()
Navigation: Redirects the user to the home page (index.html) using window.location.href.
Purpose
This HTML document serves as a front-end interface for users to query and view jobs associated with a specific worker ID. It ensures user-friendly interaction with structured input fields, dynamic data fetching, and immediate feedback through dynamically generated job details. The integration of JavaScript enhances functionality by enabling asynchronous data retrieval and responsive navigation, thereby improving the overall user experience.




###########jobDetails.html
###########jobDetails.html
###########jobDetails.html

This HTML document creates a page to display details of all jobs fetched from a server. It utilizes JavaScript to dynamically populate job details and provides navigation buttons for user interaction. Here’s a breakdown of its structure and functionality:

HTML Structure Overview
Document Type and Language
DOCTYPE Declaration: Specifies the document type as HTML5.
Language Attribute: Sets the language to English.
Meta Information
Charset: Declares the character encoding as UTF-8.
Viewport: Ensures proper scaling on different devices.
Title and Styling
Title: Displays "All Jobs Details" in the browser tab.
CSS Styling: Defines the visual appearance of the page using embedded styles and an external stylesheet (style.css).
Body Structure
Background and Text Styling: Sets the background color to black (#000) and text color to gold (#FFD700). Utilizes the 'Trebuchet MS' font for consistency.
Container (div.container)
Max Width and Alignment: Centers the container with a maximum width of 800 pixels.
Background and Padding: Sets a dark background color (#111) with padding for content spacing.
Border Radius and Shadow: Adds rounded corners (border-radius) and a subtle box shadow for depth.
Heading (h1)
Font Size and Alignment: Displays "All Jobs Details" with a larger font size centered horizontally.
Color: Styled in gold (#FFD700) for visibility.
Job Details Container (div#jobDetails)
Results Container: Will be dynamically populated with job details fetched using JavaScript.
Navigation Buttons (div.navigation-buttons)
Button Group: Provides buttons to navigate back to the previous page (Go Back) or to the home page (Home).
JavaScript Functionality
getAllJobs()
Asynchronous Fetch: Sends a GET request to http://localhost:3000/jobs to retrieve all jobs.
Response Handling: Converts the response to JSON format (await response.json()) and iterates through each job.
Dynamic HTML Creation: For each job, creates a div element (jobDiv) containing details such as ID, client name, service, phone number, address, and time/date.
Appending to DOM: Appends each jobDiv to the jobDetails container in the HTML.
goBack()
Navigation: Uses window.history.back() to navigate to the previous page in the browsing history.
goHome()
Navigation: Redirects the user to the home page (index.html) using window.location.href.
DOMContentLoaded Event Listener
Page Initialization: Calls getAllJobs() when the DOM content is fully loaded, ensuring that jobs are fetched and displayed immediately upon page load.
Purpose
This HTML document serves as a frontend interface for users to view all job details stored on a server. It leverages asynchronous JavaScript to fetch data dynamically and update the UI in real-time. The navigation buttons provide intuitive controls for users to navigate between pages efficiently. The overall design emphasizes clarity and user-friendly interaction, enhancing the browsing experience for managing and reviewing job information.


###########server.json
###########server.json
###########server.json


This documentation covers the backend API implemented using Node.js, Express, JWT for authentication, and bcrypt for password hashing. The application provides endpoints for managing jobs and workers in a locksmith service company, as well as authentication mechanisms for secure access.

Middleware
CORS Middleware: Allows cross-origin requests by setting appropriate headers.
JSON Parsing Middleware: Parses incoming JSON requests.
Static File Serving Middleware: Serves static files from the public directory.
Configuration
SECRET_KEY: A secret key used for signing JWT tokens.
users: A predefined list of users with hashed passwords for demonstration purposes.
Routes
Authentication
POST /login
Description: Authenticates a user and returns a JWT token.
Request Body: Requires username and password fields.
Response:
200 OK: Returns a JWT token.
401 Unauthorized: Invalid username or password.
Protected Routes
GET /protected
Description: A protected route that requires a valid JWT token.
Headers: Requires an Authorization header with the JWT token.
Response:
200 OK: Returns a message and the user ID.
403 Forbidden: No token provided.
500 Internal Server Error: Failed to authenticate token.
Jobs
GET /jobs

Description: Retrieves all jobs.
Response:
200 OK: Returns a list of jobs.
500 Internal Server Error: Error reading jobs file.
POST /jobs

Description: Adds a new job.
Request Body: Requires job details except for the id field.
Response:
201 Created: Returns the newly created job.
500 Internal Server Error: Error adding job.
GET /jobs/

Description: Retrieves a single job by its ID.
Response:
200 OK: Returns the job.
404 Not Found: Job not found.
500 Internal Server Error: Error reading jobs file.
PUT /jobs/

Description: Updates an existing job by its ID.
Request Body: Requires the updated job details.
Response:
200 OK: Returns a success message and the updated job.
404 Not Found: Job not found.
500 Internal Server Error: Error updating job.
DELETE /jobs/

Description: Deletes a job by its ID.
Response:
200 OK: Returns a success message.
500 Internal Server Error: Error deleting job.
GET /jobs/workers/

Description: Retrieves all jobs assigned to a specific worker by the worker's ID.
Response:
200 OK: Returns a list of jobs.
404 Not Found: No jobs found for the worker.
500 Internal Server Error: Error reading jobs file.
Workers
GET /workers

Description: Retrieves all workers.
Response:
200 OK: Returns a list of workers.
500 Internal Server Error: Error reading workers file.
GET /workers/

Description: Retrieves a single worker by their ID.
Response:
200 OK: Returns the worker.
404 Not Found: Worker not found.
500 Internal Server Error: Error reading workers file.
Running the Server
PORT: The server listens on a port specified by the environment variable PORT or defaults to port 3000.
Start the server: Run the server using npm start.
Example Usage
Login:
Request: POST to /login with JSON body {"username": "1", "password": "1"}.
Response: { "token": "your_jwt_token" }
Access Protected Route:
Request: GET to /protected with Authorization header Bearer your_jwt_token.
Response: { "message": "This is a protected route", "userId": "1" }
Retrieve Jobs:
Request: GET to /jobs.
Response: [{ "client-name": "Client1", "phone-number": "111111111", "service": "Lockout", "address": "1234 ABC Street", "timeAndDate": "2023-06-19T08:00", "description": "Locked out of house", "worker-id": 1, "id": 1 }, ...]
Add Job:
Request: POST to /jobs with job details.
Response: 201 Created with the newly created job object.
This backend API provides a secure and organized way to manage jobs and workers, ensuring authentication for protected routes and efficient handling of job-related data.



#############worker.json
#############worker.json
#############worker.json


This JSON file contains information about the workers in a locksmith service company. Each worker object includes personal details and a unique identifier. Below is a detailed description of the structure and fields within the provided JSON file.

JSON Structure
The JSON file is an array of worker objects. Each worker object contains the following fields:

id: A unique identifier for the worker.
first-name: The first name of the worker.
last-name: The last name of the worker.
phone-number: The contact phone number of the worker.
username: The username assigned to the worker.


#############package.json
#############package.json
#############package.json

The file is an essential component of a Node.js project. It contains metadata relevant to the project and manages the project's dependencies. Below is a detailed description of the structure and fields within the provided package.json file.

JSON Structure
The package.json file includes the following main sections:

Metadata (such as name, version, description)
Scripts
Keywords, author, license
Dependencies
Detailed Description of Fields
name: A string representing the name of the project. In this case, it is "backend".
version: A string representing the current version of the project, following semantic versioning. Here it is "1.0.0".
description: A string that provides a brief description of the project. This field is currently empty.
main: A string specifying the entry point file of the application. Here it is "server.js".
scripts: An object containing script commands that can be run using npm run <script-name>. In this case:
"test": A placeholder script that prints an error message.
"start": A script to start the application using Node.js by running node server.js.
keywords: An array of strings representing keywords related to the project. This field is currently empty.
author: A string representing the author of the project. This field is currently empty.
license: A string specifying the license type for the project. Here it is "ISC".
dependencies: An object listing the project's dependencies, each with a specified version. Dependencies are libraries required for the project to run. In this case:
"bcrypt": ^5.1.1 - A library for hashing passwords.
"body-parser": ^1.20.2 - Middleware for parsing incoming request bodies.
"cors": ^2.8.5 - Middleware for enabling Cross-Origin Resource Sharing.
"express": ^4.19.2 - A web application framework for Node.js.
"fs": ^0.0.1-security - A package to interact with the file system (note: fs is a built-in Node.js module, and this dependency is generally unnecessary).
"jsonwebtoken": ^8.5.1 - A library for generating and verifying JSON Web Tokens.
"nodemon": ^3.1.3 - A utility that monitors for changes in source files and automatically restarts the server.

#############jobs.json
#############jobs.json
#############jobs.json

This file contains a detailed schedule of jobs assigned to various workers in a locksmith service company for the date June 19, 2023. Each job entry includes client information, the type of service required, location details, and other relevant metadata. Below is a description of the structure and fields in the JSON file.

JSON Structure
The JSON file is an array of job objects. Each job object contains the following fields:

client-name: The name of the client requesting the service.
phone-number: The contact phone number of the client.
service: The type of locksmith service required.
address: The address where the service is to be performed.
timeAndDate: The scheduled date and time for the service.
description: A brief description of the issue or service required.
worker-id: The ID of the worker assigned to perform the job.
id: A unique identifier for the job.


###################Style.CSS
###################Style.CSS
###################Style.CSS

The CSS file defines a modern and sleek dark-themed user interface. It features a cohesive color scheme, with primary colors being black and white, accented by green shadows and red buttons. Here's a breakdown of the key styles and their functions:

Global Styles
body: The base font is 'Trebuchet MS', with a white font color on a black background for a high-contrast look. Margins and paddings are reset, and a line-height of 1.8 ensures good readability.
container: The main content area is centered, with a maximum width of 800px, dark background, padding, rounded corners, and a green shadow.
Layout and Components
logo: Centered flexbox layout for any logo or branding elements.
headings (h1, h2): Uniform font size, margin, and color to maintain consistency and readability, centered text for focus.
form elements: Inputs and textareas are styled with consistent width, padding, margin, border, and background. Rounded corners add a modern touch.
Buttons and Interactivity
buttons: Red background with white text, padding, rounded corners, and smooth transition effects on hover. Disabled state styling ensures clarity when buttons are not interactive.
error-message: Distinct orange-red color to alert users to issues.
Specific Elements and Containers
job-details, job-container: Additional styling for job-related content, with a dark background, padding, margin, and rounded corners, plus a subtle shadow for depth.
profile images: Small, circular images for user profiles, adding a personal touch.
Responsive and Accessible Design
Ensuring form elements are at least 50% width helps maintain usability on various screen sizes.
Hover effects on buttons enhance interactivity and provide visual feedback.
Additional Notes
header: Clear separation from the main content with a slightly lighter background and a bottom border.
navigation-buttons and job-actions: Consistent button styling across navigation and action sections, promoting uniformity.
This CSS creates a visually appealing and functional interface, suitable for modern web applications. The consistent use of colors, rounded corners, and shadows contributes to a cohesive design language. If you have specific requirements or additional elements to style, feel free to ask for further customization.