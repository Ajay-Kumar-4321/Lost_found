package com.example.lostandfound.controller;

import com.example.lostandfound.model.LostReport;
import com.example.lostandfound.service.LostReportService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/report")
@CrossOrigin(origins = "*")
public class LostReportController {

    @Autowired
    LostReportService lostReportService;

    @PostMapping("/lost")
    public ResponseEntity<?> reportLost(
            @RequestPart("lostReport") String lostReportJson,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            LostReport lostReport = mapper.readValue(lostReportJson, LostReport.class);

            // Contact number check (now required)
            if (lostReport.getContactNumber() == null || lostReport.getContactNumber().trim().isEmpty()) {
                return new ResponseEntity<>("Contact number is required.", HttpStatus.BAD_REQUEST);
            }

            // Optional image (display message if provided)
            if (image != null && !image.isEmpty()) {
                System.out.println("Image file received: " + image.getOriginalFilename());
            } else {
                System.out.println("No image attached.");
            }

            LostReport saved = lostReportService.saveLostReport(lostReport, image);
            return new ResponseEntity<>(saved, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Image upload or data parsing failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/lost/all")
    public ResponseEntity<List<LostReport>> getAllLostReports() {
        return new ResponseEntity<>(lostReportService.getAllReports(), HttpStatus.OK);

    }
    @DeleteMapping("/lost/{id}")
    public ResponseEntity<String> deleteLostReport(@PathVariable Long id) {
        lostReportService.deleteLostReport(id);
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }
}
