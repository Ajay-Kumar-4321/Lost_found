package com.example.lostandfound.service;

import com.example.lostandfound.model.FoundReport;
import com.example.lostandfound.repository.FoundReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class FoundReportService {

    @Autowired
    private FoundReportRepository foundReportRepository;

    public FoundReport saveFoundReport(FoundReport foundReport) {
        return foundReportRepository.save(foundReport);
    }
    public List<FoundReport> getAllReports() {
        return foundReportRepository.findAll();
    }
    public void deleteFoundReport(Long id) {
        foundReportRepository.deleteById(id);
    }
}
