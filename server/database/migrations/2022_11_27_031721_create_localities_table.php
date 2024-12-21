<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('localities', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('slug')->unique();
            $table->double('tasa_cambio')->nullable();
            $table->double('iva')->nullable();
            $table->double('tasa_iva')->nullable();
            $table->double('comision')->nullable();
            $table->double('price');
            $table->integer('sold')->default(0);
            $table->integer('withdrawall')->default(0);
            $table->integer('state')->default(1);
            $table->unsignedInteger('event_id');
            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('localities');
    }
};
