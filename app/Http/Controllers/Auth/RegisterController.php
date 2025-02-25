<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // Input Validation
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate profile picture
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
    
        // Sanitize Inputs to Prevent XSS
        $sanitized_name = strip_tags($request->name);  // Remove HTML tags
        $sanitized_email = filter_var($request->email, FILTER_SANITIZE_EMAIL);  // Sanitize email
    
        // Handle Profile Picture Upload
        $profile_picture_path = null;
        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $profile_picture_path = $file->store('profile_pictures', 'public');  // Store the file in storage/app/public/profile_pictures
        }
    
        // Create User
        $user = User::create([
            'name' => $sanitized_name,
            'email' => $sanitized_email,
            'password' => Hash::make($request->password),
            'profile_picture' => $profile_picture_path,  // Save the profile picture path in the database
        ]);
    
        // Generate token
        $token = $user->createToken('YourAppName')->plainTextToken;
    
        // Store token in users table
        $user->update(['token' => $token]);
    
        // Return response with token stored in the database and user details
        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }
    

    public function login(Request $request)
    {
        // Input Validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // Attempt to login
        $user = User::where('email', $request->email)->first();

        // Check if user exists and password matches
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Generate token
        $token = $user->createToken('YourAppName')->plainTextToken;

        // Return response with token
        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }


    
 public function updateProfilePicture(Request $request)
    {
        $user = Auth::user(); // Retrieve authenticated user

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // Validate the uploaded image
        $validatedData = $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $file = $request->file('profile_picture');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('profile_pictures', $fileName, 'public');

        if ($user->profile_picture) {
            // Update: Delete the existing profile picture from storage
            Storage::disk('public')->delete($user->profile_picture);

            // Update the database record
            $user->update([
                'profile_picture' => $filePath,
            ]);

            return response()->json([
                'message' => 'Profile picture updated successfully',
                'file_path' => $filePath,
            ], 200);
        } else {
            // Create: Save the new profile picture in the database
            $user->update([
                'profile_picture' => $filePath,
            ]);

            return response()->json([
                'message' => 'Profile picture created successfully',
                'file_path' => $filePath,
            ], 201);
        }
    }

    public function createOrUpdateUser(Request $request)
    {
        // Validate incoming data
        $validated = $request->validate([
            'email' => 'required|email',
            'name' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        // Check if the user exists or not, and create/update accordingly
        $user = User::where('email', $validated['email'])->first();

        if ($user) {
            // Update the user
            $user->update([
                'name' => $validated['name'],
                'password' => bcrypt($validated['password']),
            ]);
        } else {
            // Create a new user
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => bcrypt($validated['password']),
            ]);
        }

        return response()->json($user);
    }



}
