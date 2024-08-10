<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Categories extends Model
{
    use HasFactory;
    protected $with = ['user'];
    protected $fillable = [
        'categoryKey',
        'user_id',
        'name',
        'slug',
    ];
    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->categoryKey = Str::uuid();
        });
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
