package com.example.lostandfound.controller;

import com.example.lostandfound.model.DirectChatRequest;
import com.example.lostandfound.model.DirectChatRequestStatus;
import com.example.lostandfound.model.User;
import com.example.lostandfound.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/direct-chat")
@CrossOrigin(origins = "*")
public class DirectChatController {

    @Autowired
    private UserRepository userRepository;

    // key: "emailA_emailB" (sorted alphabetically)
    private final Map<String, DirectChatRequest> requestStore = new HashMap<>();
    // simple message store: key -> list of messages
    private final Map<String, List<Map<String, String>>> messageStore = new HashMap<>();

    private String key(String a, String b) {
        List<String> list = Arrays.asList(a, b);
        Collections.sort(list);
        return list.get(0) + "_" + list.get(1);
    }

    // List all users (for sidebar)
    @GetMapping("/users")
    public List<User> listUsers() {
        return userRepository.findAll();
    }

    // Get current request between two users (if any)
    @GetMapping("/request")
    public DirectChatRequest getRequest(
            @RequestParam String userA,
            @RequestParam String userB) {
        return requestStore.get(key(userA, userB));
    }

    // Send request from one user to another
    @PostMapping("/request")
    public DirectChatRequest sendRequest(@RequestBody DirectChatRequest req) {
        String k = key(req.getFromEmail(), req.getToEmail());
        req.setStatus(DirectChatRequestStatus.PENDING);
        requestStore.put(k, req);
        return req;
    }

    // Accept request
    @PostMapping("/request/accept")
    public DirectChatRequest acceptRequest(@RequestParam String userA, @RequestParam String userB) {
        String k = key(userA, userB);
        DirectChatRequest req = requestStore.get(k);
        if (req != null) {
            req.setStatus(DirectChatRequestStatus.ACCEPTED);
        }
        return req;
    }

    // List messages between two users
    @GetMapping("/messages")
    public List<Map<String, String>> getMessages(
            @RequestParam String userA,
            @RequestParam String userB) {
        return messageStore.getOrDefault(key(userA, userB), new ArrayList<>());
    }

    // Send message between two users
    @PostMapping("/messages")
    public List<Map<String, String>> sendMessage(
            @RequestParam String userA,
            @RequestParam String userB,
            @RequestBody Map<String, String> payload) {
        String k = key(userA, userB);
        messageStore.computeIfAbsent(k, kk -> new ArrayList<>()).add(payload);
        return messageStore.get(k);
    }
}
