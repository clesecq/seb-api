<?php

namespace App\Http\Controllers;

use Database\Models\Config;
use Database\Models\Event;
use Database\Models\EventPerson;
use Database\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ParticipationsController extends PaymentController
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
            EventPerson::class,
            [
            "event_id" => "equals:event_id",
            "person_id" => "equals:person_id",
            "transaction_id" => "equals:transaction_id"
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
        // Check the event and person
        $data = $request->validate(
            [
            'person_id' => [
                'required',
                Rule::unique('event_people', 'person_id')->where('event_id', $request->get('event_id', null)),
                'exists:people,id'
            ],
            'event_id' => [
                'required',
                Rule::unique('event_people', 'evenT_id')->where('person_id', $request->get('person_id', null)),
                'exists:events,id'
            ],
            ]
        );

        $event = Event::findOrFail($data["event_id"]);
        $person = Person::findOrFail($data["person_id"]);

        // Check event, person and event data
        $data = $request->validate(
            array_merge(
                [
                'person_id' => [
                'required',
                Rule::unique('event_people', 'person_id')->where('event_id', $request->get('event_id', null)),
                'exists:people,id'
                ],
                'event_id' => [
                'required',
                Rule::unique('event_people', 'evenT_id')->where('person_id', $request->get('person_id', null)),
                'exists:events,id'
                ],
                ],
                $event->validator()
            )
        );

        // Calculate the price
        $amount = $event->price($data["data"], $person);

        // Check the payment infos
        $this->checkPaymentData($request, $amount, false);

        // Create relation
        $participation = EventPerson::create($data);

        // Pay
        $out = $this->doPayment(
            $request,
            $amount,
            Config::format(
                "events.transaction",
                ["event" => $event->attributesToArray()]
            ),
            $event->category_id,
            false
        );
        $participation->transaction_id = $out["transaction"];
        $participation->save();

        return ['data' => $participation];
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ['data' => EventPerson::findOrFail($id)];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int                      $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $participation = EventPerson::findOrFail($id);

        if ($participation->transaction()->exists()) {
            abort(405, "La participation à l'évènement a déjà été payée!", ['Allow' => 'GET, HEAD']);
        } else {
        }

        $event = $participation->event;

        // Check data
        $data = $request->validate($event->validator(true));
        $participation->data = collect($participation->data)->merge($data["data"]);

        // Calculate the price
        $amount = $event->price($data["data"], $participation->data);
        // Check the payment infos
        $this->checkPaymentData($request, $amount, false);
        // Pay, bitch!
        $out = $this->doPayment(
            $request,
            $amount,
            Config::format(
                "events.transaction",
                ["event" => $event->attributesToArray()]
            ),
            $event->category_id,
            false
        );
        $participation->transaction_id = $out["transaction"];

        $participation->save();
        return ['data' => $participation];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $participation = EventPerson::findOrFail($id);

        if ($participation->transaction()->exists()) {
            // TODO: Allow cancelation of transactions
            abort(405, "La participation à l'évènement a déjà été payée!", ['Allow' => 'GET, HEAD']);
        } else {
            $participation->delete();
            return ['data' => $participation];
        }
    }

    /**
     * Destroy many of the specified resource
     */
    public function destroyMany(Request $request)
    {
        if (is_array($request->ids)) {
            $out = [];
            foreach ($request->ids as $id) {
                $participation = EventPerson::findOrFail($id);

                if (!$participation->transaction()->exists()) {
                    $participation->delete();
                    $out[] = $id;
                }
            }
            return response(["data" => $out], 200);
        } else {
            return response([], 400);
        }
    }

    /**
     * Update many of the specified resource
     */
    public function updateMany(Request $request)
    {
        // TODO: Was lazy. Could be useful.
        return response([], 400);
    }
}
