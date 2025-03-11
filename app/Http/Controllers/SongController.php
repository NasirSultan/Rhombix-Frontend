<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Song;
use Illuminate\Support\Facades\Storage;

class SongController extends Controller
{
    // Upload a new song
  // SongController.php



public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'category_id' => 'required|string', // Category is passed as string now
        'file' => 'required|file|mimes:mp3,wav', // Example file validation
    ]);

    // Check if the category exists, create it if not
    $category = Category::firstOrCreate([
        'name' => $request->category_id, // Store category name instead of ID
    ]);

    // Create the song entry with the associated category
    $song = new Song();
    $song->title = $request->title;
    $song->category_id = $category->id; // Save the ID of the created or existing category
    $song->user_id = auth()->id(); // Assuming you are using auth to link users
    $song->file_path = $request->file('file')->store('songs', 'public'); // Store file
    $song->save();

    return response()->json(['message' => 'Song uploaded successfully']);
}

    
    // Get all songs of the authenticated user
    public function index()
    {
        $songs = Song::where('user_id', auth()->id())->get();
        return response()->json($songs);
    }

    // Retrieve a single song (only if it belongs to the user)
    public function show($id)
    {
        $song = Song::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
        return response()->json($song);
    }

    // Delete a song (only if it belongs to the user)
    public function destroy($id)
    {
        $song = Song::where('id', $id)->where('user_id', auth()->id())->firstOrFail();

        // Delete the song file from storage
        Storage::disk('public')->delete($song->file_path);

        $song->delete();

        return response()->json(['message' => 'Song deleted successfully']);
    }


    public function getSongsByCategory($categoryId)
    {
        // $songs = Song::where('category_id', $categoryId)->get();
        $songs = Song::where('category_id', $categoryId)
        ->where('user_id', auth()->id())
        ->get();

        if ($songs->isEmpty()) {
            return response()->json(['message' => 'No songs found for this category'], 404);
        }

        return response()->json($songs);
    }
}
