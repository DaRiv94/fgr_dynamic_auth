const auth_routes = require('../routes/auth');

module.exports=(app)=>{

//routes
app.get('/',(req,res)=>{
    res.send("This is the root page");
})

app.use('/auth', auth_routes);

}