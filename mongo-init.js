db.createUser({
    user: 'root',
    pwd: 'password',
    roles: [{
        role: 'readWrite',
        db: 'orders'
    }]
});

db = new Mongo().getDB('mydatabase');
