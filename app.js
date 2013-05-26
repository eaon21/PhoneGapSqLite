(function($){
		$(function () {
			
OnBodyLoad();
$('#addBtn').click(function()
{
	AddValueToDB()
});

$('#refBtn').click(function()
{
	ListDBValues()
});	
		});
	
var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 65535;

function errorHandler(transaction, error) {
   alert('Error: ' + error.message + ' code: ' + error.code);
}


function successCallBack() {
   alert("DEBUGGING: success");
}

function nullHandler(){};

function OnBodyLoad(){

alert("DEBUGGING: Opening database.");

 if (!window.openDatabase) {
   alert('Databases are not supported in this browser.');
   return;
 }


 db = openDatabase(shortName, version, displayName,maxSize);

 db.transaction(function(tx){
   tx.executeSql('CREATE TABLE IF NOT EXISTS User(UserId INTEGER NOT NULL PRIMARY KEY, FirstName TEXT NOT NULL, LastName TEXT NOT NULL)',[],nullHandler,errorHandler);
 },errorHandler,successCallBack);
}


function ListDBValues() 
{
 if (!window.openDatabase) {
  alert('Databases are not supported in this browser.');
  return;
 }

 $('#lbUsers').html('');

db.transaction(function(transaction) {
   transaction.executeSql('SELECT * FROM User;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
          var row = result.rows.item(i);
          $('#lbUsers').append('<br>' + row.UserId + '. ' + row.FirstName+ ' ' + row.LastName);
        }
      }
     },errorHandler);
 },errorHandler,nullHandler);

 return;
}

function AddValueToDB() 
{
	
 if (!window.openDatabase) 
 {
   alert('Databases are not supported in this browser.');
   return;
 }
 db.transaction(function(transaction) 
	 {
		 transaction.executeSql('INSERT INTO User(FirstName, LastName) VALUES (?,?)',[$('#txFirstName').val(), $('#txLastName').val()], nullHandler,errorHandler);
	 }
	 );
 ListDBValues();
}
})(jQuery);