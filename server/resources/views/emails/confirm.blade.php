<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Bienvenido a Tikettera</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #e1e1e1;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .email-header img {
            max-width: 150px;
            margin-bottom: 20px;
        }

        .email-content h1 {
            color: #333333;
            font-size: 22px;
            margin-bottom: 10px;
        }

        .email-content p {
            color: #555555;
            font-size: 16px;
            line-height: 1.5;
        }

        .email-footer {
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #777777;
        }

        .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
        }

        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header text-center">
            <img src="https://via.placeholder.com/500x250.png?text=LOGO" alt="Tikettera">
        </div>
        <div class="email-content">
            <h1>¡Hola, {!! $name !!}!</h1>
            <p>Te damos la bienvenida a Tikettera. Tus datos de acceso son los siguientes:</p>
            <p><strong>Usuario:</strong> {!! $username !!}</p>
            <a href="{!! $url !!}" target="_blank" class="button">Ingresa Ahora</a>
            <p>Gracias por registrarte con nosotros. ¡Esperamos verte pronto!</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 Tikettera. Todos los derechos reservados.</p>
        </div>
    </div>
</body>

</html>
