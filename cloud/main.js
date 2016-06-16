
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


Parse.Cloud.define("addPage", function(request, response) {
	var payload = request.params;
	var page_id = payload['pageID'];
	response.success({'Page add request sent for pageID: ' : page_id});
	var app_id = "639806029461655";
	var app_secret = "0e67503d42fbed9ea3b992252ca1c0e1";
	var access_token = app_id + "|" + app_secret;
	var base = "https://graph.facebook.com/v2.6/"
	var node = "/" + page_id
	var parameters = "/?fields=category,category_list,country_page_likes,cover,current_location,description,engagement,fan_count,founded,general_info,website&access_token=" + (access_token)
	var url = base + node + parameters

	var FBPage = Parse.Object.extend("Pages");
	var uploadData = {};
	
	console.log("Sending FB get request for pageID: " + page_id);
    Parse.Cloud.httpRequest({
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        success: function(httpResponse) {
        	uploadData = httpResponse.data;
        	
        	console.log("Page object created");
        	// Check if page exists
        	if (httpResponse.data['id']) {
				var query = new Parse.Query(FBPage);
				console.log("Query to check if page exists");
				query.equalTo("pageID", page_id);
				query.find({
				  success: function(results) {
				    if (results.length > 0) {
				    	// Page already exists
				    	console.log("Page exists! Return.");
				    	return;
				    }
			    	console.log("Page does not exist. Create.");
			    	var MyFBPage = Parse.Object.extend("Pages");
			    	var fbPage = new MyFBPage();
			    	for (key in uploadData) {
			    		if (key == 'id') {
			    			continue;
			    		}
			    		fbPage.set(key, uploadData[key]);
		        	}
		        	// fbPage.set('category', 'Fictional Character');
        			// fbPage.set('description', 'Page Admins ~#SR #SS #HG');
        			// fbPage.set('id', '305618449565617');
        			fbPage.set('pageID', page_id);
		        	fbPages = [];
		        	fbPages.push(fbPage);
				    fbPage.save(null, {
					    success: function(fbPage) {
					    	console.log("Page created");
					        response.success('Page added');
					    },
					    error: function(error) {
					    	console.log("addPage Error. error: " , error);
					        response.error('Page Add Failed: ' + error);
					    }
				    });
				    response.success('Page added:');
				  },
				  error: function(error) {
				  	response.error('Page Query Failed');
				    console.log("Error: " + error.code + " " + error.message);
				  }
				});	
        	}
            // console.log(httpResponse.text);
            /*console.log(httpResponse.data);
            console.log(httpResponse.body);
            console.log(httpResponse.response);*/
            response.success("Succsess");
          },
        error: function(httpResponse) {
            console.error('Request failed with response status ' + httpResponse.status);
            response.success("Error");
          }
    });

});