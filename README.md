simple-file-server
==================

A very simple (but useful!) node.js file server that can be installed on any machine running node.js.
The server:  
  1. Creates a nice html view of your file structure (using express.js directory filter). 
     You can then click any file which will open it using your browser default file handler 
     (e.g. streaming your videos, watch your photos, read pdfs etc.). 
     You can also right click the file and select "save as..." to download the file to a local folder.
  2. Provides all the files using standard HTTP GET.
  3. Provides basic authentication, if a json file called 'users.json' is created with the following format:
  ```json
  {
      "users": [
          {
              "name": "<username>",
              "password": "<password>"
          }
      ]
  }
  ```
  If no such file exists, there will be no authentication.


##### Using the server as a system service (on Linux) which starts on system startup (optional):
  1. `sudo apt-get install upstart`
  2. Place the file `run-file-server.conf` in your /etc/init folder.
  3. Make sure it's executable (`chmod +x /etc/init/run-file-server.conf`).
  4. The service will start automatically. You can also start/stop/restart using:
     `sudo start run-file-server`
     `sudo stop run-file-server`
     `sudo restart run-file-server`

##### What can I do with the server?
  Here are some ideas:
  1. Use for development for serving any static content your frontend application requires.
  2. Share your videos and photos with your family. Note that there's no security implemented, so don't open
     your ports in the router in this scenario (i.e. use it inside your home network).
  2. Install on a cloud machine to view and download files from a folder there.
  3. For development purposes, install on some server and have linkable files when you need static content 
     (e.g. I use it with Grunt-copy to fetch static files which are not stored in Git).
  4. Any other usage which requires efficient, quick, no configuration (and no security...) file server.
