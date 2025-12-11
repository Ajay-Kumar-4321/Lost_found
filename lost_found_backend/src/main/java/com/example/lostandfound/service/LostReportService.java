package com.example.lostandfound.service;

import com.example.lostandfound.model.LostReport;
import com.example.lostandfound.repository.LostReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.UUID;
import java.util.List;

@Service
public class LostReportService {

    @Autowired
    private LostReportRepository lostReportRepository;

    public LostReport saveLostReport(LostReport lostReport, MultipartFile image) throws IOException {
        // image is optional
        if (image != null && !image.isEmpty()) {
            String uploadDir = "uploads/";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String ext = image.getOriginalFilename().replaceAll("^.*\\.(.*)$", "$1");
            String filename = UUID.randomUUID().toString() + "." + ext;
            File dest = new File(uploadDir + filename);
            image.transferTo(dest);

            lostReport.setImagePath(dest.getAbsolutePath());
        }
        // Save report (with required contact number)
        return lostReportRepository.save(lostReport);
    }
    public List<LostReport> getAllReports() {
        return lostReportRepository.findAll();
    }
    public void deleteLostReport(Long id) {
        lostReportRepository.deleteById(id);
    }
}
