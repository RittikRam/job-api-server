package com.rittik.springbootRest.model;


import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import org.springframework.stereotype.Component;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
@Entity
public class JobPost {
	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int postId;
	private String postProfile; 
	private String postDesc;
	private Integer reqExperience;
	@ElementCollection
	@CollectionTable(name = "job_post_tech_stack", joinColumns = @JoinColumn(name = "job_post_id"))
	@Column(name = "tech_stack_item")
	private List<String> postTechStack;


	

}
