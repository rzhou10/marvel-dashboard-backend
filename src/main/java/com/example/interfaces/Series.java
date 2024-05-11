package com.example.interfaces;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Series {
    @JsonProperty("marvelSeriesId")
    private int marvelSeriesId;
    @JsonProperty("title")
    private String title;
    @JsonProperty("description")
    String description;
    @JsonProperty("startYear")
    private int startYear;
    @JsonProperty("endYear")
    private int endYear;
    @JsonProperty("image")
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
