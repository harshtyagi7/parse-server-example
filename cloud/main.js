
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});


Parse.Cloud.define("addPosts", function(request, response) {
  var payload = request.params.requests;
  var FBPost = Parse.Object.extend("FBPosts");
  var posts = [];
  for (var i =0; i< payload.length; i++) {
  	var fbPost = new FBPost();
  	var body = payload[i].body;
  	var keys = Object.keys(body)
  	for (var j=0; j < keys.length; j++) {
  		fbPost.set(keys[j], body[keys[j]]);
  	}
  	posts.push(fbPost);
  }
  Parse.Object.saveAll(posts,{
    success: function(list) {
        console.log("addPosts success. List length: " + list.length);
        response.success({'Posts_Length:' : list.length});
    },
    error: function(error) {
    	console.log("addPosts Error. error: " + error);
        response.error('Posts Update Failed: ' + error);
    }
  });
});

Parse.Cloud.define("updatePosts", function(request, response) {
  console.log("1. Update Posts Called");
  var payload = request.params.requests;
  var objectIDS = [];
  var objectData = {};
  for (var i =0; i< payload.length; i++) {
  	var objectId = payload[i].objectId;
  	var body = payload[i].body;
  	objectData[objectId] = body;
  	objectIDS.push(objectId);
  }
  console.log("ObjectsIDS length: " + objectIDS.length);
  var FBPost = Parse.Object.extend("FBPosts");
  var posts = [];
  var query = new Parse.Query(FBPost);
  query.containedIn("objectId", objectIDS);
  query.limit(1000);
  query.find({
	  success: function(results) {
	    console.log("Successfully retrieved " + results.length + " posts.");
	    // Do something with the returned Parse.Object values
	    for (var i = 0; i < results.length; i++) {
	      var object = results[i];
	      var body = objectData[object.id];
	      var keys = Object.keys(body)
	  	  for (var j=0; j < keys.length; j++) {
	  		// console.log("Key: " + keys[j] + ". Value: " + body[keys[j]]);
	  		// console.log("object[keys[j]]: " + object[keys[j]]);
	  		// console.log("object.get(keys[j]): " + object.get(keys[j]));
	  		object.set(keys[j], object.get(keys[j]) + "," + body[keys[j]]);
	  	  }
	  	  posts.push(object);
	      // console.log(object.id + ' - ' + "saved");
	    }
	    Parse.Object.saveAll(posts);
	    response.success({'Posts_Length:' : results.length});
	  },
	  error: function(error) {
	  	response.error('Posts Update Failed');
	    console.log("Error: " + error.code + " " + error.message);
	  }
  });
  
});

Parse.Cloud.define("addPostsMinimal", function(request, response) {
  var payload = request.params.requests;
  var FBPost = Parse.Object.extend("FBPostsMin");
  var posts = [];
  for (var i =0; i< payload.length; i++) {
  	var fbPost = new FBPost();
  	var body = payload[i].body;
  	var keys = Object.keys(body)
  	for (var j=0; j < keys.length; j++) {
  		fbPost.set(keys[j], body[keys[j]]);
  	}
  	posts.push(fbPost);
  }
  Parse.Object.saveAll(posts,{
    success: function(list) {
        console.log("addPosts success. List length: " + list.length);
        response.success({'Posts_Length:' : list.length});
    },
    error: function(error) {
    	console.log("addPosts Error. error: " , error);
        response.error('Posts Update Failed: ' + error);
    }
  });
});

Parse.Cloud.define("updatePostsMinimal", function(request, response) {
  console.log("1. Update Posts Called");
  var payload = request.params.requests;
  var objectIDS = [];
  var objectData = {};
  for (var i =0; i< payload.length; i++) {
  	var objectId = payload[i].objectId;
  	var body = payload[i].body;
  	objectData[objectId] = body;
  	objectIDS.push(objectId);
  }
  console.log("ObjectsIDS length: " + objectIDS.length);
  var FBPost = Parse.Object.extend("FBPostsMin");
  var posts = [];
  var query = new Parse.Query(FBPost);
  query.containedIn("objectId", objectIDS);
  query.limit(1000);
  query.find({
	  success: function(results) {
	    console.log("Successfully retrieved " + results.length + " posts.");
	    // Do something with the returned Parse.Object values
	    for (var i = 0; i < results.length; i++) {
	      var object = results[i];
	      var body = objectData[object.id];
	      var keys = Object.keys(body)
	  	  for (var j=0; j < keys.length; j++) {
	  		// console.log("Key: " + keys[j] + ". Value: " + body[keys[j]]);
	  		// console.log("object[keys[j]]: " + object[keys[j]]);
	  		// console.log("object.get(keys[j]): " + object.get(keys[j]));
	  		object.set(keys[j], object.get(keys[j]) + "," + body[keys[j]]);
	  	  }
	  	  posts.push(object);
	      // console.log(object.id + ' - ' + "saved");
	    }
	    Parse.Object.saveAll(posts, {
		    success: function(list) {
		        console.log("addPosts success. List length: " + list.length);
		        response.success({'Posts_Length:' : list.length});
		    },
		    error: function(error) {
		    	console.log("addPosts Error. error: " , error);
		        response.error('Posts Update Failed: ' + error);
		    }
	    });
	    response.success({'Posts_Length:' : results.length});
	  },
	  error: function(error) {
	  	response.error('Posts Update Failed');
	    console.log("Error: " + error.code + " " + error.message);
	  }
  });
  
});
