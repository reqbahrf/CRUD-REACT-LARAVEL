<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sale extends Model
{
    protected $table = 'sales_info';

    protected $fillable = [
        'product_id',
        'product_name',
        'total_qty',
        'total_price'
    ];

    protected $casts = [
        'product_name' => 'string',
        'total_qty' => 'integer',
        'total_price' => 'float',
    ];

    public function productInfo() : BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
