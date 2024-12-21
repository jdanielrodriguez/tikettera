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
        Schema::create('places', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('slug')->unique();
            $table->string('seat_number')->nullable();
            $table->double('price', 5, 2)->nullable();
            $table->double('x', 5, 5)->nullable();
            $table->double('y', 5, 5)->nullable();
            $table->integer('sold')->default(0);
            $table->integer('avaliable')->default(1);
            $table->integer('state')->default(1);
            $table->unsignedInteger('locality_id');
            $table->foreign('locality_id')->references('id')->on('localities')->onDelete('cascade');
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
        Schema::dropIfExists('places');
    }
};
