package com.example.hibernate;

import java.time.LocalDateTime;

@Entity(name = "marvel")
@Table(name = "Creators")
public class Creators {
    @Id
    @GeneratedValue
    int id;
    @Column(name = "marvel_creator_id")
    int marvelCreatorId;
    @Column(name = "name")
    String name;
    @Column(name = "role")
    String role;
    
    public Creators(int marvelCreatorId, String name, String role) {
        this.marvelCreatorId = marvelCreatorId;
        this.name = name;
        this.role = role;
    }
}
