# Lab 3 - REST API building 2

>Course: CSCI 2020U: Software Systems Development and Integration

[![git](https://badgen.net/badge/icon/git?icon=git&label)](https://git-scm.com)

## Overview

This lab is meant to get you familiar with different file formats, specifically; XML, JSON and CSV.

Then, you are going to combine these file formats with GlassFish to serve different content.

## Prerequisites

Your GlassFish setup needs to work as this is a continuation from Lab 2.

## Lab Work

Given this dataset, transform it into other file formats:

|name|id|gpa|
|-|-|-|
|Ryan Gosling|100000000|4.3|
|Keanu Reeves|100000001|2.9|
|Richard Dean Anderson|100000002|2.7|
|Brad Pitt|100000003|3.9|
|Ed Norton|100000004|2.2|
|Helena Bonham Carter|100000005|2.0|

### Part 1 - File Creation

You are going to turn the data above into the following formats:

- JSON
- XML
- CSV

Each file should be named `students` (e.g., `students.json`) and should be located within
`src/main/resources/`.

For grading, here is how you will format each file type:

- for all (in practical situations the order of these fields wouldn't matter, nesting would)
  - the fields for each record should be lowercase e.g., `name` and not `NAME`
  - the order of the fields should be: `name`, `id` then `gpa` 
    - records should be sorted by `id` from least to greatest

Specific file formats:

- for JSON
  - all the records should be stored in an array `students`
  - each record is a JSON object
    - `name` is a string
    - `id` & `gpa` are numbers
- for XML
  - the parent element should be called `students`
  - each record called `student`
  - each trait (`name`, `id` & `gpa`) should be its own tag (e.g., `<name></name>`)
  - you should include an XML header at the **beginning** of the file
    - version; `1.0`
    - encoding; `utf-8`
- for CSV
  - the header should be copied from the table above
  - the delimiter should be a comma

>If there is any confusion about the formatting, ask your TA.

### Part 2 - Content Distribution

In this part, you're going to implement a function which will serve as an endpoint for each file format.

>There is already a **premade function** within the `StudentResource.java` file for easily reading a file.
>It is recommended to use this, however you are allowed to implement your own if you so choose.

Your job will be to:

1. make three functions
   - `String json();`
   - `String csv();`
   - `String xml();`
2. use the proper [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) for the `@Produces` decorator
   - you can use `"text/plain"` to verify that the CSV endpoint works, **but** you are supposed to use the correct MIME type for this lab and in practice
3. assign an endpoint for each file format (e.g., `/api/students/json` should serve the `students.json` file)
   - the endpoint must be the lowercase of the file format

>The default entry point to this application is `/api/students/...`
