package com.example.interfaces;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Comics {
    @JsonProperty("title")
    private String title;
    @JsonProperty("issue-no")
    private int issueNo;
    @JsonProperty("description")
    private String description;
    @JsonProperty("pages")
    private int pages;
    @JsonProperty("cover")
    private String cover;
    @JsonProperty("upc")
    private String upc;
    @JsonProperty("diamond_code")
    private String diamondCode;

    public Comics(String title, int issueNo, String description, int pages, String cover, String upc,
            String diamondCode) {
        this.title = title;
        this.issueNo = issueNo;
        this.description = description;
        this.pages = pages;
        this.cover = cover;
        this.upc = upc;
        this.diamondCode = diamondCode;
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
}
