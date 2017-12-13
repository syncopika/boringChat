:: batch script to start up local MongoDB server

@echo off	

:: start up two separate command prompts, have them call the executables

:: open mongod.exe
start cmd /k "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"

:: wait before starting up database interface 
ping -n 3 localhost >nul

:: open mongo.exe (but only if you need to check on the database, go through the data, etc.)
start cmd /k "C:\Program Files\MongoDB\Server\3.4\bin\mongo.exe"
