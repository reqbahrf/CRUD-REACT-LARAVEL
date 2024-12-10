<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;



class Product extends Model
{
    protected $table = 'products_info';

    protected $fillable = [
        'product_image_url',
        'product_name',
        'product_categories',
        'quantity',
        'price',
    ];

    protected $casts = [
        'product_image_url' => 'string',
        'product_name' => 'string',
        'product_categories' => 'string',
        'quantity' => 'integer',
        'price' => 'float',
    ];

    public function salesInfo() : HasMany
    {
        return $this->hasMany(Sale::class, 'product_id', 'id');
    }
}
