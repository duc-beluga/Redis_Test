# Redis_Test
Simple Redis Test on Cache Time 

**For Windows Users** 
1. (Install Linux Subsystem) Open Powershell and paste in this command:
   
``wsl --install``

4. Set up your Linux username and password (Remember this)
5. Restart your computer
6. Open Linux Terminal
(2 ways to access Linux Terminal)

**Microsoft Store** (Open Microsoft Store and search for Ubuntu)

![image](https://github.com/duc-beluga/Redis_Test/assets/98554622/a2efa425-288b-4811-aa52-21dd786d4870)

**Visual Studio Code Terminal**

![image](https://github.com/duc-beluga/Redis_Test/assets/98554622/7f7b0a55-7ebe-4791-8968-bcba1cc096a2)

6. Paste these 2 commands to install Redis:
   
``sudo apt-get update``

``sudo apt-get install redis``

8. Start Redis server:
   
``redis-server``

11. Start Interacting with Redis server (On a different Linux Terminal):
    
``redis-cli``

13. Common commands - Output:
    
``SET myKey "Hello"``  		``Ok``

``GET myKey``				``“Hello”``		

``KEYS *``				``myKey``		

``EXPIRE myKey 114``		``(integer) 1``	 

``TTL myKey``				``(integer) 114``

``DEL myKey``				``(integer) 1``	

Common Bugs:

### redis-server: Could not create server TCP listening socket *:6379: bind: Address already in use

Check which application is using port 6379: ``lsof -i :6379``

Try: 

``redis-cli`` -> ``shutdown``

``sudo /etc/init.d/redis-server stop``

### Can't handle RDB format version... 

delete ``dump.rdb`` file in working directory




