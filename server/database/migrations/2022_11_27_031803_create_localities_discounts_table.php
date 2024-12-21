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
        Schema::create('localities_discounts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('slug')->nullable();
            $table->double('amount');
            $table->double('percent')->nullable();
            $table->integer('state')->default(1);
            $table->unsignedInteger('discount_id');
            $table->foreign('discount_id')->references('id')->on('discounts')->onDelete('cascade');
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
        Schema::dropIfExists('localities_discounts');
    }
};
