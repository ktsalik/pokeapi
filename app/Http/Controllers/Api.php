<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

class Api extends Controller
{
  use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

  public function get_pokemon_data($id) {
    $data = [];

    $is_favourite = DB::select('SELECT count(*) AS count FROM favourite WHERE pokemon = ?', [
      $id,
    ])[0]->count === 1;


    $data['is_favourite'] = $is_favourite;

    return $data;
  }

  public function set_favourite($id) {
    $is_favourite = DB::select('SELECT count(*) AS count FROM favourite WHERE pokemon = ?', [
      $id,
    ])[0]->count === 1;

    if ($is_favourite) {
      $deleted = DB::table('favourite')->where('pokemon', '=', $id)->delete();

      return [
        'is_favourite' => false,
      ];
    } else {
      $inserted = DB::table('favourite')->insert([
        'pokemon' => $id,
      ]);

      return [
        'is_favourite' => true,
      ];
    }
  }
}
