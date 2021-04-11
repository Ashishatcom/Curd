const express = require('express');
const passport = require('passport')
const { PORT } = require('./config/constants');
const { connect } = require('./commons/services/mongodb');
const user = require('./routes/users');
const cluster  = require('cluster');
const os = require('os')
const numCpus =  os.cpus().length;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use(passport.session())

app.use('/',user);
connect();

if(cluster.isMaster){
    for(let i=0; i < numCpus; i++){
    cluster.fork()
     
    }
    cluster.on('exit',(worker,code,signal)=>{
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork()
    })
}else{
    app.listen(PORT,()=>console.log(`server is listening on${process.pid} http://localhost:${PORT}`));

}