/**
 * @author P.I.akura
 */
var _style;

Ak.createFirstWindow = function () {
	var win = Ti.UI.createWindow({title:'userinfo',tabBarHidden:true});
	
	var tableView = Ti.UI.createTableView(_style.table);
	
	win.add(tableView);
	win.addEventListener('open',function () {
		Ak.cRow(tableView);
	})
	
	return win;
}
Ak.cRow = function  (tv){
	avc = Ak.tClient.account_verify_credentials({});
	var rowData = [];

	var row = Ak.createAccountRow(avc,Ak.createHomeWindow);
	rowData.push(row);
	
	tv.data = rowData;
} 

_style = {};
_style.table = {}