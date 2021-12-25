<?php

namespace App\Http\Controllers;

use Database\Models\Event;
use Database\Models\EventPerson;
use Database\Models\TransactionCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule as ValidationRule;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->commonIndex(
            $request,
            Event::class,
            [
                "name" => "like:name",
                "location" => "like:location",
                "category_id" => "equals:category_id"
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'name' => ['required', 'string'],
                'location' => ['required', 'string'],
                'inscriptions_closed_at' => ['required', 'date'],
                'start' => ['required', 'date'],
                'end' => ['required', 'date'],
                'price' => ['required', 'numeric'],
                'price_member' => ['required', 'numeric'],
                "data" => ['required', 'array'],
                "data.*.name" => ["required", "string", "distinct"],
                "data.*.type" => ["required", "string", "in:string,boolean,select"],
                "data.*.price" => ["required_if:data.*.type,boolean", "numeric"],
                "data.*.price_member" => ["required_if:data.*.type,boolean", "numeric"],
                "data.*.values" => ["required_if:data.*.type,select", "array"],
                "data.*.values.*.name" => ["required_if:data.*.type,select", "string", "distinct"],
                "data.*.values.*.price" => ["required_if:data.*.type,select", "numeric"],
                "data.*.values.*.price_member" => ["required_if:data.*.type,select", "numeric"],
            ]
        );

        $data["category_id"] = TransactionCategory::create($data)->id;

        return ['data' => Event::create($data)];
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => Event::findOrFail($id)];
    }

    public function export($id)
    {
        $event = Event::findOrFail($id);
        return response()->streamDownload(
            function () use ($event) {
                $file = fopen('php://output', 'w+');
                $header = ['EP#ID', 'P#ID', 'E#ID', 'Firstname', 'Lastname', 'Member'];

                $datas = [];
                foreach ($event->data as $dat) {
                    $datas[] = $dat['name'];
                }

                $header = array_merge($header, $datas, ['Payed', 'Price', 'Created at', 'Updated at']);

                fputcsv($file, $header);

                foreach ($event->participations as $participation) {
                    $row = [
                        $participation->id,
                        $participation->person_id,
                        $participation->event_id,
                        $participation->person->firstname,
                        $participation->person->lastname,
                        $participation->person->is_member
                    ];

                    foreach ($datas as $dat) {
                        $row[] = ((array) $participation->data)[$dat];
                    }

                    $row[] = $participation->transaction()->exists();
                    if ($participation->transaction()->exists()) {
                        $row[] = $participation->transaction->amount;
                    } else {
                        $row[] = "";
                    }
                    $row[] = $participation->created_at;
                    $row[] = $participation->updated_at;

                    fputcsv($file, $row);
                }

                fclose($file);
            },
            'export.csv'
        );
    }
}
