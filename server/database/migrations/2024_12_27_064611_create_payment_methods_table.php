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
        Schema::defaultStringLength(500);
        Schema::create('payment_methods', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('payment_type_id');
            $table->text('card_name')->nullable();
            $table->text('card_number')->nullable();
            $table->text('expiration_date')->nullable();
            $table->text('cvv')->nullable();
            $table->string('bank_name')->nullable();
            $table->text('account_number')->nullable();
            $table->text('account_holder')->nullable();
            $table->text('swift')->nullable();
            $table->decimal('balance', 15, 2)->nullable()->default(0.00);
            $table->boolean('is_default')->default(false);
            $table->string('encrypted_data')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('payment_type_id')->references('id')->on('payment_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_methods');
    }
};
