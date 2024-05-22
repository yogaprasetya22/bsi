<?php

namespace App\Http\Controllers;

use App\Models\FeedbackPengajuan;
use App\Models\Pengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PengajuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

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
        $request->validate([
            'no_surat' => 'required',
            'keterangan' => 'required',
            'tanggal_surat' => 'required',
            'tanggal_terima' => 'required',
            'file' => 'required|mimes:pdf,doc,docx|max:10048', // Sesuaikan jenis dan ukuran file yang diizinkan
        ], [
            'no_surat.required' => 'No Surat harus diisi',
            'keterangan.required' => 'Keterangan harus diisi',
            'tanggal_surat.required' => 'Tanggal Surat harus diisi',
            'tanggal_terima.required' => 'Tanggal Terima harus diisi',
            'file.required' => 'File harus diisi',
            'file.mimes' => 'File harus berupa pdf, doc, docx',
            'file.max' => 'Ukuran file maksimal 10MB',
        ]);


        //    storage
        $file = $request->file('file');
        $renameFile = time() . '-' . $file->getClientOriginalName()
            . '.' . $file->getClientOriginalExtension();
        $file->move(public_path(
            'uploads/pengajuan/'
        ), $renameFile);


        // Simpan data pengajuan ke database
        Pengajuan::create([
            'uuid' => str()->uuid(),
            'user_id' => Auth::user()->id,
            'status_id' => 1, // Status 'pending'
            'no_surat' => $request->no_surat,
            'keterangan' => $request->keterangan,
            'tanggal_surat' => $request->tanggal_surat,
            'tanggal_terima' => $request->tanggal_terima,
            'file' => $renameFile,
        ]);

        return redirect()->route('client-history')->with('success', 'Pengajuan berhasil disimpan');
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
    public function pengajuan_status(Request $request)
    {
        $request->validate([
            'uuid' => 'required',
            'status' => 'required',
        ]);

        $pengajuan = Pengajuan::with('feedback')->where('uuid', $request->uuid)->first();

        if ($request->hasFile('file')) {
            $feedback = FeedbackPengajuan::where('pengajuan_uuid', $request->uuid)->first();
            if (!$feedback) {
                $file = $request->file('file');
                $renameFile = time() . '-' . $file->getClientOriginalName();
                $file->move(public_path(
                    'uploads/feedback/'
                ), $renameFile);

                FeedbackPengajuan::create([
                    'pengajuan_uuid' => $pengajuan->uuid,
                    'feedback' => $request->feedback,
                    'file' => $renameFile,
                    'tanggal_feedback' => date('Y-m-d'),
                ]);
            } else {
                // hapus file sebelumnya jika ada file baru yang diupload
                $path = public_path('uploads/feedback/');
                if (file_exists($path)) {
                    $files = glob($path . '*');
                    foreach ($files as $file) {
                        if (is_file($file)) {
                            unlink($file);
                        }
                    }
                }

                $file = $request->file('file');
                $renameFile = time() . '-' . $file->getClientOriginalName();
                $file->move(public_path(
                    'uploads/feedback/'
                ), $renameFile);

                $feedback->file = $renameFile;
                $feedback->save();
            }
        }

        if ($request->feedback) {
            $feedback = FeedbackPengajuan::where('pengajuan_uuid', $request->uuid)->first();
            if (!$feedback) {
                FeedbackPengajuan::create([
                    'pengajuan_uuid' => $pengajuan->uuid,
                    'feedback' => $request->feedback,
                    'file' => null,
                    'tanggal_feedback' => date('Y-m-d'),
                ]);
            } else {
                FeedbackPengajuan::where('pengajuan_uuid', $request->uuid)
                    ->update([
                        'feedback' => $request->feedback,
                    ]);
            }
        }

        if ($pengajuan && $request->status) {
            $pengajuan->status_id = $request->status;
            $pengajuan->save();

            $feedback = FeedbackPengajuan::where('pengajuan_uuid', $request->uuid)->first();
            if (!$feedback) {
                FeedbackPengajuan::create([
                    'pengajuan_uuid' => $pengajuan->uuid,
                    'feedback' => null,
                    'file' => null,
                    'tanggal_feedback' => date('Y-m-d'),
                ]);
            }
        }

        return redirect()->back()->with('success', 'Status pengajuan berhasil diubah');
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        // buatkan update user validation
        $request->validate([
            'uuid' => 'required',
            'no_surat' => 'required',
            'keterangan' => 'required',
            'tanggal_surat' => 'required',
            'tanggal_terima' => 'required',
        ], [
            'no_surat.required' => 'No Surat harus diisi',
            'keterangan.required' => 'Keterangan harus diisi',
            'tanggal_surat.required' => 'Tanggal Surat harus diisi',
            'tanggal_terima.required' => 'Tanggal Terima harus diisi',
        ]);

        $pengajuan = Pengajuan::where('uuid', $request->uuid)->first();

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $renameFile = time() . '-' . $file->getClientOriginalName()
                . '.' . $file->getClientOriginalExtension();
            $file->move(public_path(
                'uploads/pengajuan/'
            ), $renameFile);

            // remove old file
            if (is_file(public_path('uploads/pengajuan/' . $pengajuan->file))) {
                unlink(public_path('uploads/pengajuan/' . $pengajuan->file));
            }

            $pengajuan->update([
                'no_surat' => $request->no_surat,
                'keterangan' => $request->keterangan,
                'tanggal_surat' => $request->tanggal_surat,
                'tanggal_terima' => $request->tanggal_terima,
                'file' => $renameFile,
            ]);
        } else {
            $pengajuan->update([
                'no_surat' => $request->no_surat,
                'keterangan' => $request->keterangan,
                'tanggal_surat' => $request->tanggal_surat,
                'tanggal_terima' => $request->tanggal_terima,
            ]);
        }

        return redirect()->back()->with('success', 'Pengajuan berhasil di update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'uuid' => 'required',
        ]);

        $pengajuan = Pengajuan::where('uuid', $request->uuid)->first();
        if (is_file(public_path('uploads/pengajuan/' . $pengajuan->file))) {
            unlink(public_path('uploads/pengajuan/' . $pengajuan->file));
        }

        $pengajuan->delete();

        return redirect()->back()->with('success', 'Pengajuan berhasil dihapus');
    }
}
