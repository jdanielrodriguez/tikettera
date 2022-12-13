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
        Schema::create('transactions_detail', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code')->nullable()->default(null);
            $table->string('token')->nullable()->default(null);
            $table->text('crypto_id')->nullable()->default(null);
            $table->text('hash')->nullable()->default(null);
            $table->text('salt')->nullable()->default(null);
            $table->timestamp('checkDate')->nullable()->default(null);
            $table->string('checkDateString')->nullable()->default(null);
            $table->string('check')->nullable()->default(null);
            $table->integer('type')->nullable()->default(1);
            $table->integer('operation')->nullable()->default(1);
            $table->integer('state')->nullable()->default(1);

            $table->integer('user_id')->nullable()->default(null)->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->integer('transaction_id')->nullable()->default(null)->unsigned();
            $table->foreign('transaction_id')->references('id')->on('transactions')->onDelete('cascade');

            $table->integer('discount_id')->nullable()->default(null)->unsigned();
            $table->foreign('discount_id')->references('id')->on('discounts')->onDelete('cascade');

            $table->integer('locality_id')->nullable()->default(null)->unsigned();
            $table->foreign('locality_id')->references('id')->on('localities')->onDelete('cascade');

            $table->integer('place_id')->nullable()->default(null)->unsigned();
            $table->foreign('place_id')->references('id')->on('places')->onDelete('cascade');

            $table->integer('cost_id')->nullable()->default(null)->unsigned();
            $table->foreign('cost_id')->references('id')->on('costs')->onDelete('cascade');

            $table->integer('comision_id')->nullable()->default(null)->unsigned();
            $table->foreign('comision_id')->references('id')->on('comisions')->onDelete('cascade');

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
        Schema::dropIfExists('transactions_detail');
    }
};
