![Havana-logo](https://user-images.githubusercontent.com/77046928/179751866-504cdc5f-840d-4c41-8cfe-2fc18d3d5a8f.png)
## Following and seenig vacations.
Havana is a full stack project created with multiple web technologies
and stacks.

## Website Ui Preview

users are presented with a login and register page.

![Image 19-07-2022 at 15 23](https://user-images.githubusercontent.com/77046928/179750038-7666fc0f-df8a-4557-8a86-a25634627c0a.jpg)

if user is logged in as a regular user he is presented with vacations,
that he can follow.

![Image 19-07-2022 at 15 24](https://user-images.githubusercontent.com/77046928/179750556-a8aa3246-699e-4743-9479-65b1a797bda0.jpg)

if user is an admin he is presented with an admin ui.

![Image 19-07-2022 at 15 32](https://user-images.githubusercontent.com/77046928/179751656-c5bb3864-6a4c-43db-b319-c3b9df1255af.jpg)

then he can add new vacations or edit an existing one

![Image 19-07-2022 at 15 33](https://user-images.githubusercontent.com/77046928/179751513-f9dcbb9d-2a91-46a9-a0ca-0879a603740d.jpg)


## Features

- performs user validations 
- has user side and admin side
- users can follow and unfollow vacations 
- admin can make changes to vacations and add new ones
- updates changes for users in real time - using socket.io
- pagination using react paginate package

## Tech

Havana uses a number of open source projects to work properly:

- react - frontend framework for component based websites
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- npm - havana uses multiple npm packages such as - jwt, joi, socket.io, etc...

And of course Havana itself is open source with a on GitHub.`

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

after downloading all files.

open separate terminals on frontend and backend and enter command.
```
npm i 
```

then go to phpMyAdmin and import the provided database,
then go to backend config and add your localhost data to connect to database.
 
after all go to both terminals and enter command.

```
npm start
```

 a new browser window should open with the havana website.

## License

MIT



