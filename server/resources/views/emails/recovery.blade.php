<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Notificación de Cambio de Contraseña</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
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

        .email-header {
            text-align: center;
            margin-bottom: 20px;
        }

        .email-header img {
            max-width: 120px;
        }

        .email-content h1 {
            color: #333333;
            font-size: 22px;
            margin-bottom: 10px;
            text-align: center;
        }

        .email-content p {
            color: #555555;
            font-size: 16px;
            line-height: 1.5;
            text-align: center;
        }

        .email-content .alert {
            margin: 20px 0;
            padding: 15px;
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            border-radius: 5px;
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
        <div class="email-header">
            <img src="http://ordenes.online/assets/images/logo.png" alt="Tikettera">
        </div>
        <div class="email-content">
            <h1>Hola, {!! $name !!}!</h1>
            <p>Tu contraseña ha sido cambiada exitosamente.</p>
            <div class="alert">
                <strong>Usuario:</strong> {!! $username !!}
            </div>
            <p>Si no reconoces esta acción, por favor, cambia tu contraseña de inmediato o contacta a nuestro soporte.</p>
            <a href="{!! $url !!}" class="button" target="_blank">Ir al Sitio</a>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 Tikettera. Todos los derechos reservados.</p>
        </div>
    </div>
</body>

</html>
