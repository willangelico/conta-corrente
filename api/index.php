 <?php


require 'vendor/autoload.php';

require 'vendor/slim/slim/Slim/Slim.php';

\Slim\Slim::registerAutoloader();



$app = new Slim\Slim([

'settings' => [    
    'determineRouteBeforeAppMiddleware' => true,
    'displayErrorDetails' => true,
    'addContentLengthHeader' => false,
    ]
]);



define("SPECIALCONSTANT", true);
require 'connect.php';
require 'api.php';

 // $app->get('/', function ($request, $response, $args) {
 //     $response->write("Welcome to Slim!");
 //     return $response;
 // });


 //  $app->post('/', function ($request, $response, $args) {
 //     $response->write("Welcome to POST Slim!");
 //     return $response;
 // });


 //   $app->put('/', function ($request, $response, $args) {
 //     $response->write("Welcome to PUT Slim!");
 //     return $response;
 // });


 //    $app->delete('/', function ($request, $response, $args) {
 //     $response->write("Welcome to DELETE Slim!");
 //     return $response;
 // });


$app->run();

