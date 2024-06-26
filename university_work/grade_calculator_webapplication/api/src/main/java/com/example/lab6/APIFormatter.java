package com.example.lab6;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/format")
public class APIFormatter {

    @POST
    @Path("/json")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.TEXT_HTML)
    public Response json(String body) {
        Student[] students;

        // rejecting if the data is empty
        if (body.isEmpty()) {
            return Response.status(400)
                    .entity("No data passed in the body.")
                    .build();
        }

        try {
            students = Student.fromHTML(body);
        } catch (RuntimeException e) {
            System.out.println(e);
            return Response.status(400).entity("Bad data passed to the API\n" + e).build();
        }

        String response = new FileFormatter(students).toJSON();

        return Response.status(200)
                .header("Content-Disposition", "attachment;filename=\"students.json\"")
                .entity(response)
                .build();
    }

    @POST
    @Path("/csv")
    @Produces("text/csv")
    @Consumes(MediaType.TEXT_HTML)
    public Response csv(String body) {
        Student[] students;

        // rejecting if the data is empty
        if (body.isEmpty()) {
            return Response.status(400)
                    .entity("No data passed in the body.")
                    .build();
        }

        try {
            students = Student.fromHTML(body);
        } catch (RuntimeException e) {
            System.out.println(e);
            return Response.status(400).entity("Bad data passed to the API\n" + e).build();
        }

        String response = new FileFormatter(students).toCSV(",");

        return Response.status(200)
                .header("Content-Disposition", "attachment;filename=\"students.csv\"")
                .entity(response)
                .build();
    }

    @POST
    @Path("/xml")
    @Produces(MediaType.APPLICATION_XML)
    @Consumes(MediaType.TEXT_HTML)
    public Response xml(String body) {
        Student[] students;

        // rejecting if the data is empty
        if (body.isEmpty()) {
            return Response.status(400)
                    .entity("No data passed in the body.")
                    .build();
        }

        try {
            students = Student.fromHTML(body);
        } catch (RuntimeException e) {
            System.out.println(e);
            return Response.status(400).entity("Bad data passed to the API\n" + e).build();
        }

        String response = new FileFormatter(students).toXML();

        return Response.status(200)
                .header("Content-Disposition", "attachment;filename=\"students.xml\"")
                .entity(response)
                .build();
    }

    @POST
    @Path("/grade")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response grade(String body) {
        List<Grade> grades;

        // rejecting if the data is empty
        if (body.isEmpty()) {
            return Response.status(400)
                    .entity("No data passed in the body.")
                    .build();
        }

        // parsing the body of the request
        try {
            grades = Grade.fromJSON(body);
        } catch (Exception e) {
            System.out.println(e);
            return Response.status(400).entity("Bad data passed to the API\n" +
                    e).build();
        }

        // forming the final response
        String response;

        // performing calculations and creating the response
//        try {
            response = FileFormatter.toJSON(grades);
//        } catch (JsonProcessingException e) {
//            System.out.println(e);
//            return Response.status(500).entity("An error occurred whilst serializing the data").build();
//        }

        // returning the response to the user
        return Response.status(200)
                .entity(response)
                .build();
    }

}
