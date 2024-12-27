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
        Schema::create('policies_details', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->double('debe', 10, 2)->nullable();
            $table->double('haber', 10, 2)->nullable();
            $table->double('iva', 10, 2)->nullable();
            $table->double('total', 10, 2)->nullable();
            $table->integer('type')->default(1);
            $table->integer('state')->default(1);
            $table->unsignedInteger('policy_id');
            $table->foreign('policy_id')->references('id')->on('policies')->onDelete('cascade');
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
        Schema::dropIfExists('policies_details');
    }
};
