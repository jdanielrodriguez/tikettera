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
        Schema::create('promoters_chat', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable()->default(null);
            $table->string('mensaje')->nullable()->default(null);
            $table->timestamp('date')->useCurrent();
            $table->string('subject')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
            $table->integer('type')->nullable()->default(1);
            $table->integer('state')->nullable()->default(1);

            $table->integer('send')->nullable()->default(null)->unsigned();
            $table->foreign('send')->references('id')->on('users')->onDelete('cascade');

            $table->integer('receiver')->nullable()->default(null)->unsigned();
            $table->foreign('receiver')->references('id')->on('users')->onDelete('cascade');

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
        Schema::dropIfExists('promoters_chat');
    }
};
