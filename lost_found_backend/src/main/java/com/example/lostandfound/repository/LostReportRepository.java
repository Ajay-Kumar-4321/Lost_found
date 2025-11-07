package com.example.lostandfound.repository;

import com.example.lostandfound.model.LostReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LostReportRepository extends JpaRepository<LostReport, Long> {}
