# boringChat    
a basic chat application using Node.js, Socket.IO, Express.js, MongoDB/Mongoose, ejs templates, etc.     
    
have you seen/used emoticons like these before?    
ლ(ಠ_ಠლ)    
(ﾉ◕ヮ◕)ﾉ*    
(☉_☉)    

They're fun to use when chatting, but difficult to type out, if you can even do so, and sometimes can be a pain to find online. (╯°□°）╯︵ ┻━┻    
    
Therefore I made this application where users will be able to preset emotions (i.e. happy, angry, sad) mapped to a variety of ASCII emoticons.    
    
That way when you're chatting and just words won't do, you don't have to search online for a particular ASCII emoticon (which can be pretty complicated) to suit your needs.
     
<b>things to think about:</b>    
probably should apply some limitations on the number of emoticons that can be saved per user.       
how about image imports? gifs?    
    
### screenshots:    
the login page:    
![the login page](screenshots/boringChat-login.png)    
    
the register page:    
![the register page](screenshots/boringChat-register.png)    
     
the chat area:    
![chat area](screenshots/boringChat-index.png)    
    
### steps needed to make this work locally:    
1. set up database, i.e. MongoDB locally or somewhere else.     
2. don't forget to have the dependencies installed via npm!     
3. startup the database by executing mongod.exe and then mongo.exe on the command line. (be mindful of the database name to access though: see config/database.js where the location is specified)        
4. go to the directory where "server.js" lives and then on the command line: ```node server.js```. this starts up the express server.    

### helpful resources:    
https://socket.io/get-started/chat/    
https://scotch.io/tutorials/easy-node-authentication-setup-and-local
