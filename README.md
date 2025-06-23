# 🧠 Job API Server

A Spring Boot REST API for managing job postings.  
Supports full CRUD operations and uses **PostgreSQL** for persistent storage.

---

## 🚀 Features

- Create, Read, Update, Delete (CRUD) job posts
- Search job posts by keyword
- Load dummy job data using a special endpoint
- Integrated with PostgreSQL
- Unit & integration testing with high code coverage (97%)

---

## 🧱 Tech Stack

- Java 21
- Spring Boot
- Spring Data JPA
- PostgreSQL (or H2 for tests)
- Maven
- JUnit 5
- Mockito
- MockMvc
- JaCoCo (for test coverage)

---

## 📁 Project Structure

springbootRest/
├── src/
│ ├── main/
│ │ └── java/com/rittik/springbootRest/
│ │ ├── model/ # JobPost.java
│ │ ├── repo/ # JobRepo.java
│ │ ├── service/ # JobService.java
│ │ └── controller/ # JobRestController.java
│ └── test/
│ └── controller/ # JobRestControllerIntegrationTest.java
│ └── service/ # JobServiceTest.java
├── pom.xml
└── README.md


---

## 🔗 API Endpoints

| Method | Endpoint                      | Description                     |
|--------|-------------------------------|---------------------------------|
| GET    | `/api/jobPosts`              | Get all job posts               |
| GET    | `/api/jobPost/{postId}`      | Get job post by ID              |
| POST   | `/api/jobPost`               | Create a new job post           |
| PUT    | `/api/jobPost`               | Update an existing job post     |
| DELETE | `/api/jobPost/{postId}`      | Delete job post by ID           |
| GET    | `/api/jobPosts/keyword/{kw}` | Search job posts by keyword     |
| GET    | `/api/load`                  | Load sample job data            |

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

⚙️ How to Run Locally
1️⃣ Clone the Repository
git clone https://github.com/RittikRam/job-api-server.git
cd job-api-server
2️⃣ Configure PostgreSQL in application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/jobdb
spring.datasource.username=your_pg_username
spring.datasource.password=your_pg_password
spring.jpa.hibernate.ddl-auto=update
3️⃣ Run the Application
./mvnw spring-boot:run
App will be live at: http://localhost:8080
✅ How to Run Tests
Use Maven to run all unit and integration tests:
mvn test
To generate the JaCoCo coverage report:
mvn jacoco:report
Then open the report:
target/site/jacoco/index.html
📊 JaCoCo Code Coverage Report
✅ Achieved 97% overall coverage including controller & service tests.
![image](https://github.com/user-attachments/assets/b2d608dc-7fd7-4b6e-94f7-9abc1355d33d)

📘 Sample curl Commands
# Get all jobs
curl http://localhost:8080/api/jobPosts

# Add a new job
curl -X POST -H "Content-Type: application/json" \
  -d '{"postId":6,"postProfile":"SDE","postDesc":"Full stack role","reqExperience":2,"postTechStack":["Java","React"]}' \
  http://localhost:8080/api/jobPost
✍️ Author
Rittik Ram
Learning Spring Boot & DSA | Java Backend Developer
📍 GitHub: @RittikRam
🛠 Technologies Used
Java 21

Spring Boot

Spring Data JPA

PostgreSQL

JUnit, Mockito, MockMvc

JaCoCo

Postman / curl (API testing)
