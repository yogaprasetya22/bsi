<?php

namespace App\Http\Controllers;

use App\Models\FeedbackPengajuan;
use App\Models\Pengajuan;
use App\Models\user;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DhasboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = user::with(['role'])->where('role_id', 2)->latest()->get();
        $data = [];

        $faker = \Faker\Factory::create('id_ID');
        $now = Carbon::now();

        foreach ($user as $key => $value) {
            for ($i = 0; $i < 4; $i++) {
                // Hitung penyesuaian bulan berdasarkan iterasi
                $monthAdjustment = 1 - $i;

                // Menyesuaikan tanggal feedback
                $feedbackDate = $now->copy()->addMonths($monthAdjustment)->format('Y-m-d');

                // Menyesuaikan tanggal surat dan tanggal terima
                $suratDate = $now->copy()->format('Y-m-d');
                $terimaDate = $now->copy()->addMonths($monthAdjustment)->addDays(rand(1, 30))->format('Y-m-d');

                $data[] = [
                    "created_at" => $now->copy()->addMonths($monthAdjustment)->format('Y-m-d\TH:i:s.u\Z'),
                    "feedback" => [
                        "feedback" => "feedback",
                        "file" => "1713328768-tio (2).pdf",
                        "pengajuan_uuid" => str()->uuid(),
                        "tanggal_feedback" => $feedbackDate,
                        "pic" => $faker->name,
                    ],
                    "file" => "1713328689-1247-Article Text-2716-1-10-20160523.pdf.pdf",
                    "keterangan" => "test",
                    "no_surat" => "srt_client_" . $key . "_" . $i,
                    "status" => [
                        "id" => 2,
                        "name_status" => "approved",
                        "status_id" => 2,
                        "tanggal_surat" => $suratDate,
                        "tanggal_terima" => $terimaDate,
                        "updated_at" => $now->copy()->format('Y-m-d')
                    ],
                    "user" => $user[$key]
                ];
            }
        }

        foreach ($data as $key => $value) {
            $pengajuan = Pengajuan::create([
                'uuid' => str()->uuid(),
                'user_id' => $value['user']['id'],
                'status_id' => (random_int(1, 100) <= 30) ? rand(1, 5) : 4,
                'no_surat' => $value['no_surat'],
                'keterangan' => $value['keterangan'],
                'tanggal_surat' => $value['status']['tanggal_surat'],
                'tanggal_terima' => $value['status']['tanggal_terima'],
                'file' => $value['file'],
                'created_at' => $value['created_at'],
            ]);

            if ($value['feedback']) {
                $pengajuan->feedback()->create([
                    'feedback' => $value['feedback']['feedback'],
                    'pic' => $value['feedback']['pic'],
                    'file' => $value['feedback']['file'],
                    'tanggal_feedback' => $value['feedback']['tanggal_feedback'],
                ]);
            }
        }

        // filter data berdasarkan user_id 
        // $data = collect($data)->filter(function ($item) {
        //     return $item['user']['id'] == 2;
        // });

        return response()->json([
            'count' => count($data),
            'data' => $data,
        ]);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(user $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(user $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, user $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(user $user)
    {
        //
    }
}
