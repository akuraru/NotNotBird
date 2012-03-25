/**
 * @author P.I.akura
 */
Ak.createFirstWindow = function () {
	var win = Ti.UI.createWindow({title:'userinfo',tabBarHidden:true});
	
	var rowData = [];
	var row = Ak.createAccountRow(avc,Ak.createHomeWindow);
	rowData.push(row);
	
	var tableView = Ti.UI.createTableView({data:rowData});
	win.add(tableView);
	
	return win;
}