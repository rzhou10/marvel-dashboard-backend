package com.example.hibernate;

import java.time.*;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity(name = "marvel")
@Table(name = "Events")
public class Events {
    @Id
    @GeneratedValue
    int id;
    @Column(name = "marvel_event_id")
    int marvelEventId;
    @Column(name = "title")
    String title;
    @Column(name = "description")
    String description;
    @Column(name = "image")
    String team;
    @Column(name = "start_date")
    LocalDateTime startDate;
    @Column(name = "end_date")
    LocalDateTime endDate;

    public Events(String title, String description, String image, LocalDateTime startDate, LocalDateTime endDate) {
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
