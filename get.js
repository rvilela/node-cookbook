var snmp = require('snmp-native');

var host = 's154-1';  // SO Windows 7
var community = 'public';

// A session is required to communicate with an agent.
var session = new snmp.Session({
	host : host,
	community : community
});

// All OIDs are represented as integer arrays.
// There is no interpretation of string or MIB names.
// OID para o processador 1:
// var oid = [ 1, 3, 6, 1, 2, 1, 25, 3, 3, 1, 2, 8 ];  // Processador
var oid = [ 1, 3, 6, 1, 4, 1, 8072, 2, 1, 3 ];  // net-snmp
var vb;

// oid net-snmp: 1.3.6.1.4.1.8072.2.1.3

// This is how you issue a simple get request.
session.get({
	oid : oid
}, function(err, varbinds) {

	if (err) {
		// If there is an error, such as an SNMP timeout, we'll end up here.
		console.log(err);
	} else {
		vb = varbinds[0];
		console.log('vb.value: ' + vb.value);
		console.log('vb.oid: ' + vb.oid);
	}

	// The session must be closed when you're done with it.
	session.close();
});
