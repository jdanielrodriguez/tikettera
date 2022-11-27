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
        Schema::create('localities', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable()->default(null);
            $table->string('picture')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
            $table->string('address')->nullable()->default(null);
            $table->time('time_start')->nullable()->default(null);
            $table->time('time_end')->nullable()->default(null);
            $table->date('date_start')->nullable()->default(null);
            $table->date('date_end')->nullable()->default(null);
            $table->timestamp('start')->nullable()->default(null);
            $table->timestamp('end')->nullable()->default(null);

            $table->double('lat',15,8)->nullable()->default(null);
            $table->double('lng',15,8)->nullable()->default(null);
            $table->integer('type')->nullable()->default(1);
            $table->integer('state')->nullable()->default(1);

            $table->integer('event_id')->nullable()->default(null)->unsigned();
            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');

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
        Schema::dropIfExists('localities');
    }
};
