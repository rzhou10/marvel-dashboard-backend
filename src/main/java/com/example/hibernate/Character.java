package com.example.hibernate;

import javax.persistence.*;

@Entity(name = "marvel")
@Table(name = "Character")
public class Character {
    @Id
    @GeneratedValue
    int id;
    @Column(name = "marvel_character_id")
    int marvelCharId;
    @Column(name = "name")
    String name;
    @Column(name = "description")
    String description;
    @Column(name = "team")
    String team;
    @Column(name = "powers_abilities")
    String powersAbilities;
    @Column(name = "marvel_comics_id")
    int marvelComicsId;

    public Character(int marvelCharId, String name, String description, String team, String powersAbilities, int marvelComicsId) {
        this.marvelCharId = marvelCharId;
        this.name = name;
        this.description = description;
        this.team = team;
        this.powersAbilities = powersAbilities;
        this.marvelComicsId = marvelComicsId;
    }

    public String getName() {
        return this.name;
    }

    public int getMarvelCharId() {
        return this.marvelCharId;
    }
    public String getDescription() {
        return this.description;
    }

    public String getTeam() {
        return this.team;
    }

    public String getPowersAbilities() {
        return this.powersAbilities;
    }

    public int getMarvelComicsId() {
        return this.marvelComicsId;
    }

}
