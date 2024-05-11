package com.example.interfaces;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Stories {
    @JsonProperty("marvelStoryId")
    private int marvelStoryId;
    @JsonProperty("title")
    private String title;
    @JsonProperty("image")
    private String image;

    public Stories(String title, String image, int marvelStoryId) {
        this.title = title;
        this.image = image;
        this.marvelStoryId = marvelStoryId;
    }

    public String getTitle() {
        return this.title;
    }

    public String getImage() {
        return this.image;
    }

    public int getmarvelStoryId() {
        return this.marvelStoryId;
    }

    
}
