

var homeDir = Titanium.Filesystem.getUserDirectory();
var mySampleFile = Titanium.Filesystem.getFile(homeDir, 'sample.txt');

if (mySampleFile.exists()) {
    alert('A file called sample.txt already exists in your home directory.');
}
