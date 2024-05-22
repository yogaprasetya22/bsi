<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\Pengajuan;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $pengajuan = Pengajuan::with(['user', 'status', 'feedback'])->latest()->get();
        $pengajuan_bulan_ini = Pengajuan::with(['user', 'status', 'feedback'])->whereMonth('created_at', date('m'))->latest()->get();
        return Inertia::render('admin/Admin', [
            'title' => 'Admin',
            'data' => $pengajuan,
            'pengajuan_bulan_ini' => $pengajuan_bulan_ini
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
        $document = Document::all();
        return Inertia::render('admin/Document', [
            'title' => 'Document',
            'data' => $document,
        ]);
    }

    public function DocumentStore(Request $request)
    {
        $request->validate([
            'file' => 'required|max:10048',
            'title' => 'required',
            'keterangan' => 'required',
        ]);

        $file = $request->file('file');
        $file_name = now()->format(
            'H-i-s'
        ) . $file->getClientOriginalName();
        $file->move(public_path('uploads/document'), $file_name);

        Document::create([
            'title' => $request->title,
            'keterangan' => $request->keterangan,
            'file' => $file_name,
        ]);

        return redirect()->back()->with('success', 'Document berhasil di upload');
    }

    public function DocumentEdit(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'title' => 'required',
            'keterangan' => 'required',
        ], [
            'id.required' => 'ID tidak boleh kosong',
            'title.required' => 'Title tidak boleh kosong',
            'keterangan.required' => 'Keterangan tidak boleh kosong',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $file_name = now()->format(
                'H-i-s'
            ) . $file->getClientOriginalName();
            $file->move(public_path('uploads/document'), $file_name);

            $document = Document::find($request->id);
            // remove old file
            if (is_file(public_path('uploads/document/' . $document->file))) {
                unlink(public_path('uploads/document/' . $document->file));
            }

            $document->update([
                'title' => $request->title,
                'keterangan' => $request->keterangan,
                'file' => $file_name,
            ]);
        } else {
            $document = Document::find($request->id);
            $document->update([
                'title' => $request->title,
                'keterangan' => $request->keterangan,
            ]);
        }

        return redirect()->back()->with('success', 'Document berhasil di update');
    }

    public function DocumentDelete(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);

        $document = Document::find($request->id);
        if (is_file(public_path('uploads/document/' . $document->file))) {
            unlink(public_path('uploads/document/' . $document->file));
        }

        $document->delete();

        return redirect()->back()->with('success', 'Document berhasil di hapus');
    }

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
            'role_id' => '1',
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
