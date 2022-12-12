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
            $table->string('name')->nullable()->default(null);
            $table->string('place')->nullable()->default(null);
            $table->string('code')->nullable()->default(null);
            $table->double('price')->nullable()->default(null);
            $table->double('qty')->nullable()->default(null);
            $table->double('total')->nullable()->default(null);
            $table->string('token')->nullable()->default(null);
            $table->string('ern')->nullable()->default(null);
            $table->text('crypto_id')->nullable()->default(null);
            $table->text('hash')->nullable()->default(null);
            $table->text('salt')->nullable()->default(null);
            $table->timestamp('aprovDate')->nullable()->default(null);
            $table->string('aprovDateString')->nullable()->default(null);
            $table->string('aprov')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
            $table->double('lat',15,8)->nullable()->default(null);
            $table->double('lng',15,8)->nullable()->default(null);
            $table->integer('type')->nullable()->default(1);
            $table->integer('state')->nullable()->default(1);

            $table->integer('seller_id')->nullable()->default(null)->unsigned();
            $table->foreign('seller_id')->references('id')->on('users')->onDelete('cascade');

            $table->integer('buyer_id')->nullable()->default(null)->unsigned();
            $table->foreign('buyer_id')->references('id')->on('users')->onDelete('cascade');

            $table->integer('event_id')->nullable()->default(null)->unsigned();
            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');

            $table->integer('locality_id')->nullable()->default(null)->unsigned();
            $table->foreign('locality_id')->references('id')->on('localities')->onDelete('cascade');

            $table->integer('place_id')->nullable()->default(null)->unsigned();
            $table->foreign('place_id')->references('id')->on('places')->onDelete('cascade');

            $table->integer('promoter_id')->nullable()->default(null)->unsigned();
            $table->foreign('promoter_id')->references('id')->on('promoters')->onDelete('cascade');

            $table->integer('discount_id')->nullable()->default(null)->unsigned();
            $table->foreign('discount_id')->references('id')->on('discounts')->onDelete('cascade');

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
