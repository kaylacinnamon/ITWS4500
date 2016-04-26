Kayla Cinnamon
Professor Plotka
Web Science Systems Development
April 20, 2016

Lab 8

I started this lab by creating a text box and the input button. I then played around on dbpedia to get some SPARQL queries working. I took the syntax from there and placed it into my text box so the user doesn't have to worry about it. My default SPARQL query finds ten movies with their producer(s) and director(s). I used a POST request to send the query to the back end. Once the queries are found, they are placed into a JSON array that is sent to the front end by using a GET request. There, I used AngularJS to print the queries in an HTML table. In order to get the queries to print properly with their respective headers, I had to do a nested ng-repeat in the index.html file to read through the array.

https://github.com/kaylacinnamon/ITWS4500.git