package com.rittik.springbootRest.controller;

import com.rittik.springbootRest.model.JobPost;
import com.rittik.springbootRest.repo.JobRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class JobRestControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JobRepo jobRepo;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void cleanDatabase() {
        jobRepo.deleteAll();
    }

    @Test
    void testGetAllJobs() throws Exception {
        jobRepo.save(new JobPost(1001, "Test Role", "Desc", 2, List.of("Java")));

        mockMvc.perform(get("/api/jobPosts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void testAddJob() throws Exception {
        JobPost job = new JobPost(1002, "QA Engineer", "Test APIs", 1, List.of("JUnit", "Mockito"));

        mockMvc.perform(post("/api/jobPost")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(job)))
                .andExpect(status().isOk());

        // Optionally verify job was added
        mockMvc.perform(get("/api/jobPosts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].postProfile").value("QA Engineer"));
    }

    @Test
    void testGetJobById() throws Exception {
        JobPost job = new JobPost(1003, "Backend Dev", "Handles backend", 3, List.of("Spring", "PostgreSQL"));
        jobRepo.save(job);

        mockMvc.perform(get("/api/jobPost/{postId}", job.getPostId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.postProfile").value("Backend Dev"));
    }

    @Test
    void testSearchByKeyword() throws Exception {
        JobPost job1 = new JobPost(1004, "DevOps Engineer", "Handles CI/CD", 2, List.of("Docker", "Kubernetes"));
        JobPost job2 = new JobPost(1005, "Frontend Dev", "Builds UI", 2, List.of("React", "HTML", "CSS"));
        jobRepo.saveAll(List.of(job1, job2));

        mockMvc.perform(get("/api/jobPosts/keyword/{keyword}", "Dev"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void testUpdateJob() throws Exception {
        JobPost job = new JobPost(1006, "Backend Dev", "Old description", 3, List.of("Java", "Spring Boot"));
        jobRepo.save(job);

        // Update the description
        job.setPostDesc("Updated description");

        mockMvc.perform(put("/api/jobPost")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(job)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.postDesc").value("Updated description"));
    }
    @Test
    void testDeleteJob() throws Exception {
        JobPost job = new JobPost(1007, "DevOps Engineer", "Deploy and manage infra", 4, List.of("Docker", "Kubernetes"));
        jobRepo.save(job);

        mockMvc.perform(delete("/api/jobPost/" + job.getPostId()))
                .andExpect(status().isOk())
                .andExpect(content().string("Deleted"));

        mockMvc.perform(get("/api/jobPosts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }
    @Test
    void testLoadEndpoint() throws Exception {
        mockMvc.perform(get("/api/load"))
                .andExpect(status().isOk())
                .andExpect(content().string("Success"));

        // Verify jobs were loaded
        mockMvc.perform(get("/api/jobPosts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(5)); // Because your load() adds 5 jobs
    }






}
