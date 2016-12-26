<?php if(!defined("SPECIALCONSTANT")) die("Acesso Negado");



$app->get("/count/", function() use($app){

	try{
		$connection = getConnection();
		$dbh = $connection->prepare("SELECT * FROM count");
		$dbh->execute();
		$count = $dbh->fetchAll();
		$connection = null;


		$app->response->headers->set("Content-Type", "application/json");
		$app->response->status(200);
		$app->response->body(json_encode($count));

	}catch(PDOException $e){
		echo "Error: " . $e->getMessage();
	}
});




$app->get("/count/:id", function($id) use($app){

	try{
		$connection = getConnection();
		$dbh = $connection->prepare("SELECT * FROM count WHERE id = ?");
		$dbh->bindParam(1, $id);
		$dbh->execute();
		$count = $dbh->fetchObject();
		$connection = null;

		$app->response->headers->set("Content-type", "application/json");
		$app->response->status(200);
		$app->response->body(json_encode($count));

	}catch(PDOException $e){
		echo "Error: " . $e->getMessage();
	}
});



$app->post("/count/", function() use($app){
	$type = $app->request->post("type");
	$value = $app->request->post("value");

	try{
		$connection = getConnection();
		$dbh = $connection->prepare("INSERT INTO count VALUES(null, ?, ?, NOW())");
		$dbh->bindParam(1, $type);
		$dbh->bindParam(2, $value);
		$dbh->execute();
		$countId = $connection->lastInsertId();
		$connection = null;

		$app->response->headers->set("Content-type", "application/json");
		$app->response->status(200);
		$app->response->body(json_encode($countId));


	}catch(PDOException $e){
		echo "Error: " . $e->getMessage();
	}
});



$app->put("/count/", function() use($app){
	$type = $app->request->put("type");
	$value = $app->request->put("value");
	$id = $app->request->put("id");

	try{
		$connection = getConnection();
		$dbh = $connection->prepare("UPDATE count SET type = ?, value = ?, date = NOW() WHERE id = ?");
		$dbh->bindParam(1, $type);
		$dbh->bindParam(2, $value);
		$dbh->bindParam(3, $id);
		$dbh->execute();
		
		$connection = null;

		$app->response->headers->set("Content-type", "application/json");
		$app->response->status(200);
		$app->response->body(json_encode( array("res" => 1)));


	}catch(PDOException $e){
		echo "Error: " . $e->getMessage();
	}

});

$app->delete("/count/", function() use($app){
	$id = $app->request->post("id");
	try{
		$connection = getConnection();
		$dbh = $connection->prepare("DELETE FROM count WHERE id = ?");
		$dbh->bindParam(1, $id);
		$dbh->execute();
		
		$connection = null;

		$app->response->headers->set("Content-type", "application/json");
		$app->response->status(200);
		$app->response->body(json_encode( array("res" => 1)));


	}catch(PDOException $e){
		echo "Error: " . $e->getMessage();
	}

});