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
        Schema::create('cash', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
            $table->string('date_start')->nullable()->default(null);
            $table->string('date_end')->nullable()->default(null);
            $table->double('total',5,2)->nullable()->default(null);
            $table->integer('closed')->nullable()->default(null);
            $table->integer('type')->nullable()->default(1);
            $table->integer('state')->nullable()->default(1);

            $table->integer('owner_id')->nullable()->default(null)->unsigned();
            $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade');

            $table->integer('creator')->nullable()->default(null)->unsigned();
            $table->foreign('creator')->references('id')->on('users')->onDelete('cascade');

            $table->integer('event_id')->nullable()->default(null)->unsigned();
            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');

            $table->integer('reason_id')->nullable()->default(null)->unsigned();
            $table->foreign('reason_id')->references('id')->on('events_reason')->onDelete('cascade');

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
        Schema::dropIfExists('cash');
    }
};
