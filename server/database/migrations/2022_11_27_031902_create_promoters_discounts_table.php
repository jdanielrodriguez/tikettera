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
        Schema::create('promoters_discounts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('slug')->nullable()->default(null);
            $table->string('description')->nullable();
            $table->integer('state')->nullable()->default(1);
            $table->unsignedInteger('locality_discount_id')->nullable();
            $table->foreign('locality_discount_id')->references('id')->on('localities_discounts')->onDelete('cascade');
            $table->unsignedInteger('promoter_id');
            $table->foreign('promoter_id')->references('id')->on('promoters')->onDelete('cascade');
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
        Schema::dropIfExists('promoters_discounts');
    }
};
