const models    =   require('../models/index');

/*  Logout user. Removes token form database*/
let logout = (token)=> {
    return models.Token.findOneAndRemove({token});
}


let addGoogleUser = (profile)=> {
    return new Promise( (resolve, reject)=> {
        let newUser     =   new models.User({
            google_id: profile.id,
            username: profile.displayName,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email_id: profile.emails[0].value,
            photo: profile.photos[0].value,
        });


        newUser.save().then(( doc)=> {
            resolve(doc);
        }).catch((err)=> {
            reject(err);
        });
    });
}

// add admin
let addAdmin  =   ()=> {

    models.User.findOne({isAdmin: true})
        .then( (doc)=> {
            if( !doc) {
                let admin   =   new models.User({
                    username: 'nitin',
                    firstname: 'Nitin',
                    lastname: 'Jain',
                    password: 'nitin1234',
                    email_id: 'nitin.jain@quovantis.com',
                    isAdmin: true,
                    skype_id: 'nitin.jain.qvt',
                    title: 'Trainee Software Engineer',
                    practice_group: 'Open source',
                    employee_id: 'QVT-17-1233',
                    dob: Date.now()
                });

                admin.save()
                    .then( (doc)=> {
                        console.log('Admin Added successfully');
                    }, (err)=> {
                        console.log('Error while adding Admin :', err.message);
                    });
            }
        },(err)=> {
            console.log("Admin adding Error: ", err.message);
        });

}


let find = (info)=> {
    return models.User.findOne(info)
}

let findById    =   (id)=> {
    return models.User.findById(id)
}

let findAndAdd = (user)=> {
    return new Promise( (resolve, reject)=> {
        find({username: user.username}).then((doc)=> {
            if(doc){
                // user already exists.
                let err     =   new Error(`${user.username} ! you have already registered`)
                err.status = 409; //conflict.
                return reject(err);
            }

            if(!doc) {
                // new user sign up
                user.username = user.username;
                let newUser = new models.User( user);
                newUser.save().then((doc)=> {
                    return resolve({
                        message: `${doc.username} ! Registration Successful`
                    });
                },(err)=> {
                    return reject(err)
                });
            }
        }).catch( (err)=> {
            return reject(err);
        });
    });
}





module.exports = {
    addGoogleUser,
    find,
    addAdmin,
    findAndAdd,
    findById,
    logout
}