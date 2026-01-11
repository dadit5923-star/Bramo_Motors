<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "[Email Perusahaan]";
    $subject = "Pesan dari $name";
    $body = "Nama: $name\nEmail: $email\nPesan:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "<p>Pesan Anda telah berhasil dikirim. Terima kasih telah menghubungi kami!</p>";
    } else {
        echo "<p>Maaf, terjadi kesalahan. Silakan coba lagi nanti.</p>";
    }
}
?>
