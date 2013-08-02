var jade = require('jade');
var locals = {
};
var options = {
};
var fn = jade.compile('string of jade', options);
fn(locals);
function greeter(person) {
    return "Hello, " + person.firstname + " " + person.lastname;
}
var user = {
    firstname: "Jane",
    lastname: "Foster"
};
if(locals.document) {
    document.body.innerHTML = greeter(user);
} else {
    console.log(greeter(user));
}
