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
        Schema::create('feedback_pengajuans', function (Blueprint $table) {
            $table->id();
            $table->uuid('pengajuan_uuid')->constrained('pengajuans');
            $table->foreign('pengajuan_uuid')->references('uuid')->on('pengajuans')->onDelete('cascade');
            $table->string('feedback')->nullable();
            $table->string('pic');
            $table->string('file')->nullable();
            $table->date('tanggal_feedback');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedback_pengajuans');
    }
};
