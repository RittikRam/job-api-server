package com.rittik.springbootRest.model;


import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	private List<String> postTechStack;


	

}
