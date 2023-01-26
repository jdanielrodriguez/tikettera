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
        Schema::create('auth_method_users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('token')->nullable()->default(null);
            $table->string('auth_token')->nullable()->default(null);
            $table->string('google_token')->nullable()->default(null);
            $table->string('fb_token')->nullable()->default(null);
            $table->string('tw_token')->nullable()->default(null);
            $table->string('tk_token')->nullable()->default(null);
            $table->dateTime('last_conection')->useCurrent();
            $table->integer('type')->nullable()->default(1);
            $table->integer('readonly')->nullable()->default(0);
            $table->integer('state')->nullable()->default(1);

            $table->integer('auth_method_id')->nullable()->default(null)->unsigned();
            $table->foreign('auth_method_id')->references('id')->on('auth_method')->onDelete('cascade');
            $table->integer('time_out')->unsigned()->nullable()->default(604800);

            $table->integer('user_id')->nullable()->default(null)->unsigned();
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
        Schema::dropIfExists('auth_method_users');
    }
};
