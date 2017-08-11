# boringChat
a basic chat application using Node.js, Socket.IO, Express.js, MongoDB/Mongoose, ejs templates.     
      
The only really cool feature that I think makes this program different from other chat applications out there is the fact that users will be able to preset emotions (i.e. happy, angry, sad) mapped to a variety of pictures and ASCII emoticons. That way when you're chatting and just words won't do, you don't have to search online for a particular ASCII emoticon or a particular picture to suit your needs (how about gifs?).
     
<b>other things to think about:</b> 

I'm not sure how well this would scale. Since my main focus is letting the user add new ascii emoticons and pictures to their chat profiles, which means adding more content to my database, that means this application could eat up a lot of data and space.    
    
For my implementation, a limit to maybe 10 new ascii faces and 5 pictures might be reasonable? ¯\\_(ツ)_/¯
    
### steps needed to make this work locally:    
1. set up database, i.e. MongoDB locally or somewhere else.     
2. don't forget to have the dependencies installed via npm!     
3. startup the database by executing mongod.exe and then mongo.exe on the command line. (be mindful of the database name to access though: see config/database.js where the location is specified)        
4. go to the directory for "server.js" and on command line: node server.js. this starts up the express server.    

