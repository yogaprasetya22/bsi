<?php

use App\Http\Controllers\User\AdminController;
use App\Http\Controllers\PengajuanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\ClientContoller;
use App\Http\Controllers\User\SuperAdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




Route::get('/fail404', function () {
    return Inertia::render('404', [
        'title' => '404',
    ]);
})->name('fail404');

Route::prefix('superadmin')->middleware(['auth', 'role:3', 'verified'])->group(function () {
    Route::get('/', [SuperAdminController::class, 'index'])->name('superadmin');

    // kelola user client
    Route::get('/user', [SuperAdminController::class, 'user'])->name('superadmin.user');
    Route::post('/user/create', [ClientContoller::class, 'store'])->name('superadmin.user.store');
    Route::put('/user/update', [ClientContoller::class, 'update'])->name('superadmin.user.update');
    Route::delete('/user', [ClientContoller::class, 'destroy'])->name('superadmin.user.destroy');

    // kelola user admin
    Route::get('/admin', [SuperAdminController::class, 'admin'])->name('superadmin.admin');
    Route::post('/admin/create', [AdminController::class, 'store'])->name('superadmin.admin.store');
    Route::put('/admin/update', [AdminController::class, 'update'])->name('superadmin.admin.update');
    Route::delete('/admin', [AdminController::class, 'destroy'])->name('superadmin.admin.destroy');
});


Route::prefix('/')->middleware(['auth', 'role:2', 'verified'])->group(function () {
    Route::get('/', [ClientContoller::class, 'index'])->name('client');
    Route::get('/pengajuan', [ClientContoller::class, 'pengajuan'])->name('client-pengajuan');
    Route::get('/history', [ClientContoller::class, 'histroy'])->name('client-history');
    Route::get('/feedback', [ClientContoller::class, 'feedback'])->name('client-feedback');

    Route::post('/pengajuan/create', [PengajuanController::class, 'store'])->name('client.pengajuan.store');
    Route::post('/pengajuan/update', [PengajuanController::class, 'update'])->name('client.pengajuan.update');
    Route::delete('/pengajuan/delete', [PengajuanController::class, 'destroy'])->name('client.pengajuan.destroy');
});

Route::prefix('admin')->middleware(['auth', 'role:1', 'verified'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin');
    Route::get('/regist', [AdminController::class, 'RegistPengajuan'])->name('admin.RegistPengajuan');
    Route::post('/pengajuan/status', [PengajuanController::class, 'pengajuan_status'])->name('admin.pengajuan_status');

    Route::get('/document', [AdminController::class, 'Document'])->name('admin.document');
    Route::post('/document', [AdminController::class, 'DocumentStore'])->name('admin.document.store');
    Route::post('/document/edit', [AdminController::class, 'DocumentEdit'])->name('admin.document.edit');
    Route::delete('/document', [AdminController::class, 'DocumentDelete'])->name('admin.document.destroy');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
