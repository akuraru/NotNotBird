/**
 * @author P.I.akura
 */

function postWindow(){
	win = Ti.UI.createWindow({title:'Home',backgroundColor:'white'});
	
	var text=Ti.UI.createTextArea({
		value:'e',
		top:0,
        height:150,
        borderWidth:1,
	})
	win.add(text);
	win.add((function(){
		var button = Ti.UI.createButton({
			top:160, right:10,
			height:20, width:100,
			title:'send',
		});
		button.addEventListener('click', function(e) {
			tClient.statuses_update({parameters:[['status',text.value]]});
		});
		return button
	})())
	
	return win; 
}

exports = postWindow;