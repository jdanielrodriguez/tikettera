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
        Schema::create('cash_details', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
            $table->double('price',5,2)->nullable()->default(null);
            $table->double('haber',5,2)->nullable()->default(null);
            $table->double('platform',5,5)->nullable()->default(null);
            $table->double('comision',5,5)->nullable()->default(null);
            $table->double('discount',5,2)->nullable()->default(null);
            $table->double('out',5,2)->nullable()->default(null);
            $table->double('discount_percent',5,5)->nullable()->default(null);
            $table->double('iva',5,5)->nullable()->default(null);
            $table->double('total',5,2)->nullable()->default(null);
            $table->integer('type')->nullable()->default(1);
            $table->integer('state')->nullable()->default(1);
            $table->integer('withdrawal')->nullable()->default(1);

            $table->integer('cupon_discount_id')->nullable()->default(null)->unsigned();
            $table->foreign('cupon_discount_id')->references('id')->on('users')->onDelete('cascade');

            $table->integer('buyer_id')->nullable()->default(null)->unsigned();
            $table->foreign('buyer_id')->references('id')->on('users')->onDelete('cascade');

            $table->integer('cash_id')->nullable()->default(null)->unsigned();
            $table->foreign('cash_id')->references('id')->on('cash')->onDelete('cascade');

            $table->integer('place')->nullable()->default(null)->unsigned();
            $table->foreign('place')->references('id')->on('places')->onDelete('cascade');

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
        Schema::dropIfExists('cash_details');
    }
};
