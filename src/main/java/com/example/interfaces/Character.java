package com.example.interfaces;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Character {
    @JsonProperty("name")
    private String name;
    @JsonProperty("description")
    private String description;
    @JsonProperty("team")
    private String team;
    @JsonProperty("powers_abilities")
    private String powersAbilities;

    public Character(String name, String description, String team, String powersAbilities) {
        this.name = name;
        this.description = description;
        this.team = team;
        this.powersAbilities = powersAbilities;
    }

    public String getName() {
        return this.name;
    }

    public String getTeam() {
        return this.team;
    }

    public String getPowersAbilities() {
        return this.powersAbilities;
    }

    public String getDescription() {
        return this.description;
    }
}