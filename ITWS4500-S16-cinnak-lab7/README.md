Kayla Cinnamon
Professor Plotka
Web Science Systems Development
April 13, 2016

Lab 7

I started this lab by just adding buttons to the index.html. Once the buttons were there and didn't do anything, I added the input field for the user to put their file name in. I then connected that to the back end so the server.js knew what the user wanted their file to be named. Then I moved on to working with Mongo. 

I created the database and learned how to insert the tweets into a collection. I noticed that every time I ran this code, I was adding on to the tweets that were already in the database. I ended up writing the function so it would remove everything in the database first, before adding the tweets that were just loaded. I then connected this functionality to the button on the front end and finished part 1 of the lab. 

After, I used the .find() function to grab all of the tweets in the database and send them to the front end to be displayed. Once I connected this function to its button, part 2 was complete. 

I used the same finding method to get the tweets to put into the XML file. I started using one node module that allowed for JSON to XML conversion, but it kept writing the header multiple times in the file and I decided not to use that module. I ended up using the jstoxml module because I could add the indent size and the header just once, along with converting the tweets from JSON to XML.

After I finished this part of the lab, I added some JavaScript alerts so the user was aware of what was going on.

https://github.com/kaylacinnamon/ITWS4500.git

Collaborators:

David Sparkman