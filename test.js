// 添加用户
function addUserData() {
  // 创建||打开数据库
  let request = window.indexedDB.open('glip', 1)

  request.onerror = function(e) {
    console.log('onerror: ' + event.target.errorCode);
  }
  
  request.onupgradeneeded = e => {
    console.log('onupgradeneeded');
    let db = e.target.result
    if (!db.objectStoreNames.contains('users')) {
      let objectStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: false })
      // let indexNames = objectStore.indexNames
      // if (indexNames.contains('name')) {
      //   objectStore.deleteIndex('name')
      // }
      // objectStore.createIndex('name', 'name', {unique: true})
    }
  }
  
  request.onsuccess = e => {
    console.log('onsuccess');
    let db = e.target.result
    let transaction = db.transaction(['users'], 'readwrite')
    let objectStore = transaction.objectStore('users')
    let r = objectStore.put({
      id: (new Date()).valueOf(),
      name: 'linbin',
      age: '10',
      sex:'man'
     })
     r.onerror = e => console.log('error');
     r.onsuccess = e => console.log('success')
  }
}

// 获取全部用户
function getAllUserData() {
  // 创建||打开数据库
  let request = window.indexedDB.open('glip', 1)

  request.onerror = function(e) {
    console.log('onerror: ' + event.target.errorCode);
  }
  
  request.onupgradeneeded = e => {
    console.log('onupgradeneeded');
    let db = e.target.result
    if (!db.objectStoreNames.contains('users')) {
      let objectStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: false })
    }
  }
  
  request.onsuccess = e => {
    console.log('onsuccess');
    let db = e.target.result
    let transaction = db.transaction(['users'], 'readonly')
    let objectStore = transaction.objectStore('users')
    let r = objectStore.openCursor()
    let results = []
    r.onsuccess = e => {
      let cursor = e.target.result
      if (cursor) {
        results.push(cursor.value)
        cursor.continue()
      }
      else {
        // 所有的object都在results里面
        document.getElementById('pre').innerHTML = (JSON.stringify(results, null, 2))
      }
    }
    r.onerror = e => console.log('error');
  }
}



// var NAME = 'glip'; // database name
// var SERSION = 1; // database version


// function save(){
//   var obj = {
//     id: document.getElementById('id').value,
//     name: document.getElementById('name').value,
//     age: document.getElementById('age').value,
//     gender: document.getElementById('gender').value
//   }



// }

// // 打开数据库
// function _open(callback){
//   let request = window.indexedDB.open(NAME, SERSION);

//   request.onerror = function(e) {
//     console.log('open database error: ' + event.target.errorCode);
//   }

//   request.onupgradeneeded = e => {
//     console.log('open database upgradeneeded');
//     let db = e.target.result
//     if (!db.objectStoreNames.contains('users')) {
//       let objectStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: false })

//       let indexNames = objectStore.indexNames
//       if (indexNames.contains('name')) {
//         objectStore.deleteIndex('name')
//       }
//       objectStore.createIndex('name', 'name', {unique: true})
//     }
//   }

//   request.onsuccess = e => {
//     console.log('open database success');
//     let db = e.target.result;
//     callback(db);
//   }
// }











// 修改索引
function updateIndex(){
  let request = window.indexedDB.open('glip', 1)
  
  request.onerror = e => {
    alert('update index open error: ' + event.target.errorCode);
  }

  request.onupgradeneeded = e => {
    let objectStore = e.target.transaction.objectStore('users')
    let indexNames = objectStore.indexNames
    if (indexNames.contains('name')) {
      objectStore.deleteIndex('name')
    }
    objectStore.createIndex('name', 'name', {unique: false})
  }

  request.onsuccess = e => {
    let db = e.target.result
    // ...
}
}





// 创建索引 (indexName, objectKey, options)
// objectStore.createIndex('name', 'name', { unique: true })




// var openRequest = indexedDB.open("test",1);

// var db;

// openRequest.onupgradeneeded = function(e) {
//     console.log("Upgrading...");
// }
 
// openRequest.onsuccess = function(e) {
//     console.log("Success!");
//     db = e.target.result;
//     // // if(!db.objectStoreNames.contains("users")) {
//     // //   db.createObjectStore("users");
//     // // }

//     // var t = db.transaction(["users"],"readwrite");
//     // t.onabort = function(event) {
//     //   console.log('transaction abort!')
//     // }
//     // t.oncomplete = function(event) {
//     //   console.log('transaction complete!')
//     // }
//     // t.onerror = function(event) {
//     //   console.log('transaction error!')
//     // }
    
//     // var store = t.objectStore("users", { keyPath: "username" });
//     // var o = {
//     //   username: 'linbin',
//     //   password: '123'
//     // }
//     // var addRequest = store.add(o);
//     // addRequest.onerror = function(e) {
//     //   console.log("Error", e.target.error.name);
//     // }
    
//     // addRequest.onsuccess = function(e) {
//     //   console.log("数据添加成功！");
//     // }

// }
 
// openRequest.onerror = function(e) {
//     console.log("Error");
//     console.dir(e);
// }






// // var idb = window.indexedDB || window.msIndexedDB || window.mozIndexedDB || window.webkitIndexedDB;

// // var request, // IDBRequest
// // database; // IDBDatabase

// // request = idb.open('admin');

// // request.onerror = function(event) {
// //   alert('Something bad happened while trying to open: ' + event.target.errorCode);
// // }

// // request.onsuccess = function(event) {
// //   database = event.target.result;
// //   // if(database.version !== '1.0') {
// //   //   request = database.setVersion('1.0'); // 没有setVersion方法
// //   //   request.onerror = function(event) {
// //   //     alert('Something bad happened while trying to set version: ' + event.target.errorCode);
// //   //   }

// //   //   request.onsuccess = function(event) {
// //   //     alert('Database initialization complete. Database name: ' + database.name + ', Version: ' + database.version);
// //   //   }
// //   // } else {
// //   //   alert('Database already initalization. Database name: ' + database.name + ', Version: ' + database.version)
// //   // }
// //   var store = database.createObjectStore('users', { keyPath: 'username'});


// // }

// // var abc;