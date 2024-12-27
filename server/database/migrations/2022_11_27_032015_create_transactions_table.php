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
        Schema::create('transactions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('hash')->unique();
            $table->string('previous_hash')->nullable();
            $table->string('name')->nullable();
            $table->double('amount', 15, 8);
            $table->double('fee', 15, 8)->default(0);
            $table->double('total', 15, 8);
            $table->string('token')->nullable();
            $table->string('description')->nullable();
            $table->integer('type')->default(1);
            $table->integer('state')->default(1);
            $table->timestamp('approved_at')->nullable();
            $table->json('metadata')->nullable();


            $table->unsignedInteger('promoter_id')->nullable();
            $table->foreign('promoter_id')->references('id')->on('promoters')->onDelete('cascade');
            $table->unsignedInteger('event_id')->nullable();
            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
            $table->unsignedInteger('seller_id')->nullable();
            $table->foreign('seller_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedInteger('buyer_id')->nullable();
            $table->foreign('buyer_id')->references('id')->on('users')->onDelete('cascade');

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
        Schema::dropIfExists('transactions');
    }
};
