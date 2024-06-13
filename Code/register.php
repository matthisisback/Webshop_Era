<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_registration";

// Connexion à la base de données
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function generateTemporaryPassword($length = 8) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomPassword = '';
    for ($i = 0; $i < $length; $i++) {
        $randomPassword .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomPassword;
}

function sendEmail($to_email, $temporary_password) {
    $subject = "Votre mot de passe temporaire";
    $body = "Bonjour,\n\nVoici votre mot de passe temporaire : $temporary_password\n\nMerci.";
    $headers = "From: votre_email@gmail.com";

    if (mail($to_email, $subject, $body, $headers)) {
        echo "E-mail envoyé avec succès";
    } else {
        echo "Échec de l'envoi de l'e-mail";
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $name = $_POST['name'];

    // Validation simple de l'e-mail
    if (strlen($email) < 5 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["message" => "Invalid email address"]);
        http_response_code(400);
        exit;
    }

    // Générer un mot de passe temporaire
    $temporary_password = generateTemporaryPassword();

    // Insérer les informations de l'utilisateur dans la base de données
    $stmt = $conn->prepare("INSERT INTO users (email, name, temporary_password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $name, $temporary_password);

    if ($stmt->execute()) {
        // Envoyer l'e-mail avec le mot de passe temporaire
        sendEmail($email, $temporary_password);
        echo json_encode(["message" => "Registration successful"]);
        http_response_code(200);
    } else {
        echo json_encode(["message" => "Registration failed"]);
        http_response_code(500);
    }

    $stmt->close();
}

$conn->close();
?>
