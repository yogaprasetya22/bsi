<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Pengajuan;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $user = User::with(['role'])->latest()->get();
        return Inertia::render('admin/Admin', [
            'title' => 'Admin',
            'data' => $user,
        ]);
    }

    public function RegistPengajuan()
    {
        $pengajuan = Pengajuan::with(['user', 'status', 'feedback'])->latest()->get();
        $status = Status::all();
        return Inertia::render('admin/RegistPengajuan', [
            'title' => 'RegistPengajuan',
            'data' => $pengajuan,
            'status' => $status
        ]);
    }

    public function Document()
    {
        $pengajuan = Pengajuan::with(['user'])->latest()->get();
        return Inertia::render('admin/Document', [
            'title' => 'Document',
            'data' => $pengajuan,
        ]);
    }
}
