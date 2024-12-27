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
        Schema::create('password_recovery', function (Blueprint $table) {
            $table->increments('id');
            $table->string('recovery_token')->nullable();
            $table->string('current_password')->nullable();
            $table->string('password')->nullable();
            $table->string('password_rep')->nullable();
            $table->integer('state')->default(1);
            $table->unsignedInteger('current_auth_method_id')->nullable();
            $table->foreign('current_auth_method_id')->references('id')->on('auth_method')->onDelete('cascade');
            $table->unsignedInteger('auth_method_id')->nullable();
            $table->foreign('auth_method_id')->references('id')->on('auth_method')->onDelete('cascade');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('password_recovery');
    }
};
