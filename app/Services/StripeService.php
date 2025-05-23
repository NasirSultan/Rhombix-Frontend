<?php

namespace App\Services;

use App\Contracts\PaymentGateway;

class StripeService implements PaymentGateway {
    public function charge(float $amount): string {
        return "Charged $amount via Stripe!";
    }
}
