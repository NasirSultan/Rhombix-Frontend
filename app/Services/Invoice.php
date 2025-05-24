<?php
namespace App\Services;

class Invoice
{
    public function generate(string $name, float $amount): array
    {
        return [
            'company' => 'Toyota',
            'customer' => $name,
            'amount' => $amount,
            'status' => 'Invoice Generated'
        ];
    }
}
