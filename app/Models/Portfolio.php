<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Portfolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'portfolioKey',
        'user_id',
        'title',
    ];
    protected $with = ['user'];

    public static function booted(): void
    {
        static::creating(function ($model) {
            $model->portfolioKey = Str::uuid();
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function photos(): HasMany
    {
        return $this->hasMany(Photo::class);
    }
}
