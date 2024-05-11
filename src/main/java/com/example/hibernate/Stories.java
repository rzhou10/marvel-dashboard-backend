package com.example.interfaces;

import com.fasterxml.jackson.annotation.Column;

@Entity(name = "marvel")
@Table(name = "Stories")
public class Stories {
    @Column(name="marvel_story_id")
    private int marvelStoryId;
    @Column(name="title")
    private String title;
    @Column(name="image")
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
