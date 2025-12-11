package com.example.lostandfound.controller;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {
    private final Map<String, List<ChatMessage>> chatStore = new HashMap<>(); // Use database for production

    @GetMapping("/{lostId}/{foundId}")
    public List<ChatMessage> fetchMessages(@PathVariable Long lostId, @PathVariable Long foundId) {
        String key = lostId + "_" + foundId;
        return chatStore.getOrDefault(key, new ArrayList<>());
    }

    @PostMapping("/{lostId}/{foundId}")
    public List<ChatMessage> sendMessage(@PathVariable Long lostId, @PathVariable Long foundId, @RequestBody ChatMessage m) {
        String key = lostId + "_" + foundId;
        chatStore.computeIfAbsent(key, k -> new ArrayList<>()).add(m);
        return chatStore.get(key);
    }
}

// Model class
class ChatMessage {
    public String sender;
    public String message;
}
