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
        Schema::create('checkout', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
            $table->string('date_start')->nullable()->default(null);
            $table->string('date_end')->nullable()->default(null);
            $table->double('total',5,2)->nullable()->default(null);
            $table->integer('closed')->nullable()->default(null);
            $table->integer('type')->nullable()->default(1);
            $table->integer('state')->nullable()->default(1);

            $table->integer('user_id')->nullable()->default(null)->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->integer('creator')->nullable()->default(null)->unsigned();
            $table->foreign('creator')->references('id')->on('users')->onDelete('cascade');

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
        Schema::dropIfExists('checkout');
    }
};
