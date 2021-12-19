<?php

namespace App\Notifications;

use Database\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserCreated extends Notification
{
    use Queueable;

    private User $user;
    private string $token;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user, string $token)
    {
        $this->user = $user;
        $this->token = $token;
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject("Your Seb account has been created!")
            ->greeting("Welcome " . $this->user->person->firstname . " " . $this->user->person->lastname . ".")
            ->line("Your Seb account named \"" . $this->user->username . "\" has been created.")
            ->action('Set my password', url("/enable-account/" . $this->token . "?email=" . $this->user->email))
            ->line("This password link will expire in 60 minutes." .
                " You can get a new one by clicking on \"Password lost\" on the login form.");
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
