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
        $pengajuan = Pengajuan::with(['user', 'status', 'feedback'])->where('user_id', Auth::user()->id)->latest()->get();
        return Inertia::render('client/Index', [
            'title' => 'User',
            'data' => $pengajuan,
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
        $feedback = FeedbackPengajuan::with(['pengajuan.user', 'pengajuan.status'])->whereHas('pengajuan', function ($query) {
            $query->where('user_id', Auth::user()->id);
        })->latest()->get();
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
        // buatkan create user validation
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ], [
            'name.required' => 'Nama harus diisi',
            'email.required' => 'Email harus diisi',
            'password.required' => 'Password harus diisi',
        ]);

        User::create([
            'uuid' => str()->uuid(),
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => '2',
            'created_at' => now(),
        ]);

        return redirect()->back()->with('success', 'User berhasil ditambahkan');
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
    public function update(Request $request)
    {
        // buatkan update user validation
        $request->validate([
            'uuid' => 'required',
            'name' => 'required',
            'email' => 'required',
        ], [
            'uuid.required' => 'UUID tidak boleh kosong',
            'name.required' => 'Nama harus diisi',
            'email.required' => 'Email harus diisi',
        ]);

        User::where('uuid', $request->uuid)->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return redirect()->back()->with('success', 'User berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'uuid' => 'required',
        ]);

        User::where('uuid', $request->uuid)->delete();

        return redirect()->back()->with('success', 'User berhasil dihapus');
    }
}
