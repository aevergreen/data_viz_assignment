// this collection contains all the activitys
Activities = new Mongo.Collection("activities");
// this variable will store the visualisation so we can delete it when we need to 
var visjsobj;
if (Meteor.isClient){
////////////////////////////
///// event handlers for the viz control form - these get the data of the session
////////////////////////////

  Template.activity_viz_controls.events({
    // event handler for when the user clicks on the 
    // blobs button
     "click .js-show-scatter":function(event){
      event.preventDefault();
      initScatterVis();

    }, 
    // event handler for when the user clicks on the 
    // timeline button
     "click .js-show-bar":function(event){
      event.preventDefault();
      initBarVis();
    }, 
        // event handler for when the user clicks on the 
    // timeline button
     "click .js-show-network":function(event){
      event.preventDefault();
      initNetworkVis();
    }, 
  }); 
}



////////////////////////////
///// functions that set up and display the visualisation
////////////////////////////


// function that creates a new timeline visualisation
function initScatterVis(){
  ////STEP 1 - CLEAR THE GRAPH
  // clear out the old visualisation if needed


  var container = document.getElementById('myscatter');
  var items = [
    {x: '2016-10-07, 00:00', y: 0},
    {x: '2016-10-07, 12:00', y: 12, label: 'Sleeping'},
    {x: '2016-10-07, 14:00', y: 2},
    {x: '2016-10-07, 22:00', y: 8},
    {x: '2016-10-07, 24:00', y: 2}
  ];

  var dataset = new vis.DataSet(items);
  var options = {
    start: '2016-10-07',
    end: '2016-10-08',
    height: '200px'
  };
  var graph2d = new vis.Graph2d(container, dataset, options);


}

// function that creates a new timeline visualisation
function initBarVis(){
  ////STEP 1 - CLEAR THE GRAPH

// DOM element where the Timeline will be attached
var container = document.getElementById('mytimeline');
 
// Create a DataSet with data (enables two way data binding)
var data = new vis.DataSet([
  {id: 1, content: 'Sleeping', start: '2016-10-07, 00:00', end: '2016-10-07, 12:00' },
  {id: 2, content: 'Eating', start: '2016-10-07, 12:00', end: '2016-10-07, 14:00' },
  {id: 3, content: 'Playing', start: '2016-10-07, 14:00', end: '2016-10-07, 22:00' },
  {id: 4, content: 'Haning Out', start: '2016-10-07, 22:00', end: '2016-10-07, 23:59'}
]);
 
// Configuration for the Timeline
var options = {

		width:  '100%',
    	height: '200px',

};
 
// Create a Timeline
var timeline = new vis.Timeline(container, data, options);

}

// function that creates a new blobby visualisation
function initNetworkVis(){
  // clear out the old visualisation if needed


	// Nodes Definition
	var nodes = new vis.DataSet([
		{id: 1, label: 'Sleeping'},
		{id: 2, label: 'Eating'},
		{id: 3, label: 'Playing'},
		{id: 4, label: 'Hangin Out'}
	]);
	 // create an array with edges to represent the network
	var edges = new vis.DataSet([
	   {from: 1, to: 2},
	   {from: 2, to: 3},
	   {from: 3, to: 4},
	   {from: 4, to: 1}
	]);
	// Find contained in document
	  var container = document.getElementById('mynetwork');
	//Define data object and the options of the network  
	var data = {
		nodes: nodes,
		edges: edges
	  };
	var options = {
		 width:  '100%',
    	height: '200px',
    	style: 'surface'
	};
	//Define the network object to be rendered.
	var network = new vis.Network(container, data, options);
	//Simply declare an event with callback.
	network.on("click", function (params) {
		console.log(params);
	});

	visjsobj=true;

}


