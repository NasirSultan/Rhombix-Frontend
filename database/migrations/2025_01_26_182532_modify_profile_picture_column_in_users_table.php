<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        DB::statement('ALTER TABLE users MODIFY profile_picture VARCHAR(255) NULL;');
    }
    
    public function down()
    {
        // In case you need to reverse this migration, you can set the column to NOT NULL.
        DB::statement('ALTER TABLE users MODIFY profile_picture VARCHAR(255) NOT NULL;');
    }
    
};
