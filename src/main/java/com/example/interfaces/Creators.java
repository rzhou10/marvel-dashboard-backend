package com.example.interfaces;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Creators {
    @JsonProperty("name")
    private String name;
    @JsonProperty("role")
    private String role;

    public Creators(String name, String role, int pages, String cover, String upc, String diamondCode) {
        this.name = name;
        this.role = role;
    }

    public String getName() {
        return this.name;
    }

    public String getRole() {
        return this.role;
    }

}
