package com.example.lab2;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;

@Path("/echo")
public class EchoResource {

    @GET
    @Produces("text/plain")
    public String main(){
        return "Default";
    }

    @GET
    @Produces("text/plain")
    @Path("/{arg1}")
    public String unary(@PathParam("arg1") String arg_a){
        return "Default" + arg_a;
    }

    @GET
    @Produces("text/plain")
    @Path("/{arg1}/{arg2}")
    public String binary(@PathParam("arg1") String arg_a, @PathParam("arg2") String arg_b){
        return "Default " + arg_a + " " + arg_b;
    }
}
