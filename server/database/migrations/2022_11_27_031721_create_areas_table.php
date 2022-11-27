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
        Schema::create('areas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
            $table->double('tasa_cambio')->nullable()->default(null);
            $table->double('iva')->nullable()->default(null);
            $table->double('tasa_iva')->nullable()->default(null);
            $table->double('comision')->nullable()->default(null);
            $table->double('price')->nullable()->default(null);
            $table->double('total')->nullable()->default(null);
            $table->double('sold')->nullable()->default(null);
            $table->integer('type')->nullable()->default(1);
            $table->integer('state')->nullable()->default(1);

            $table->integer('event_type_id')->nullable()->default(null)->unsigned();
            $table->foreign('event_type_id')->references('id')->on('events_type')->onDelete('cascade');

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
        Schema::dropIfExists('areas');
    }
};
