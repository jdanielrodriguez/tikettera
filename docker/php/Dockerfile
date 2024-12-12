FROM php:8.1-fpm

# Install dependencies and tools in fewer layers to optimize the image
RUN apt-get update && apt-get install -y --no-install-recommends \
    libz-dev libpq-dev libjpeg-dev libpng-dev libssl-dev curl libzip-dev unzip libfreetype6-dev git zip nodejs \
    && pecl install redis \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-configure zip \
    && docker-php-ext-install gd exif opcache pdo_mysql bcmath zip \
    && docker-php-ext-enable redis \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*;

# Install Composer and Node.js
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy PHP configuration
COPY ./docker/php/laravel.ini /usr/local/etc/php/conf.d/laravel.ini

WORKDIR /usr/src/app

RUN chown -R www-data:www-data .

CMD ["php-fpm"]
