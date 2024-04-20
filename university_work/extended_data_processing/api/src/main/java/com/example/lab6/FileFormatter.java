package com.example.lab6;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class FileFormatter {

    // storing the students in an array
    private final Student[] students;

    // TO DO ...
    private final double[] averages;
    private final HashMap<String,Object> studentsObject;

    /**
     * stores a list of Student objects in an instance
     * @param students the list of student objects
     */
    public FileFormatter(Student[] students) {
        this.students = students;
        this.averages = getAvgsArray();
        this.studentsObject = getStudentsObject();
    }

    public double findAverage(int gradeIndex){
        double avg = 0;

        for (Student s : students) {
            avg += s.grades[gradeIndex];
        }

        return avg/students.length;
    }
    public double[] getAvgsArray(){
        double[] avgs = new double[Student.NUMASMT];
        for (int i = 0; i < Student.NUMASMT; i++) {
            avgs[i] = findAverage(i);
        }
        return avgs;
    }
    public HashMap<String,Object> getStudentsObject(){

        HashMap<String,Object> avgs = new HashMap<>();
        for (int i = 0; i < Student.NUMASMT; i++) {
            String field = Student.assignmentFromIndex(i);
            double average = averages[i];
            avgs.put(field,average);
        }

        List<HashMap<String,Object>> student = new ArrayList<>();

        for (Student s : students) {
            HashMap<String,Object> m = new HashMap<>();
            m.put("name",s.name);
            m.put("id",s.id);
            m.put("gpa",s.gpa);
            for (int i = 0; i < Student.NUMASMT; i++) {
                m.put(Student.assignmentFromIndex(i),s.grades[i]);
            }
            student.add(m);
        }

        HashMap<String, Object> students = new HashMap<>();
        students.put("averages",avgs);
        students.put("student",student);

        return students;
    }

    /**
     * turns `this.students` into CSV format
     * @param   delimiter   the character that separates each field
     * @return a formatted CSV file
     */
    public String toCSV(String delimiter) {

        StringBuilder csv = new StringBuilder();

        csv.append("name,id,gpa,assignment1,assignment2,labs,midterm,final,avg_assignment1,avg_assignment2,avg_labs,avg_midterm,avg_final\n");

        for (Student s : students) {
            csv.append(s.name).append(delimiter).append(s.id).append(delimiter).append(s.gpa);
            for (int i = 0; i < Student.NUMASMT; i++) {
                csv.append(delimiter).append(s.grades[i]);
            }
            for (int i = 0; i < Student.NUMASMT; i++) {
                csv.append(delimiter).append(averages[i]);
            }
            csv.append("\n");
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
            return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"+xmlMapper.writeValueAsString(this.studentsObject);
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
            return objectMapper.writeValueAsString(this.studentsObject);
        } catch (JsonProcessingException e){
            throw new RuntimeException(e);
        }
    }
}
