package com.myapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.model.MessageModel;
import com.myapp.storage.UserStorage;

@RestController
public class MessageController {
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;
	
	@MessageMapping("/chat/{to}")
	public void sendMessage(@DestinationVariable String to, MessageModel message) {
		System.out.println("handling send message: " + message + " to: " + to);
		boolean isExists = UserStorage.getInstance().getUsers().contains(to);
		if(isExists) {
			simpMessagingTemplate.convertAndSend("/topic/messages" + to, message);
		}
	}
}
