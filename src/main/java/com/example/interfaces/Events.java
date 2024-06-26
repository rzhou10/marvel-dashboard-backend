package com.example.interfaces;

import java.time.*;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Events {
    @JsonProperty("marvelEventsId")
    private int marvelEventsId;
    @JsonProperty("title")
    private String title;
    @JsonProperty("description")
    private String description;
    @JsonProperty("image")
    private String image;
    @JsonProperty("start_date")
    private LocalDateTime startDate;
    @JsonProperty("end_date")
    private LocalDateTime endDate;

    public Events(int marvelEventsId, String title, String description, String image, LocalDateTime startDate, LocalDateTime endDate) {
        this.marvelEventsId = marvelEventsId;
        this.title = title;
        this.description = description;
        this.image = image;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getTitle() {
        return this.title;
    }

    public String getDescription() {
        return this.description;
    }

    public String getImage() {
        return this.image;
    }

    public LocalDateTime getStartDate() {
        return this.startDate;
    }

    public LocalDateTime getEndDate() {
        return this.endDate;
    }
    
}
