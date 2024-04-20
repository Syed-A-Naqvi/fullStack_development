package com.example.lab6;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class Student {

    public String name;    // the student's name
    public int id;         // the student's id
    public double gpa;     // the student's gpa

    // TO DO ...

    /**
     * the default constructor for the class
     * @param name  the student's name
     * @param id    the student's id
     * @param gpa   the student's gpa
     */
    public Student(String name, int id, double gpa) {
        this.name = name;
        this.id = id;
        this.gpa = gpa;
    }

    /**
     * takes some HTML and parses a `Student` from each `<tr>`
     * @param payload           the html payload
     * @return a `Student[]`
     * @throws RuntimeException throws if a student object returns true from `isEmpty()`
     */
    public static Student[] fromHTML(String payload) throws RuntimeException {

        String formattedPaylod = "<table>"+payload+"</table>";

        Document document = Jsoup.parse(formattedPaylod);
        Elements rows = document.getElementsByTag("tr");
        //-1 to remove the first row of the table that contains the headings
        int numStudents = rows.size()-1;
        Student[] students = new Student[numStudents];


        for (int i = 1; i < numStudents+1; i++) {

            Element currentStudent = rows.get(i);
            Elements studentFields = currentStudent.getElementsByTag("td");

            String name = studentFields.get(0).text();
            int id = Integer.parseInt(studentFields.get(1).text());
            double gpa = Double.parseDouble(studentFields.get(2).text());

            students[i-1] = new Student(name,id,gpa);

            if( students[i-1].isEmpty() ){
                throw new RuntimeException(String.format("Student at row number: %d qualifies as \"isEmpty\"",i));
            }

        }

        return students;

    }

    /**
     * this turns the object into string format: [Student name:name, id:id, gpa:gpa]
     * @return the object casted into string format
     */
    public String toString() {
        return "[Student name:"+this.name+", id:"+this.id+", gpa:"+this.gpa+"]";
    }

    /**
     * returns true if:
     * - the name is empty &
     * - isValidId() is false &
     * - isValidGPA() is false
     * @see #isValidId()
     * @see #isValidGPA()
     * @return true if all fields are empty
     */
    public boolean isEmpty() {
        return (this.name.isEmpty()) && !(isValidId()) && !(isValidGPA());
    }

    /**
     * tests if the student's id is valid or not
     * @return true if the id is greater than 100,000,000
     */
    public boolean isValidId() {
        return this.id > 100000000;
    }

    /**
     * tests if the student's gpa is valid or not
     * @return true if the gpa is between 0 and 4.3
     */
    public boolean isValidGPA() {
        return (this.gpa > 0) && (this.gpa < 4.3);
    }
}
