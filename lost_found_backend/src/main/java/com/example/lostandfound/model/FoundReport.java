package com.example.lostandfound.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class FoundReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;
    private String location;
    private String foundDate;
    private String description;
    private String email;

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getFoundDate() { return foundDate; }
    public void setFoundDate(String foundDate) { this.foundDate = foundDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
