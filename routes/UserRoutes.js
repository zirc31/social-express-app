/* 
    All routes pertaining to the resource: User
*/

const express = require('express');
const router = express.Router();

let users = [
    {
        "email" :    "zirc@dev.com",
        "username" : "zircdev",
        "password" : "123123456*"
    }
];

/* 
    CRUD functionalities
*/
// GET - http://localhost:<PORT>/allusers // for testing purposes only
router.get( '/allusers', ( request, response ) => {
    console.log('---');
    console.log(users);
    response.status( 200 ).send( { message: 'All user data has been sent to server logs.' } );
})

/* 
    Body
    {
        "email" : "User email",
        "username" : "Username",
        "password" : "User set password"
    }

    Response:
    // On success
    {
        "message" : "User has been successfully registered!"
    }

    // On error
    {
        "error" : "Cannot create user"
    }

    or

    {
        "error" : "Email already exists in the database"
    }
*/
// POST - http://localhost:<PORT>/register
router.post( '/register' , ( request, response ) => {

    if( request.body.email > "" && request.body.username > "" && request.body.password > "" ) {
        
        const userEmail = request.body.email;
        const emailFound = users.find( user => user.email === userEmail );

        const userName = request.body.username;
        const userFound = users.find( user => user.username === userName );
        
        if( emailFound ){
            console.log('---');
            console.log("error: ", "Email already exists in the database");
            response.status( 404 ).send( { error: "Email already exists in the database" } );
        }else if( userFound ) {
            console.log('---');
            console.log("error: ", "Username already exists in the database");
            response.status( 404 ).send( { error: "Username already exists in the database" } );
        }else{
            console.log('---');
            console.log("message: ", "User has been successfully registered!");
            users = [ ...users, request.body ];
            response.status( 201 ).send( { message: "User has been successfully registered!" } );
        }

    }else{
        console.log('---');
        console.log("error: ", "Cannot create user");
        response.status( 404 ).send( { error: "Cannot create user" } );
    }

});

/*
    On Success
    {
        "message" : "Successful login"
    }
    On Error
    {
        "error" : "Invalid credentials"
    } 
*/
// POST - http://localhost:<PORT>/login
router.post( '/login' , ( request, response ) => {
    if( request.body.email > "" && request.body.username > "" && request.body.password > "" ) {
        
        const inputUserEmail = request.body.email;
        const inputUserName = request.body.username;
        const inputUserPassword = request.body.password;

        const checkExistingUserIndex = users.findIndex( user => user.username === inputUserName );

        if( checkExistingUserIndex === -1) {
            console.log('---');
            console.log(checkExistingUserIndex);
            console.log("error: ", "Invalid credentials");
            response.status( 404 ).send( { error: "Invalid credentials" } );
        }else{
            if( users[checkExistingUserIndex].email === inputUserEmail &&
                users[checkExistingUserIndex].username === inputUserName &&
                users[checkExistingUserIndex].password === inputUserPassword
                ) {
                    console.log('---');
                    console.log(checkExistingUserIndex);
                    console.log(inputUserEmail);
                    console.log(inputUserName);
                    console.log(inputUserPassword);
                    console.log("message: ", "Successful login");
                    response.status( 200 ).send( { message : "Successful login" } );
            }else{
                console.log('---');
                console.log("error: ", "Invalid credentials");
                response.status( 404 ).send( { error: "Invalid credentials" } );
            }
        }

    }else{
        console.log('---');
        console.log("error: ", "Invalid credentials");
        response.status( 404 ).send( { error: "Invalid credentials" } );
    }
});

// PUT - http://localhost:<PORT>/*
router.put( `/`, ( request, response ) => {
    response.status( 200 ).send(``);
});

// DELETE - http://localhost:<PORT>/*
router.delete( `/`, ( request, response ) => {
    response.status( 200 ).send(``);
})


// Export
module.exports = router;