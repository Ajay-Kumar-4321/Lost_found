package com.example.lostandfound.model;

public class DirectChatRequest {

    private Long id; // optional, not persisted in DB in this simple version
    private String fromEmail;
    private String toEmail;
    private DirectChatRequestStatus status;

    public String getFromEmail() {
        return fromEmail;
    }

    public void setFromEmail(String fromEmail) {
        this.fromEmail = fromEmail;
    }

    public String getToEmail() {
        return toEmail;
    }

    public void setToEmail(String toEmail) {
        this.toEmail = toEmail;
    }

    public DirectChatRequestStatus getStatus() {
        return status;
    }

    public void setStatus(DirectChatRequestStatus status) {
        this.status = status;
    }
}
