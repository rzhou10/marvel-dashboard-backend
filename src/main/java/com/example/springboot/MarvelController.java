package com.example.springboot;

import java.sql.*;
import java.util.ArrayList;
import main.java.com.example.hibernate.DbInfo;
import com.example.interfaces.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

public class MarvelController {
    
    // add new characters

    // fetch and paginate characters
    @GetMapping("/characters/{limit}")
    public <T> ResponseEntity<ArrayList<T>> fetchCharacters(@PathVariable("limit") int limit){
        String selectCharacters = "SELECT * FROM Characters ORDER BY name LIMIT 20 OFFSET ?;";

        // Dotenv dotenv = getEnv();

        DbInfo info = new DbInfo();

        String connectionUrl = "jdbc:mysql://localhost:3306/" + info.getDbName() + "?serverTimezone=UTC";

        try {
            Connection conn = DriverManager.getConnection(connectionUrl, info.getUser(), info.getPass());
            PreparedStatement ps = conn.prepareStatement(selectCharacters);
            ps.setInt(1, limit);
            ResultSet rs = ps.executeQuery();
            ArrayList<T> results = new ArrayList<T>();

            return ResponseEntity.status(HttpStatus.OK).body(results);

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<T>(0));
        }
    }

    // fetch and paginate characters
    @GetMapping("/single-characters/{id}")
    public <T> ResponseEntity<ArrayList<T>> fetchSingleCharacter(@PathVariable("id") int id){
        String selectCharacters = "SELECT * FROM Characters where marvel_character_id = ?;";

        DbInfo info = new DbInfo();

        String connectionUrl = "jdbc:mysql://localhost:3306/" + info.getDbName() + "?serverTimezone=UTC";

        try {
            Connection conn = DriverManager.getConnection(connectionUrl, info.getUser(), info.getPass());
            PreparedStatement ps = conn.prepareStatement(selectCharacters);
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            ArrayList<T> results = new ArrayList<T>();

            return ResponseEntity.status(HttpStatus.OK).body(results);

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<T>(0));
        }
    }
}
