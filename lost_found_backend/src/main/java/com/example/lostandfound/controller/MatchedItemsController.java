package com.example.lostandfound.controller;

import com.example.lostandfound.model.LostReport;
import com.example.lostandfound.model.FoundReport;
import com.example.lostandfound.service.LostReportService;
import com.example.lostandfound.service.FoundReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/matched-items")
@CrossOrigin(origins = "*")
public class MatchedItemsController {

    @Autowired
    LostReportService lostReportService;
    @Autowired
    FoundReportService foundReportService;

    // This REST endpoint returns a list of matched lost/found pairs
    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> getAllMatchedItems() {
        List<LostReport> lostItems = lostReportService.getAllReports();
        List<FoundReport> foundItems = foundReportService.getAllReports();
        List<Map<String, Object>> matches = new ArrayList<>();

        for (LostReport lost : lostItems) {
            for (FoundReport found : foundItems) {
                if (lost.getItemName() != null && found.getItemName() != null &&
                        lost.getLocation() != null && found.getLocation() != null &&
                        lost.getItemName().trim().equalsIgnoreCase(found.getItemName().trim()) &&
                        lost.getLocation().trim().equalsIgnoreCase(found.getLocation().trim())) {

                    Map<String, Object> matched = new HashMap<>();
                    matched.put("lost", lost);
                    matched.put("found", found);
                    matches.add(matched);
                }
            }
        }
        return new ResponseEntity<>(matches, HttpStatus.OK);
    }
}
