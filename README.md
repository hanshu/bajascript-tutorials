# Tutorials
This tutorials provide the BajaScript&Require&Backbone walkthrough.

## 1. **intro**
- how to start your application with Require
- how to develop your application using BajaScript based on Require
    1. how to retrieve folders/control points
    2. how to subscribe the changes of control point
    3. how to invoke the action of control point (current just for NumericWritable)
- how to use Handlebars template engine via Require plugin

### How to run this example:
1. copy the above tutorials folder to your [_Daemon User Home_]\stations\[_YOUR STATION_]\shared\;
2. current the example will display the folders under station:|slot:/poc, so you need to create these folders in your workbench;
3. visit https://localhost/file/tutorials/intro/index.html

## 2. **backbone**
- how to develop your application using BajaScript based on Backbone 

| Model    |      View     |
|----------|:-------------:|
| Orchestrates data and business logic |  Listens for changes and renders UI | 
| Loads and saves from the server |  Handles user input and interactivity  |   
| Emits events when data changes | Sends captured input to the model |

A **Collection** helps you deal with a group of related models, handling the loading and saving of new models to the server and providing helper functions for performing aggregations or computations against a list of models. Aside from their own events, collections also proxy through all of the events that occur to models within them, allowing you to listen in one place for any change that might happen to any model in the collection.

## 3. **advanced**
- how to manage the subviews                
_views/home.js_ -> Home page view including some subviews       
_views/page1.js_ -> Page one view
- how to route page views       
_routers/router.js_ -> AppRouter for application
- how to integrate baja.Subscriber events with Backbone (_changed, renamed, added, removed_)  
_collections/points.js_ -> baja Subscriber
- how to use application-level event manager for event-based communication      
_app.js_ -> Define the application-level event manager  
- how to avoid memory leaks about pub/sub mechanism     
_views/app.js_ -> Release the resources of views  
_views/home.js_ -> Release the resources of subviews, baja unsubscribe and detach
