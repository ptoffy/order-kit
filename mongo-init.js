db.createUser({
    user: 'root',
    pwd: 'password',
    roles: [{
        role: 'readWrite',
        db: 'order-kit'
    }]
})

db.auth('root', 'password')
db = new Mongo().getDB('mydatabase')
