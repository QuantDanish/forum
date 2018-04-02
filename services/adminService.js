const Department    =   require('../models/index').Department;
const User    =   require('../models/index').User;


let addNewDepartment    =   ( deptName, dept_email_id)=> {
    return new Promise( (resolve, reject)=> {
        let name =  deptName.toUpperCase();
        Department.findOne({name}).then((doc)=> {
            if(doc) {
                let err = new Error('Department Already Exists');
                err.status = 409; //conflict.
                return reject(err);
            }

            // new department
            let newDept     =   new Department({name,dept_email_id});

            newDept.save().then((doc)=> {
                resolve({
                    status: 200,
                    message: `${doc._doc.name} is added successfully`,
                    data: doc._doc
                });
            }, (err)=> {
                reject(err);
            });

        }).catch((err)=> {
            reject(err);
        });
    });
}


let blockUser   =   (username)=> {
    return new Promise((resolve, reject)=> {
        User._findOneAndUpdate({username},{
            $set: {
              'isblocked': true
            }
        }).then((user)=>{
            if(!user){
                reject( new Error('User not found').status(400));
            }
            resolve({
                status: 200,
                message: `${user.username} is blocked`,
                data: user
            });
        }).catch((err)=>{reject(err)})
    });
}


module.exports = {
    addNewDepartment,
    blockUser
}