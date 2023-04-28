/* 
    All routes pertaining to the resource: User
*/

const express = require('express');
const router = express.Router();
const {v4: uuidv4 } = require('uuid');

let users = [
    {
        "email" :    "zirc@dev.com",
        "username" : "zircdev",
        "password" : "123123456*"
    },
    {
        "email" :    "zircky@dev.com",
        "username" : "zircky",
        "password" : "123123456*"
    }
];

let posts = [
    {
        postid: 'e2e62546-2e37-4f16-85f1-1d0bd6423841',
        content: 'This is a content posts 1.',
        timeCreated: '2023-04-28T16:56:11.277Z',
        timeUpdated: '2023-04-28T16:56:11.277Z',
        author: 'zircdev',
        status: 'active'
    },
    {
        postid: 'e2e62546-2e37-4f16-85f1-1d0bd6423952',
        content: 'This is a content posts 2.',
        timeCreated: '2023-04-28T16:56:11.277Z',
        timeUpdated: '2023-04-28T16:56:11.277Z',
        author: 'zircky',
        status: 'active'
    },
    {
        postid: 'e2e62546-2e37-4f16-85f1-1d0bd6423063',
        content: 'This is a content posts 3.',
        timeCreated: '2023-04-28T16:56:11.277Z',
        timeUpdated: '2023-04-28T16:56:11.277Z',
        author: 'zircdev',
        status: 'active'
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
                    users[checkExistingUserIndex].status = 'logged';
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


// GET - http://localhost:<PORT>/allposts // for testing purposes only
router.get( '/allposts', ( request, response ) => {
    console.log('---');
    console.log('Posts:', posts);
    response.status( 200 ).send( { message: 'All posts data has been sent to server logs.' } );
})

// GET - http://localhost:<PORT>/:userid/posts
router.get( '/:userid/posts' , ( request, response ) => {
    const userId = request.params.userid;

    const filteredPosts = posts.filter( post => {
        // filter by userid
        return post.author === userId;
    });

    console.log('---');
    console.log("Posts: ", filteredPosts);
    response.status( 200 ).send( { Posts: filteredPosts} );
});


// POST - http://localhost:<PORT>/:userid/posts
router.post( '/:userid/posts' , ( request, response ) => {
    const userId = request.params.userid;
    const inputContent = request.body.content;

    const userFound = users.find( user => user.username === userId );

    if( userFound ) {
        if( inputContent > '' ) {
            console.log('---');
            posts = [ ...posts, {
                "postid": uuidv4(),
                "content": inputContent,
                "timeCreated": new Date(),
                "timeUpdated": new Date(),
                "author": userId,
                "status": "active"
            }];
            console.log(posts);
            console.log("message: ", "Post has been successfully created");
            response.status( 201 ).send( { message: "Post has been successfully created" } );
        }else{
            console.log('---');
            console.log("error: ", "An error occured while creating new post.");
            response.status( 404 ).send( { error: "An error occured while creating new post." } );
        }
    }else{
        console.log('---');
        console.log("error: ", "An error occured while creating new post.");
        response.status( 404 ).send( { error: "An error occured while creating new post." } );
    }
});



/**
 * 
 * let posts = [
    {
        postid: 'e2e62546-2e37-4f16-85f1-1d0bd6423841',
        content: 'This is a content posts 1.',
        timeCreated: '2023-04-28T16:56:11.277Z',
        timeUpdated: '2023-04-28T16:56:11.277Z',
        author: 'zircdev',
        status: 'active'
    },
 * 
 */
// PUT - http://localhost:<PORT>/:userid/posts/:postid
router.put( '/:userid/posts/:postid' , ( request, response ) => {
    const userId = request.params.userid;
    const postId = request.params.postid;
    const inputContent = request.body.content;

    const userFound = users.find( user => user.username === userId );
    const postIdFound = posts.find( post => post.postid === postId );

    if( postIdFound && userFound ) {
        if( inputContent > '' ) {
            
            const postIndex = posts.findIndex( post => post.postid === postId );
            posts[ postIndex ].content = inputContent;
            posts[ postIndex ].timeUpdated = new Date();

            console.log('---');
            console.log("message: ", "Post has been updated.");
            response.status( 200 ).send( { message: "Post has been updated." } );
        }else{
            console.log('---');
            console.log("error: ", "Cannot update post.");
            response.status( 404 ).send( { error: "Cannot update post." } );
        }
    }else{
        console.log('---');
        console.log("error: ", "Cannot update post.");
        response.status( 404 ).send( { error: "Cannot update post." } );
    }
});


// Export
module.exports = router;