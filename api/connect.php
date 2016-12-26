<?php if(!defined("SPECIALCONSTANT")) die("Acesso Negado");

function getConnection(){	
	try{
		$db_username = "id410024_willangelico";
		$db_password = "12345";
		$connection = new PDO("mysql:host=localhost;dbname=id410024_s2it", $db_username, $db_password);
		$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	}catch(PDOException $e){
		echo "Error: " . $e->getMessage();
	}
	return $connection;
}