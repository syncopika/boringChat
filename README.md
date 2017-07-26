# funTalk
a basic chat application using Node.js, Socket.IO, Express.js, MongoDB    
      
The really cool feature that I think will make my application different from any other chat application out there is the fact that users will be able to preset emotions (i.e. happy, angry, sad) mapped to a variety of pictures and ASCII emoticons. That way when you're chatting and just words won't do, you don't have to search online for a particular ASCII emoticon or a particular picture to suit your needs (how about gifs?). 
     
Ideally, users should be able to login with a username and password and customize their presets, which includes the ability to import new pictures. Therefore, maintaining a simple database will be necessary.    
    
<b>other things to think about:</b> 

realistically, I'm not sure how well this would scale. of course, since my main focus is letting the user add new ascii emoticons and pictures to their chat profiles, which means adding more content to my database, that means more data and space. 

I think that lots of companies have probably thought of this sort of thing already, and they knew the costs of allowing these features would probably end up being pretty crazy. For my implementation, a limit to maybe 10 new ascii faces and 5 pictures might be reasonable? ¯\\_(ツ)_/¯ anyhow, so far it's been an interesting learning experience ^_^.
    
### steps needed to make this work locally:    
1. don't forget to have the dependencies installed via npm!     
2. startup the database by executing mongod.exe and then mongo.exe on the command line.    
3. go to the directory for "index.js" (need to rename this) and on command line: node index.js. this starts up the express server.    

