var uniqueId = function() {
  var date = Date.now();
  var random = Math.random() * Math.random();

  return Math.floor(date * random).toString();
};

var theMessage = function(text1, text2) {
  return {
  	name:text1,
    message:text2,
    id: uniqueId()
  };
};

var account = function(textName, done) {
  return {
    name:textName,
    done: !!done,
    id: uniqueId()
  };
};

var messageList = [];
var accountInfo = [];

function run(){
	var appContainer = document.getElementsByClassName('chat')[0];
	appContainer.addEventListener('click', delegateEvent);
	var allTasks = restore("messageList");
  var accInfo = restore("accountInfo");
  if (accInfo != null) {
  createAccountInfo(accInfo);
}
if (allTasks != null) {
	createAllMessages(allTasks);
}
}

function createAllMessages(allMessages) {
  for(var i = 0; i < allMessages.length; i++)
    addOldMessage(allMessages[i]);
}

function createAccountInfo(accI) {
  if (accI[0].done == true) {
    document.getElementById('logout').style.display = 'block'; 
    document.getElementById('send').style.display = 'block'; 
    document.getElementById('signIn1').style.display = 'none';

    HTMLTextButtonEditName = '<input type="button" value = "Edit" onClick="editName(this)" class="btn btn-primary">';
    var tr22 = document.getElementById('td2_2');
    tr22.innerHTML = HTMLTextButtonEditName;
    var tr11 = document.getElementById('td1_1');
    var table = document.getElementById('table3');
    tr11.innerHTML = accI[0].name;
    table.appendChild(tr11);
    table.appendChild(tr22);
    var newAcc = account(accI.name, true);
    accountInfo.push(newAcc);
  }
}

function editName(obj) {
  document.getElementById('whitewindow2').style.display = 'block';
  document.getElementById('block').style.display = 'block';
  document.getElementById('nameEdit').value = document.getElementById('td1_1').innerHTML;
}

function saveName() {
  var oldName = document.getElementById('td1_1').innerHTML;
  var editName = document.getElementById('nameEdit').value;
  if (!editName) return;
  if (oldName == editName) return;
  document.getElementById('td1_1').innerHTML = editName;
  updateLocalStorage(editName, oldName);
}

function updateLocalStorage(editName, oldName) {
  for (var i = 0; i < messageList.length; i++) {
    if (messageList[i].name == oldName) {
      messageList[i].name = editName;
    }
  }
  accountInfo[0].name = editName;
  store(accountInfo, "accountInfo");
  store(messageList, "messageList");
  location.reload();
}

function delegateEvent(evtObj) {
  if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-add')){
    
  }
  if(evtObj.type === 'click' && evtObj.target.classList.contains('signin1')){
    show('block');
  }
  if(evtObj.type === 'click' && evtObj.target.classList.contains('signin2')){
    nameButtonClick(evtObj);
  }
  if(evtObj.type === 'click' && evtObj.target.classList.contains('send')){
    sendButtonClick(evtObj);
  }
  if(evtObj.type === 'click' && evtObj.target.classList.contains('logout')){
    logOutButtonClick(evtObj);
  }
}

function logOutButtonClick(){
  localStorage.removeItem("accountInfo");
  document.getElementById('logout').style.display = 'none'; 
  document.getElementById('send').style.display = 'none'; 
  document.getElementById('signIn1').style.display = 'block';
  var tr11 = document.getElementById('td1_1');
  tr11.innerHTML = "";
  show('none');
  location.reload();
} 

function nameButtonClick(){
  document.getElementById('signIn1').style.display = 'none';
  document.getElementById('logout').style.display = 'block'; 
  var name = document.getElementById('name');
  if(!name.value){
    return;
  }
  var newAcc = account(name.value, true);
  accountInfo.push(newAcc);
  addName(name.value);
  name.value = '';
  store(accountInfo, "accountInfo");
  location.reload();
} 

function addName(value) {
  document.getElementById('send').style.display = 'block'; 
  show('none');
  var tr11 = document.getElementById('td1_1');
  var table = document.getElementById('table3');
  tr11.innerHTML = value;
}

function sendButtonClick(){
	var tr11 = document.getElementById('td1_1');
	var message = document.getElementById('message');
  message.value = message.value.replace(/\n/g, "<br />");
  var newMessage = theMessage(tr11.innerHTML, message.value);
  if(message.value == '')
    return;
  addMessage(newMessage);
  message.value = '';
  store(messageList, "messageList");
}

function addMessage(task) { 
  var HTMLTextButtonDelete = '<input type="button" value = "Delete" onClick="deleteRow(this)" class="btn btn-primary">';
  var HTMLTextButtonEdit = '<input type="button" value = "Edit" onClick="editRow(this)" class="btn btn-primary">';
  messageList.push(task);
  var table = document.getElementById('table2');
  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);
  row.insertCell(0).innerHTML = HTMLTextButtonEdit
  row.insertCell(1).innerHTML = HTMLTextButtonDelete;
  var tr11 = document.getElementById('td1_1');
  row.insertCell(2).innerHTML = tr11.innerHTML; 
  row.insertCell(3).innerHTML = task.message; 
  var elem = document.getElementById('sc');
  elem.scrollTop = elem.scrollHeight;
}

function addOldMessage(task) {
  var tr11 = document.getElementById('td1_1');
  var HTMLTextButtonDelete = '<input type="button" value = "Delete" onClick="deleteRow(this)" class="btn btn-primary">';
  var HTMLTextButtonEdit = '<input type="button" value = "Edit" onClick="editRow(this)" class="btn btn-primary">';
  var table = document.getElementById('table2');
  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);
  if(task.name == tr11.innerHTML) {
    row.insertCell(0).innerHTML = HTMLTextButtonEdit;
    row.insertCell(1).innerHTML = HTMLTextButtonDelete;
  }
  else {
    row.insertCell(0).innerHTML = "";
    row.insertCell(1).innerHTML = "";
  }
  messageList.push(task);
  row.insertCell(2).innerHTML = task.name; 
  row.insertCell(3).innerHTML = task.message; 
  var elem = document.getElementById('sc');
  elem.scrollTop = elem.scrollHeight;
}

function deleteRow(obj) {
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("table2");
    table.deleteRow(index);
    messageList.splice(index - 1, 1);
    store(messageList, "messageList");
}

var indexEditRow = 0;
function editRow(obj) {
  document.getElementById('whitewindow3').style.display = 'block';
  document.getElementById('block').style.display = 'block';
  document.getElementById('editMessage').innerHTML = obj.parentNode.parentNode.cells[3].innerHTML.replace(/<br>/gi, '\n');
  indexEditRow = obj.parentNode.parentNode.rowIndex;
  var editText = obj.parentNode.parentNode.cells[3].innerHTML;
}

function saveRow() {
  var message = document.getElementById('editMessage');
  message.value = message.value.replace(/\n/g, "<br />");
  if(message.value == '')
    return;
  messageList[indexEditRow - 1].message =  message.value;
  store(messageList, "messageList");
  document.getElementById('whitewindow3').style.display = 'none';
  document.getElementById('block').style.display = 'none';
  location.reload();
}

function store(listToSave, str) {
  if(typeof(Storage) == "undefined") {
    alert('localStorage is not accessible');
    return;
  }
  localStorage.setItem(str, JSON.stringify(listToSave));
}

function restore(str) {
  if(typeof(Storage) == "undefined") {
    alert('localStorage is not accessible');
    return 0;
  }

  var item = localStorage.getItem(str);

  return item && JSON.parse(item);
}

function show(state){
  document.getElementById('block').style.display = state;  
  document.getElementById('whitewindow1').style.display = state;    
}

