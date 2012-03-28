/**
 * @author P.I.akura
 */
var tv;

function firstWindow() {
	var _style = require('/style/firstWindow');
	
	var win = Ti.UI.createWindow(_style.window);
	
	tv = Ti.UI.createTableView(_style.table);
	
	win.add(tv);
	win.cRow = cRow;
	
	return win;
}
function cRow (){
	Ti.API.info('open cRow')
	var rowData = [];

	var row = new (require('/ui/AccountRow'))(avc);
	row.addEventListener('click',function (){
		Ti.API.info('cRow,event')
		tab.open(new (require('/ui/homeWindow'))());
	})
	rowData.push(row);
	
	tv.data = rowData;
}

exports = firstWindow;