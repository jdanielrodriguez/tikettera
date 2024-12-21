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
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('picture')->nullable();
            $table->string('slug')->unique();
            $table->string('description')->nullable();
            $table->string('address')->nullable();
            $table->time('time_start')->nullable();
            $table->time('time_end')->nullable();
            $table->date('date_start')->nullable();
            $table->date('date_end')->nullable();
            $table->timestamp('start')->nullable();
            $table->timestamp('end')->nullable();
            $table->double('lat', 15, 8)->nullable();
            $table->double('lng', 15, 8)->nullable();
            $table->unsignedInteger('reason_id')->nullable();
            $table->foreign('reason_id')->references('id')->on('events_reason')->onDelete('cascade');
            $table->unsignedInteger('type_id')->nullable();
            $table->foreign('type_id')->references('id')->on('events_type')->onDelete('cascade');
            $table->integer('state')->default(1);
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
        Schema::dropIfExists('events');
    }
};
