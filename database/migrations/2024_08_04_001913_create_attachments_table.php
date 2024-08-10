<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attachments', function (Blueprint $table) {
            $table->id();
            $table->uuid('attachmentKey');
            $table->bigInteger('user_id')->constrained('users')->cascadeOnDelete();
            $table->bigInteger('article_id')->constrained('articles')->cascadeOnDelete();
            $table->text('image_name')->nullable();
            $table->text('image_path')->nullable();
            $table->text('image_location')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attachments');
    }
};
