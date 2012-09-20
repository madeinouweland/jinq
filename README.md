jinq
====

A library to perform list manipulations in javascript. Like Linq:

    // perform jinq queries on app.employees
    app.print("allEmployees", app.employees);
    app.print("where", app.employees.Where("x.salary>2000"));
    app.printItem("firstordefault", app.employees.FirstOrDefault("x.city === 'Eindhoven'"));
    app.printItem("firstordefault2", app.employees.FirstOrDefault("x.city === 'London'"));
    app.print("salaries", app.employees.Select("x.salary"));
    app.print("projects", app.employees.SelectMany("x.projects"));
    app.print("distinctprojects", app.employees.SelectMany("x.projects").Distinct(("x")));
