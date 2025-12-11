package com.example.lostandfound.model;

// CHANGE THESE IMPORTS:
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class LostReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemCategory;
    private String itemName;
    private String lostDate;
    private String location;
    private String description;
    private String email;

    private String contactNumber;
    private String imagePath;

    // Getters and Setters...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getItemCategory() { return itemCategory; }
    public void setItemCategory(String itemCategory) { this.itemCategory = itemCategory; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public String getLostDate() { return lostDate; }
    public void setLostDate(String lostDate) { this.lostDate = lostDate; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }
}
