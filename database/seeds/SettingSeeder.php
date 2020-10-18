<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    private $settings = [
        [ "id" => 1, "name" => 'theme', "value" => 'skin-blue-light'],
        [ "id" => 2, "name" => 'lang', "value" => 'Ar'],
    ];
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->settings as $item) {
            DB::table('settings')->insert([
                'id' => $item['id'],
                'name' => $item['name'],
                'value' => $item['value'], 
            ]);
        } 
    }
}
