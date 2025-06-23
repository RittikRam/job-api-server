package com.rittik.springbootRest.service;

import com.rittik.springbootRest.model.JobPost;
import com.rittik.springbootRest.repo.JobRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class JobServiceTest {

    @Mock
    private JobRepo repo;

    @InjectMocks
    private JobService jobService;

    @Test
    void testGetAllJobs() {
        List<JobPost> jobList = List.of(
                new JobPost(1, "Java Developer", "Backend Role", 2, List.of("Java", "Spring Boot")),
                new JobPost(2, "React Developer", "Frontend Role", 1, List.of("React", "JS"))
        );
        when(repo.findAll()).thenReturn(jobList);

        List<JobPost> result = jobService.getAllJobs();

        assertEquals(2, result.size());
        verify(repo, times(1)).findAll();
    }

    @Test
    void testAddJob() {
        JobPost job = new JobPost(3, "DevOps Engineer", "Cloud role", 3, List.of("AWS", "Docker"));
        when(repo.save(job)).thenReturn(job);

        JobPost savedJob = jobService.addJob(job);

        assertNotNull(savedJob);
        assertEquals("DevOps Engineer", savedJob.getPostProfile());
        verify(repo, times(1)).save(job);
    }

    @Test
    void testGetJobById() {
        JobPost job = new JobPost(4, "Frontend Dev", "UI role", 2, List.of("HTML", "CSS", "JS"));
        when(repo.findById(4)).thenReturn(Optional.of(job));

        JobPost result = jobService.getJob(4);

        assertNotNull(result);
        assertEquals("Frontend Dev", result.getPostProfile());
        verify(repo, times(1)).findById(4);
    }

    @Test
    void testDeleteJob() {
        int jobId = 5;

        jobService.deleteJob(jobId);

        verify(repo, times(1)).deleteById(jobId);
    }

    @Test
    void testLoad_shouldCallSaveAllWithFiveJobs() {
        // when
        jobService.load();

        // then
        ArgumentCaptor<List<JobPost>> captor = ArgumentCaptor.forClass(List.class);
        verify(repo, times(1)).saveAll(captor.capture());

        List<JobPost> savedJobs = captor.getValue();
        assertEquals(5, savedJobs.size());

        // Optional: Check first job title
//        assertEquals("Java Developer", savedJobs.get(0).getTitle());
        assertEquals("Java Developer", savedJobs.get(0).getPostProfile());

    }

}
