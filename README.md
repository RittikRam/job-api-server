# 🧠 Job API Server

A Spring Boot REST API for managing job postings.  
Supports full CRUD operations and uses **PostgreSQL** for persistent storage.

---

## 🚀 Features

- Create, Read, Update, Delete (CRUD) job posts
- Search job posts by keyword
- Sample endpoint to load test data
- Integrated with PostgreSQL
- Built using Spring Boot, Spring Data JPA, Hibernate

---

## 🧱 Tech Stack

- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL (or H2 for testing)
- Maven
- RESTful APIs

---

## 📁 Project Structure

springbootRest/
├── src/
│ ├── main/
│ │ ├── java/
│ │ │ └── com.rittik.springbootRest/
│ │ │ ├── model/ --> JobPost.java
│ │ │ ├── repo/ --> JobRepo.java
│ │ │ ├── service/ --> JobService.java
│ │ │ └── controller/ --> JobRestController.java
│ │ └── resources/
│ │ └── application.properties
│ └── test/
│ └── SpringbootRestApplicationTests.java
├── pom.xml
└── README.md


---

## 🔗 API Endpoints

| Method | Endpoint                        | Description                     |
|--------|----------------------------------|---------------------------------|
| GET    | `/jobPosts`                     | Get all job posts               |
| GET    | `/jobPost/{postId}`             | Get job post by ID              |
| POST   | `/jobPost`                      | Create a new job post           |
| PUT    | `/jobPost`                      | Update an existing job post     |
| DELETE | `/jobPost/{postId}`             | Delete job post by ID           |
| GET    | `/jobPosts/keyword/{keyword}`   | Search job posts by keyword     |
| GET    | `/load`                         | Load test data (optional)       |

---

## 📦 Sample JSON for POST/PUT

```json
{
    "postId": 3,
    "postProfile": "Express.js Developer",
    "postDesc": "Experience in Express.js development",
    "reqExperience": 3,
    "postTechStack": [
        "Express.js Development",
        "Backend Development"
    ]
}

```
⚙️ Setup & Run
🧩 1. Clone the repo
git clone https://github.com/RittikRam/job-api-server.git
cd job-api-server

🛠️ 2. Configure PostgreSQL in application.properties
properties : 
spring.datasource.url=jdbc:postgresql://localhost:5432/jobdb
spring.datasource.username=your_pg_username
spring.datasource.password=your_pg_password
spring.jpa.hibernate.ddl-auto=update

▶️ 3. Run the Application : 
./mvnw spring-boot:run

App starts at: http://localhost:8080

🧪 Test with curl/Postman
curl http://localhost:8080/jobPosts
curl -X POST -H "Content-Type: application/json" \
     -d '{"postProfile":"SDE","desc":"Full stack role","techStack":"Java,React"}' \
     http://localhost:8080/jobPost

✍️ Author
Rittik Ram
Learning Spring Boot & DSA | Java Backend Developer
GitHub: @RittikRam

📘 API Documentation
🔹 Base URL : 
http://localhost:8080

🔹 Endpoints
➕ POST /jobPost
Description: Add a new job post
Request Body (JSON): 
{
  "postProfile": "DevOps Engineer",
  "desc": "Responsible for CI/CD pipelines",
  "techStack": "AWS, Docker, Jenkins",
  "reqExperience": "2+ years"
}
Response:
{
  "postId": 1,
  "postProfile": "DevOps Engineer",
  "desc": "Responsible for CI/CD pipelines",
  "techStack": "AWS, Docker, Jenkins",
  "reqExperience": "2+ years"
}

📄 GET /load
Description: Retrieve all job posts
Response:
[
  {
    "postId": 1,
    "postProfile": "DevOps Engineer",
    "desc": "Responsible for CI/CD pipelines",
    "techStack": "AWS, Docker, Jenkins",
    "reqExperience": "2+ years"
  }
]

✏️ PUT /updateJob/{id}
Description: Update an existing job by ID
Request Body (JSON):
{
  "postProfile": "Updated Role",
  "desc": "Updated description",
  "techStack": "Updated tech",
  "reqExperience": "5+ years"
}

Response:
{
  "postId": 1,
  "postProfile": "Updated Role",
  "desc": "Updated description",
  "techStack": "Updated tech",
  "reqExperience": "5+ years"
}

❌ DELETE /deleteJob/{id}
Description: Delete a job post by ID
Response:
Job post deleted successfully.

🧪 Testing
Use Postman or curl to test your endpoints.

Example using curl:curl -X GET http://localhost:8080/load
🛠 Technologies Used
Java 21

Spring Boot

Spring Data JPA

PostgreSQL

Postman (for API testing)

