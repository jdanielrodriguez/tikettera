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
            $table->string('name')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
            $table->string('slug')->nullable()->default(null);
            $table->string('no')->nullable()->default(null);
            $table->double('number')->nullable()->default(null);
            $table->double('price',5,2)->nullable()->default(null);
            $table->double('x',5,5)->nullable()->default(null);
            $table->double('y',5,5)->nullable()->default(null);
            $table->string('chaild')->nullable()->default(null);
            $table->integer('sold')->nullable()->default(0);
            $table->integer('avaliable')->nullable()->default(1);
            $table->integer('type')->nullable()->default(1);
            $table->integer('state')->nullable()->default(1);

            $table->integer('locality_id')->nullable()->default(null)->unsigned();
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
