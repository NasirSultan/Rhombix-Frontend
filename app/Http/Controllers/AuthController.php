<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function user(Request $req)
    {
        $validated = $req->validate([
            'name' => 'nullable|string|max:50',
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:6|max:20'
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            $user = User::create([
                'name' => $validated['name'] ?? 'Guest',
                'email' => $validated['email'],
                'password' => Hash::make($validated['password'])
            ]);
        } 

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => $user->wasRecentlyCreated ? 'Register successful' : 'Login successful',
            'token' => $token
        ], 200);
    }
}
