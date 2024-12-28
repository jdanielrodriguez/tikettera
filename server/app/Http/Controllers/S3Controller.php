<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;

class S3Controller extends Controller
{
    /**
     * Subir una imagen a almacenamiento.
     */
    public function uploadImage(string $base64Image, string $directory = 'uploads')
    {
        try {
            $imageData = base64_decode($base64Image);
            $imageName = uniqid() . '.png';
            $path = "{$directory}/{$imageName}";
            Storage::disk('s3')->put($path, $imageData);

            // Generar URL manualmente para incluir bucket
            $bucket = config('filesystems.disks.s3.bucket');
            $endpoint = rtrim(config('filesystems.disks.s3.endpoint'), '/');
            $url = "{$endpoint}/{$bucket}/{$path}";

            return $url;
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Elimina una imagen del almacenamiento.
     */
    public function deleteImage(string $url): bool
    {
        try {
            $bucket = config('filesystems.disks.s3.bucket');
            $endpoint = rtrim(config('filesystems.disks.s3.endpoint'), '/');

            // Eliminar el endpoint y bucket de la URL para obtener el path
            $basePath = "{$endpoint}/{$bucket}/";
            $path = str_replace($basePath, '', $url);

            // Eliminar la imagen usando el path
            $s3 = Storage::disk('s3');
            if ($s3->exists($path)) {
                $s3->delete($path);
                return true;
            }
            return false;
        } catch (\Exception $e) {
            return false;
        }
    }
}
