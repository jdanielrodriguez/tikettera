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
        Schema::create('checkout_doc', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
            $table->double('debe',5,2)->nullable()->default(null);
            $table->double('haber',5,2)->nullable()->default(null);
            $table->double('platform',5,5)->nullable()->default(null);
            $table->double('comision',5,5)->nullable()->default(null);
            $table->double('discount',5,2)->nullable()->default(null);
            $table->double('discount_percent',5,5)->nullable()->default(null);
            $table->double('iva',5,5)->nullable()->default(null);
            $table->double('total',5,2)->nullable()->default(null);
            $table->integer('type')->nullable()->default(1);
            $table->integer('state')->nullable()->default(1);

            $table->integer('creator_id')->nullable()->default(null)->unsigned();
            $table->foreign('creator_id')->references('id')->on('users')->onDelete('cascade');

            $table->integer('checkout_id')->nullable()->default(null)->unsigned();
            $table->foreign('checkout_id')->references('id')->on('checkout')->onDelete('cascade');

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
        Schema::dropIfExists('checkout_doc');
    }
};
