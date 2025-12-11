package com.example.lostandfound.controller;

import com.example.lostandfound.model.FoundReport;
import com.example.lostandfound.service.FoundReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/report")
@CrossOrigin(origins = "*")
public class FoundReportController {

    @Autowired
    FoundReportService foundReportService;

    @PostMapping("/found")
    public ResponseEntity<?> reportFound(@RequestBody FoundReport foundReport) {
        FoundReport saved = foundReportService.saveFoundReport(foundReport);
        return new ResponseEntity<>(saved, HttpStatus.OK);
    }

    @GetMapping("/found/all")
    public ResponseEntity<List<FoundReport>> getAllFoundReports() {
        return new ResponseEntity<>(foundReportService.getAllReports(), HttpStatus.OK);
    }
    @DeleteMapping("/found/{id}")
    public ResponseEntity<String> deleteFoundReport(@PathVariable Long id) {
        foundReportService.deleteFoundReport(id);
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }
}
