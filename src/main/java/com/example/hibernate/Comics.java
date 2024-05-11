package com.example.hibernate;

import javax.persistence.*;

@Entity(name = "marvel")
@Table(name = "Comics")
public class Comics {
    @Id
    @GeneratedValue
    int id;
    @Column(name = "marvel_comics_id")
    int marvelComicsId;
    @Column(name = "digital_id")
    int digitalId;
    @Column(name = "title")
    String title;
    @Column(name = "issue-no")
    int issueNo;
    @Column(name = "description")
    String description;
    @Column(name = "pages")
    int pages;
    @Column(name = "cover")
    String cover;
    @Column(name = "upc")
    String upc;
    @Column(name = "diamond_code")
    String diamondCode;
    @Column(name = "marvel_series_id")
    int marvelSeriesId;
    @Column(name = "marvel_creator_id")
    int marvelCreatorId;
    @Column(name = "marvel_event_id")
    int marvelEventId;
    @Column(name = "marvel_story_id")
    int marvelStoryId;

    public Comics(int id, int marvelComicsId, int digitalId, int issueNo, int pages, String title, String description,
            String cover, String upc, String diamondCode, int marvelSeriesId, int marvelCreatorId, int marvelEventId, int marvelStoryId) {
        this.id = id;
        this.marvelComicsId = marvelComicsId;
        this.digitalId = digitalId;
        this.title = title;
        this.issueNo = issueNo;
        this.pages = pages;
        this.description = description;
        this.cover = cover;
        this.upc = upc;
        this.diamondCode = diamondCode;
        this.marvelSeriesId = marvelSeriesId;
        this.marvelCreatorId = marvelCreatorId;
        this.marvelEventId = marvelEventId;
        this.marvelStoryId = marvelStoryId;
    }

    public int getMarvelComicsId() {
        return this.marvelComicsId;
    }

    public String getTitle() {
        return this.title;
    }

    public int getIssueNo() {
        return this.issueNo;
    }

    public String getDescription() {
        return this.description;
    }

    public int getPages() {
        return this.pages;
    }

    public String getCover() {
        return this.cover;
    }

    public String getUpc() {
        return this.upc;
    }

    public String getDiamondCode() {
        return this.diamondCode;
    }

    public int getMarvelSeriesId() {
        return this.marvelSeriesId;
    }

    public int getMarvelCreatorId() {
        return this.marvelCreatorId;
    }

    public int getMarvelEventIds() {
        return this.marvelEventId;
    }

    public int getMarvelStoryId() {
        return this.marvelStoryId;
    }

}
