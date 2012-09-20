jinq
====

A library to perform list manipulations in javascript. Like Linq:

    // perform jinq queries on app.employees
    var a = app.employees.Where("x.salary>2000");
    var b = app.employees.FirstOrDefault("x.city === 'Eindhoven'");
    var c = app.employees.FirstOrDefault("x.city === 'London'");
    var d = app.employees.Select("x.salary");
    var e = app.employees.SelectMany("x.projects");
    var f = app.employees.SelectMany("x.projects").Distinct(("x"));
