package com.example.lab6;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

public class FileFormatter {

    // storing the students in an array
    private final Student[] students;

    // TO DO ...

    /**
     * stores a list of Student objects in an instance
     * @param students the list of student objects
     */
    public FileFormatter(Student[] students) {
        this.students = students;
    }

    /**
     * turns `this.students` into CSV format
     * @param   delimiter   the character that separates each field
     * @return a formatted CSV file
     */
    public String toCSV(String delimiter) {
        StringBuilder csv = new StringBuilder();
        for (Student s : students) {
            csv.append(s.name).append(delimiter).append(s.id).append(delimiter).append(s.gpa).append("\n");
        }
        return csv.toString();
    }

    /**
     * turns `this.students` into XML format
     * @return a formatted XML file
     */
    public String toXML() {
        XmlMapper xmlMapper = new XmlMapper();
        try {
            return xmlMapper.writeValueAsString(this.students);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * turns `this.students` into JSON format
     * @return a formatted JSON file
     */
    public String toJSON() {
        ObjectMapper objectMapper = new ObjectMapper();
        try{
            return objectMapper.writeValueAsString(this.students);
        } catch (JsonProcessingException e){
            throw new RuntimeException(e);
        }
    }
}
