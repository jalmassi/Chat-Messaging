package com.myapp.controller;

import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.storage.UserStorage;

@RestController
@CrossOrigin
public class UsersController {

	@GetMapping("/registration/{userName}")
	public ResponseEntity<Void> register(@PathVariable String userName){
		System.out.println("handling register user request: " + userName);
		try {
			UserStorage.getInstance().setUser(userName);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok().build();
	}
	
	@GetMapping("/fetchAllUsers")
	public Set<String> fetchAll(){

		return UserStorage.getInstance().getUsers();
	}
}
