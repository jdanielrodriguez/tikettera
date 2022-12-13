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
        Schema::create('advertisers_discounts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
            $table->integer('type')->nullable()->default(1);
            $table->integer('state')->nullable()->default(1);

            $table->integer('advertiser_id')->nullable()->default(null)->unsigned();
            $table->foreign('advertiser_id')->references('id')->on('advertisers')->onDelete('cascade');

            $table->integer('locality_discount_id')->nullable()->default(null)->unsigned();
            $table->foreign('locality_discount_id')->references('id')->on('localities_discounts')->onDelete('cascade');

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
        Schema::dropIfExists('advertisers_discounts');
    }
};
