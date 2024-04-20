# API Extension

Here you will extend your API to accommodate the new changes.

## Lab Work

### Extending the class structure

You should update your `Student` class like so:

```java
class Student {
    public String name;    // the student's name
    public int id;         // the student's id
    public double gpa;     // the student's gpa
    public double[] grades;   // the student's grades

    // the indices to index grades
    public final static int ASMT1 = 0;
    public final static int ASMT2 = 1;
    public final static int LABS = 2;
    public final static int MIDTERM = 3;
    public final static int FINAL = 4;
    public final static int NUMASMT = 5;

    // updated constructor
    public Student(String name, int id, double gpa, double[] grades);

    // assigning an index to a string, not required but helpful
    public static String assignmentFromIndex(int index) throws IndexOutOfBoundsException;
}
```

In this implementation, you are storing the grades as an array then setting some properties of the class to index said array.
Mind you that for this implementation, the grades must be in their proper place or the calculations will be wrong.

#### Parsing Data

For parsing data, it would be best to do it functionaly, however this is optional.
See the sample below:

```java
String[] trs = (String[]) Arrays.stream(payload.split("</tr>")).map(row -> {
    // do some work
}).toArray(String[]::new);
```

>This can get complex and unreadable really fast however.

### Extending the file structure

In this part, you'll need to extend each file layout to accomodate these changes.
You'll be doing all your work in the `FileFormatter.java` class.

First, you'll need to implement a function to calculate the average for each assingment, something like:

```java
public class FileFormatter {
    public double findAverage(int gradeIndex);
}
```

This function takes an array of `Student` objects, the index to index their grades.
Then it will sum each grade, then divide it by the number of students.

Finally, you'll need to append this data into a variety of file formats, see the samples below:

#### JSON

Here is a sample of what the JSON output should look like:

```json
{
    "averages": {
        "assignment1": 0.5714,
        "assignment2": 0.5714,
        "labs": 0.5714,
        "midterm": 0.5714,
        "final": 0.5714
    },
    "students": [
        {
            "name": "Ryan Gosling",
            "id": 100000000,
            "gpa": 4.3,
            "assignment1": 0.0,
            "assignment2": 0.0,
            "labs": 0.0,
            "midterm": 0.0,
            "final": 0.0
        }
    ]
}
```

#### XML

Here is a sample of what the XML output should look like:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<students>
    <averages>
        <assignment1>0.5714</assignment1>
        <assignment2>0.5714</assignment2>
        <labs>0.5714</labs>
        <midterm>0.5714</midterm>
        <final>0.5714</final>
    </averages>
    <student>
        <name>Ryan Gosling</name>
        <id>100000000</id>
        <gpa>4.3</gpa>
        <assignment1>0.0</assignment1>
        <assignment2>0.0</assignment2>
        <labs>0.0</labs>
        <midterm>0.0</midterm>
        <final>0.0</final>
    </student>
</students>
```

#### CSV

Here is a sample of what the XML output should look like:

```csv
name,id,gpa,assignment1,assignment2,labs,midterm,final,avg_assignment1,avg_assignment2,avg_labs,avg_midterm,avg_final
Ryan Gosling,100000000,4.3,0.0,0.0,0.0,0.0,0.0,0.5714,0.5714,0.5714,0.5714,0.5714
Keanu Reeves,100000001,2.9,0.0,0.0,0.0,0.0,0.0,0.5714,0.5714,0.5714,0.5714,0.5714
```

>This is for testing purposes only, in a real world situation you wouldn't store the averages of all columns within
>the file itself, rather you'd calculate it programmatically.
