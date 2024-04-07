<?php

use App\Http\Controllers\User\AdminController;
use App\Http\Controllers\User\BkalController;
use App\Http\Controllers\User\WarekController;
use App\Http\Controllers\User\KaprodiController;
use App\Http\Controllers\User\DosenPaController;
use App\Http\Controllers\User\MahasiswaController;
use App\Http\Controllers\ExcelController;
use App\Http\Controllers\PengajuanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TableUserController;
use App\Http\Controllers\User\Client;
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
});


Route::prefix('/')->middleware(['auth', 'role:2', 'verified'])->group(function () {
    Route::get('/', [ClientContoller::class, 'index'])->name('client');
    Route::get('/pengajuan', [ClientContoller::class, 'pengajuan'])->name('client-pengajuan');
    Route::get('/history', [ClientContoller::class, 'histroy'])->name('client-history');
    Route::get('/feedback', [ClientContoller::class, 'feedback'])->name('client-feedback');
});

Route::prefix('admin')->middleware(['auth', 'role:1', 'verified'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin');
    Route::get('/regist', [AdminController::class, 'RegistPengajuan'])->name('admin.RegistPengajuan');
    Route::post('/pengajuan/status', [PengajuanController::class, 'pengajuan_status'])->name('admin.pengajuan_status');

});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
