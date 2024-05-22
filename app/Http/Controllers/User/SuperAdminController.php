<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Pengajuan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuperAdminController extends Controller
{
    public function index()
    {
        $pengajuan = Pengajuan::with(['user', 'status', 'feedback'])->latest()->get();
        $pengajuan_bulan_ini = Pengajuan::with(['user', 'status', 'feedback'])->whereMonth('created_at', date('m'))->latest()->get();
        return Inertia::render('superadmin/Index', [
            'title' => 'Superadmin',
            'data' => $pengajuan,
            'pengajuan_bulan_ini' => $pengajuan_bulan_ini
        ]);
    }

    public function Pengelolaan()
    {
        $pengelolaan = User::with(['role'])->latest()->get();
        return Inertia::render('admin/Pengelolaan', [
            'title' => 'Pengelolaan',
            'data' => $pengelolaan,
        ]);
    }

    public function user()
    {
        $user = User::with(['role'])->where('role_id', 2)->latest()->get();
        return Inertia::render('superadmin/User', [
            'title' => 'User',
            'data' => $user,
        ]);
    }

    public function admin()
    {
        $user = User::with(['role'])->where('role_id', 1)->latest()->get();
        return Inertia::render('superadmin/Admin', [
            'title' => 'Admin',
            'data' => $user,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
}
