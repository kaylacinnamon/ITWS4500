Kayla Cinnamon
Professor Plotka
Web Science Systems Development
April 6, 2016

Lab 6

I started this lab by editing my code from Lab 5. I first worked on converting the JSON to CSV. I already had a vector of the tweets loaded in. I parsed the tweets into JSON format first, then to get it to CSV, I wrote in the proper syntax for it and parsed the appropriate variables. If the user wanted JSON, I would just export the JSON variables as is without changing the syntax. After I got the files exporting properly, I made a dropdown button in the HTML and added a new function that connected to the export button. The function was in JavaScript and uses POST and GET calls. Once everything was connected, I finished up the lab by adding alerts to inform the user of what was happening. An alert is delivered every time the user exports the tweets.

Where would it be better to place the CSV conversion code, in the node server or in an Angular controller? Why?

It would be better to place the CSV conversion code in the node server rather than an Angular controller. Angular is meant more for front end and and is on the client side. The client side does not have access to editing files. Node is on the server side, so it has access to file editing. With my current implementation, the node server already had access to the files, so I didn't feel the need to add an Angular controller. Having an Angular controller doing the conversion would mean that the data would have to be passed from the node server to the controller. The controller would then convert the data into CSV format, then pass it back to the node server so it could write it to a file.

https://github.com/kaylacinnamon/ITWS4500.git

Collaborators:

Rachel Blacker