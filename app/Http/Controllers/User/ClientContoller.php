<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\FeedbackPengajuan;
use App\Models\Pengajuan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientContoller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::with(['role'])->latest()->get();
        return Inertia::render('client/Index', [
            'title' => 'User',
            'data' => $user,
        ]);
    }
    public function pengajuan()
    {
        $user = User::with(['role'])->latest()->get();
        return Inertia::render('client/Pengajuan', [
            'title' => 'Pengajuan',
            'data' => $user,
        ]);
    }

    public function histroy()
    {
        $id_user = Auth::user()->id;
        $data_history = Pengajuan::with(['user'])->where('user_id', $id_user)->latest()->get();
        return Inertia::render('client/History', [
            'title' => 'Histroy',
            'data' => $data_history,
        ]);
    }

    public function feedback()
    {
        $feedback = FeedbackPengajuan::with(['pengajuan.user', 'pengajuan.status'])->latest()->get();
        return Inertia::render('client/Feedback', [
            'title' => 'Feedback',
            'data' => $feedback,
        ]);
    }

    // public function search(Request $request)
    // {
    //     $search = $request->search;
    //     $user = User::with(['role'])->where('name', 'like', '%' . $search . '%')->latest()->get();
    //     return Inertia::render('admin/Admin', [
    //         'title' => 'Admin',
    //         'data' => $user,
    //     ]);
    // }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
