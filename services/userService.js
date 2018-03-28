const models    =   require('../models/index');



let addUser = (profile)=> {
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
                    username: 'nitn',
                    firstname: 'Nitin',
                    lastname: 'Jain',
                    password: 'nitin1234',
                    email_id: 'nitin.jain@quovantis.com',
                    isAdmin: true,
                    skype_id: 'nitin.jain.qvt',
                    title: 'Trainee Software Engineer',
                    practice_group: 'Open source',
                    employee_id: 'QVT-17-1233'
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



let findByGoogleId = (googleId)=> {
    return new Promise((resolve, reject)=> {
        models.User.findOne({google_id: googleId})
            .then((doc)=> {
                resolve(doc);
            }, (err)=> {
                reject(err);
            })
    });
}


module.exports = {
    addUser,
    findByGoogleId,
    addAdmin
}