package com.example.lab6;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

public class Grade {
    String name;
    double weight;
    double grade;

    /**
     * the default constructor for the Grade class
     * @param n the name of the grade point
     * @param w the weight
     * @param g the mark the student received
     */
    Grade(@JsonProperty("name") String n, @JsonProperty("weight") String w, @JsonProperty("grade") String g) throws NumberFormatException {
        this.name = n;
        this.weight = Double.parseDouble(w);
        this.grade = Double.parseDouble(g);
    }

    /**
     * takes some HTML and parses a `Grade` from each `<tr>`
     * this function also validates each `Grade` object, ensuring it's validity
     *
     * @param payload the html payload
     * @return a `Grade[]`
     * @throws RuntimeException        throws if a Grade object returns true from `isEmpty()`
     * @throws JsonProcessingException throws if a Grade object cannot be deserialized
     */
    public static List<Grade> fromJSON(String payload) throws JsonProcessingException, RuntimeException {
        List<Grade> grades = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();

        JsonNode root = mapper.readTree(payload).path("grades");

        for (JsonNode o : root) {
            Grade grade = mapper.treeToValue(o, Grade.class);
            if(!grade.isEmpty()){
                grades.add(grade);
            }
        }
        return grades;
    }


    /**
     * this function calculates the weighted grade of all the grades inputted:
     * grade.weight * grade.grade / 100 (since weight is from 0 to 100 not 0 to 1)
     * @param grades a list of Grade objects, where the sum of all weights is 100
     * @return the final grade of the student
     */
    public static double weightedGrade(List<Grade> grades) {
        double weightedGrade = 0;
        for (Grade g: grades) {
            weightedGrade = weightedGrade + (g.weight*g.grade)/100;
        }
        return weightedGrade;
    }

    /**
     * this turns the object into string format: [Grade name:name, weight:weight, grade:grade]
     * @return the object cast into string format
     */
    public String toString() {
        return "[Grade name:"+this.name+", weight:"+this.weight+", grade:"+this.grade+"]";
    }

    /**
     * returns true if:
     * - the name is empty
     * - isValidWeight() is false
     * - isValidGrade() is false
     * @see #isValidWeight()
     * @see #isValidGrade()
     * @return true if all fields are empty
     */
    public boolean isEmpty() {
        return !this.isValidGrade() || !this.isValidWeight() || this.name == null || this.name.equals("");
    }

    /**
     * each weight be between 0 and 100 (inclusive)
     * @return true if the weight is between 0 and 100
     */
    public boolean isValidWeight() {
        return (0 <= this.weight) && (this.weight <= 100);
    }

    /**
     * each grade be between 0 and 100 (inclusive)
     * @return true if the grade is between 0 and 100
     */
    public boolean isValidGrade() {
        return (0 <= this.grade) && (this.grade <= 100);
    }
}
