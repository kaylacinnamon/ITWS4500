Kayla Cinnamon
Professor Plotka
Web Science Systems Development
March 9, 2016

Lab 5

For this lab, I used the same HTML and CSS files from Lab 4, but tweaked them slightly to make them compatibile with the Twitter Streaming API. Connecting to the Twitter API using the Twitter module was the first thing I did. I logged the tweets in the console so I could see that I was getting them. I left that line of code there so I know the app is still receiving tweets.

I tried a lot of different options for getting the lab to place the tweets on the index.html file. I almost used Socket.io but I decided against it because I could not get it functioning. I just stuck with using the Express and Twitter modules because they were easier to comprehend. When loading the tweets without putting in any parameters, the app will load 10 tweets from the RPI area. Once all of the tweets are found, they will appear on the webpage all at once and be written to a JSON file using the fs module. After this, the stream is destroyed. I did not display each tweet as they were found because the res.json command only works once, or else you get an error saying the headers for the page have already been set. The user can input how many tweets they want and a keyword they are looking for. The index.html file is populated by using Angular JavaScript and is styled by using Bootstrap and CSS.

Github:

https://github.com/kaylacinnamon/ITWS4500.git

Collaborators:

Rachel Blacker
Justin Etzine
David Sparkman