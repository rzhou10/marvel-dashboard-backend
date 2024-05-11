package com.example.hibernate;

import javax.persistence.*;

@Entity(name = "marvel")
@Table(name = "Series")
public class Series {
    @Id
    @GeneratedValue
    int id;
    @Column(name="marvel_series_id")
    private int marvelSeriesId;
    @Column(name="title")
    private String title;
    @Column(name="description")
    String description;
    @Column(name="start_year")
    private int startYear;
    @Column(name="end_year")
    private int endYear;
    @Column(name="image")
    private String image;

    public Series(int marvelSeriesId, String title, String description, int startYear, String image) {
        this.marvelSeriesId = marvelSeriesId;
        this.title = title;
        this.description = description;
        this.startYear = startYear;
        this.image = image;
    }

    public int getMarvelSeriesId() {
        return this.marvelSeriesId;
    }

    public String getTitle() {
        return this.title;
    }

    public int getStartYear() {
        return this.startYear;
    }

    public int getEndYear() {
        return this.endYear;
    }

    public String getImage() {
        return this.image;
    }

    public String getDescription () {
        return this.description;
    }
}
